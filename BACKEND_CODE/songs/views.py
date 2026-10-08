from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Song,RecentSearch,Genre,Artist,Album,ArtistPlaylist,MoodHistory,SongShare,ArtistFollow
from .serializers import SongSerializer,ArtistSerializer,GenreSerializer,AlbumSerializer,ArtistPlaylistSerializer
from django.db.models import Q
from library.models import RecentlyPlayed,LikedSong,Playlist,PlaylistSong,ListeningEvent
from rest_framework.permissions import AllowAny
import cloudinary.uploader

from django.conf import settings


#Home Page
class SongListView(APIView):
    permission_classes=[AllowAny]
    def get(self, request):
        songs = Song.objects.all()
        serializer = SongSerializer(songs, many=True)
        return Response(serializer.data)

#Search Page
class SongSearchView(APIView):
    def get(self, request):
        query = request.GET.get("q", "")
        songs = Song.objects.filter(
            Q(title__icontains=query) |
            Q(artist__icontains=query)
        )
        data = []
        for song in songs:
            data.append({
                "id": song.id,
                "title": song.title,
                "artist": song.artist,
                "genre": song.genre,
                "image_url": song.image_url,
                "audio_url": song.audio_url
            })
        return Response(data)


class RecentSearchCreateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        query = request.data.get("query")
        if not query:
            return Response(
                {"error": "Search query is required"},
                status=400
            )
        recent_search = RecentSearch.objects.create(
            user=request.user,
            query=query
        )
        return Response({
            "message": "Search saved",
            "id": recent_search.id,
            "query": recent_search.query
        }, status=201)


class RecentSearchListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        searches = RecentSearch.objects.filter(
            user=request.user
        ).order_by("-created_at")
        data = []
        for search in searches:
            data.append({
                "id": search.id,
                "query": search.query
            })
        return Response(data)    


class RecentSearchDeleteView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, id):
        try:
            search = RecentSearch.objects.get(
                id=id,
                user=request.user
            )
        except RecentSearch.DoesNotExist:
            return Response(
                {"error": "Search not found"},
                status=404
            )
        search.delete()
        return Response(
            {"message": "Search deleted"},
            status=200
        )    

#Explore Page
class GenreListView(APIView):
    def get(self, request):
        genres = Genre.objects.all()
        serializer = GenreSerializer(
            genres,
            many=True
        )
        return Response(serializer.data)

class ArtistListView(APIView):
    def get(self, request):
        artists = Artist.objects.all()
        serializer = ArtistSerializer(
            artists,
            many=True
        )
        return Response(serializer.data)

class ArtistDetailView(APIView):
    def get(self, request, artist_name):
        songs = Song.objects.filter(
            artist__iexact=artist_name
        )
        albums = Album.objects.filter(
            artist__iexact=artist_name
        )
        if not songs.exists() and not albums.exists():
            return Response(
                {"error": "Artist not found"},
                status=404
            )
        return Response({
            "artist": artist_name,
            "popular_songs": SongSerializer(
                songs,
                many=True
            ).data,
            "albums": AlbumSerializer(
                albums,
                many=True
            ).data
        })    

class ArtistDetailView(APIView):
    def get(self, request, artist_name):
        songs = Song.objects.filter(
            artist__iexact=artist_name
        )
        albums = Album.objects.filter(
            artist__iexact=artist_name
        )
        artist = Artist.objects.filter(
            name__iexact=artist_name
        ).first()
        if not artist:
            if not songs.exists() and not albums.exists():
                return Response(
                    {"error": "Artist not found"},
                    status=404
                )
        artist_data = {
            "name": artist.name if artist else artist_name,
            "image_url": artist.image_url if artist else "",
        }
        return Response({
            "artist": artist_data,
            "popular_songs": SongSerializer(
                songs,
                many=True
            ).data,
            "albums": AlbumSerializer(
                albums,
                many=True
            ).data
        })    

class AlbumDetailView(APIView):
    def get(self, request, album_id):
        try:
            album = Album.objects.get(id=album_id)
        except Album.DoesNotExist:
            return Response(
                {"error": "Album not found"},
                status=404
            )
        songs = Song.objects.filter(
            album=album
        )
        return Response({
            "album": AlbumSerializer(album).data,
            "songs": SongSerializer(
                songs,
                many=True
            ).data
        })    

class ArtistProfileView(APIView):
    def get(self, request, artist_name):
        artist = Artist.objects.filter(
            name__iexact=artist_name
        ).first()
        if not artist:
            return Response(
                {"error": "Artist not found"},
                status=404
            )
        playlists = ArtistPlaylist.objects.filter(
            artist=artist
        )
        return Response({
            "id": artist.id,
            "name": artist.name,
            "image_url": artist.image_url,
            "cover_image_url": artist.cover_image_url,
            "bio": artist.bio,
            "followers_count": artist.followers_count,
            "following_count": artist.following_count,
            "playlists": ArtistPlaylistSerializer(
                playlists,
                many=True
            ).data
        })    

import os
import requests
class SongPlayView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):

        # Get song ID
        song_id = request.data.get("song_id")

        if not song_id:
            return Response(
                {"error": "song_id is required"},
                status=400
            )

        # Find song
        try:
            song = Song.objects.get(id=song_id)
        except Song.DoesNotExist:
            return Response(
                {"error": "Song not found"},
                status=404
            )

        # Record every listening event in Django
        listening_event = ListeningEvent.objects.create(
            user=request.user,
            song=song
        )

        # Update Recently Played
        RecentlyPlayed.objects.filter(
            user=request.user,
            song=song
        ).delete()

        recently_played = RecentlyPlayed.objects.create(
            user=request.user,
            song=song
        )

        # Send listening event to ML service
        ml_api_url = os.getenv("ML_API_URL")

        if ml_api_url and song.ml_track_id:
            try:
                ml_response = requests.post(
                    f"{ml_api_url.rstrip('/')}/listen",
                    json={
                        "user_id": request.user.id,
                        "track_id": song.ml_track_id
                    },
                    timeout=10
                )

            except requests.RequestException:
                ml_response = None

        return Response({
            "message": "Song played successfully",
            "song": SongSerializer(song).data,
            "played_at": recently_played.played_at
        }, status=201)

    
#VibeAI APIs

class VibeMoodsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        moods = [
            "Happy",
            "Chill",
            "Sad",
            "Romantic",
            "Energetic",
            "Focus"
        ]
        return Response({
            "moods": moods
        })

class RecentVibesView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        moods = MoodHistory.objects.filter(
            user=request.user
        ).order_by("-created_at")[:10]
        return Response({
            "recent_vibes": [
                {
                    "id": mood.id,
                    "mood": mood.mood,
                    "created_at": mood.created_at
                }
                for mood in moods
            ]
        })    


class CreateVibePlaylistView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        name = request.data.get("name")
        song_ids = request.data.get("song_ids", [])
        if not name:
            return Response(
                {"error": "Playlist name is required"},
                status=400
            )
        if not song_ids:
            return Response(
                {"error": "song_ids are required"},
                status=400
            )
        playlist = Playlist.objects.create(
            user=request.user,
            name=name
        )
        added_songs = []
        for song_id in song_ids:
            try:
                song = Song.objects.get(id=song_id)
            except Song.DoesNotExist:
                continue
            PlaylistSong.objects.create(
                playlist=playlist,
                song=song
            )
            added_songs.append(song.id)
        return Response({
            "message": "Vibe playlist created successfully",
            "playlist": {
                "id": playlist.id,
                "name": playlist.name
            },
            "song_ids": added_songs
        }, status=201)    


#UploadSong API    
class SongUploadView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        title = request.data.get("title")
        artist = request.data.get("artist")
        genre = request.data.get("genre")
        album_id = request.data.get("album_id")
        audio_file = request.FILES.get("audio")
        image_file = request.FILES.get("image")

        # Required fields
        if not title:
            return Response(
                {"error": "title is required"},
                status=400
            )
        if not artist:
            return Response(
                {"error": "artist is required"},
                status=400
            )
        if not genre:
            return Response(
                {"error": "genre is required"},
                status=400
            )
        if not audio_file:
            return Response(
                {"error": "audio file is required"},
                status=400
            )

        # Upload audio to Cloudinary
        audio_result = cloudinary.uploader.upload(
            audio_file,
            resource_type="video",
            folder="vibe/audio"
        )
        audio_url = audio_result.get("secure_url")

        # Upload image if provided
        image_url = ""
        if image_file:
            image_result = cloudinary.uploader.upload(
                image_file,
                resource_type="image",
                folder="vibe/images"
            )

            image_url = image_result.get("secure_url")

        # Album
        album = None
        if album_id:
            try:
                album = Album.objects.get(id=album_id)
            except Album.DoesNotExist:
                return Response(
                    {"error": "Album not found"},
                    status=404
                )

        # Create Song
        song = Song.objects.create(
            title=title,
            artist=artist,
            genre=genre,
            album=album,
            image_url=image_url,
            audio_url=audio_url
        )
        return Response(
            {
                "message": "Song uploaded successfully",
                "song": SongSerializer(song).data
            },
            status=201
        )

#Share Song
class SongShareView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        song_id = request.data.get("song_id")
        if not song_id:
            return Response(
                {"error": "song_id is required"},
                status=400
            )
        try:
            song = Song.objects.get(id=song_id)
        except Song.DoesNotExist:
            return Response(
                {"error": "Song not found"},
                status=404
            )
        share = SongShare.objects.create(
            user=request.user,
            song=song
        )
        share_url = (
            f"http://127.0.0.1:8000/api/songs/share/{share.share_id}/"
        )
        return Response(
            {
                "message": "Song shared successfully",
                "share_id": str(share.share_id),
                "share_url": share_url,
                "song": SongSerializer(song).data
            },
            status=201
        )   

class SharedSongView(APIView):
    def get(self, request, share_id):
        try:
            share = SongShare.objects.select_related("song").get(
                share_id=share_id
            )
        except SongShare.DoesNotExist:
            return Response(
                {"error": "Share link not found"},
                status=404
            )
        return Response(
            {
                "song": SongSerializer(share.song).data,
                "shared_at": share.created_at
            }
        )     

#ArtistFollow API
class ArtistFollowView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, artist_id):
        try:
            artist = Artist.objects.get(id=artist_id)
        except Artist.DoesNotExist:
            return Response(
                {"error": "Artist not found"},
                status=404
            )
        follow, created = ArtistFollow.objects.get_or_create(
            user=request.user,
            artist=artist
        )
        if not created:
            return Response(
                {
                    "message": "You already follow this artist",
                    "artist": {
                        "id": artist.id,
                        "name": artist.name
                    }
                },
                status=200
            )
        artist.followers_count += 1
        artist.save(update_fields=["followers_count"])
        return Response(
            {
                "message": "Artist followed successfully",
                "artist": {
                    "id": artist.id,
                    "name": artist.name,
                    "followers_count": artist.followers_count
                }
            },
            status=201
        )    

class ArtistUnfollowView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, artist_id):
        try:
            artist = Artist.objects.get(id=artist_id)
        except Artist.DoesNotExist:
            return Response(
                {"error": "Artist not found"},
                status=404
            )
        follow = ArtistFollow.objects.filter(
            user=request.user,
            artist=artist
        ).first()
        if not follow:
            return Response(
                {"error": "You do not follow this artist"},
                status=400
            )
        follow.delete()
        if artist.followers_count > 0:
            artist.followers_count -= 1
            artist.save(update_fields=["followers_count"])
        return Response(
            {
                "message": "Artist unfollowed successfully",
                "artist": {
                    "id": artist.id,
                    "name": artist.name,
                    "followers_count": artist.followers_count
                }
            },
            status=200
        )   

class ArtistFollowersView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, artist_id):
        try:
            artist = Artist.objects.get(id=artist_id)
        except Artist.DoesNotExist:
            return Response(
                {"error": "Artist not found"},
                status=404
            )
        follows = ArtistFollow.objects.filter(
            artist=artist
        ).select_related("user").order_by("-created_at")
        followers = []
        for follow in follows:
            followers.append({
                "id": follow.user.id,
                "email": follow.user.email,
                "followed_at": follow.created_at
            })
        return Response({
            "artist": {
                "id": artist.id,
                "name": artist.name
            },
            "followers_count": len(followers),
            "followers": followers
        })   

class ArtistFollowStatusView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, artist_id):
        try:
            artist = Artist.objects.get(id=artist_id)
        except Artist.DoesNotExist:
            return Response(
                {"error": "Artist not found"},
                status=404
            )
        is_following = ArtistFollow.objects.filter(
            user=request.user,
            artist=artist
        ).exists()
        return Response({
            "artist_id": artist.id,
            "artist_name": artist.name,
            "is_following": is_following,
            "followers_count": artist.followers_count
        })      



import os
import requests

class MLRecommendationView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        song_name = request.data.get("song_name")
        n = request.data.get("n", 5)
        if not song_name:
            return Response(
                {"error": "song_name is required"},
                status=400
            )
        ml_api_url = os.getenv("ML_API_URL")
        try:
            response = requests.post(
                f"{ml_api_url}/recommend",
                json={
                    "song_name": song_name,
                    "n": n
                },
                timeout=10
            )
        except requests.RequestException:
            return Response(
                {"error": "ML recommendation service unavailable"},
                status=503
            )
        if response.status_code != 200:
            return Response(
                {
                    "error": "ML recommendation failed",
                    "details": response.json()
                },
                status=response.status_code
            )
        return Response(response.json())


class VibeRecommendationView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):

        mood = request.data.get("mood")
        n = request.data.get("n", 5)

        if not mood:
            return Response(
                {"error": "mood is required"},
                status=400
            )

        mood = mood.strip().capitalize()

        valid_moods = [
            "Happy",
            "Chill",
            "Sad",
            "Romantic",
            "Energetic",
            "Focus"
        ]

        if mood not in valid_moods:
            return Response(
                {
                    "error": "Invalid mood",
                    "available_moods": valid_moods
                },
                status=400
            )

        # Save user's selected mood
        MoodHistory.objects.create(
            user=request.user,
            mood=mood
        )

        # Map Vibe moods to ML moods
        mood_mapping = {
            "Happy": "happy",
            "Chill": "party",
            "Sad": "sad",
            "Romantic": "love",
            "Energetic": "party",
            "Focus": "calm"
        }

        ml_mood = mood_mapping[mood]

        # Get ML service URL
        ml_api_url = os.getenv("ML_API_URL")

        if not ml_api_url:
            return Response(
                {"error": "ML_API_URL is not configured"},
                status=500
            )

        try:
            response = requests.post(
                f"{ml_api_url.rstrip('/')}/recommend/mood",
                json={
                    "mood": ml_mood,
                    "n": n
                },
                timeout=10
            )

        except requests.RequestException as e:
            return Response(
                {
                    "error": "ML recommendation service unavailable",
                    "details": str(e)
                },
                status=503
            )

        if response.status_code != 200:

            try:
                details = response.json()
            except ValueError:
                details = response.text

            return Response(
                {
                    "error": "ML recommendation failed",
                    "details": details
                },
                status=response.status_code
            )

        # Get ML response
        ml_data = response.json()

        return Response({
    "mood": mood,
    "recommendations": ml_data.get("recommendations", [])
    })


class StatisticsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        ml_api_url = os.getenv("ML_API_URL")

        if not ml_api_url:
            return Response(
                {"error": "ML_API_URL is not configured"},
                status=500
            )

        try:
            response = requests.get(
                f"{ml_api_url}/replay/{request.user.id}",
                timeout=10
            )
        except requests.RequestException:
            return Response(
                {
                    "error": "ML statistics service unavailable"
                },
                status=503
            )

        if response.status_code != 200:
            try:
                details = response.json()
            except ValueError:
                details = response.text

            return Response(
                {
                    "error": "ML statistics failed",
                    "details": details
                },
                status=response.status_code
            )

        return Response(response.json())
    