from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Song,RecentSearch,Genre,Artist,Album,ArtistPlaylist
from .serializers import SongSerializer,ArtistSerializer,GenreSerializer,AlbumSerializer,ArtistPlaylistSerializer
from django.db.models import Q

#Home Page
class SongListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
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