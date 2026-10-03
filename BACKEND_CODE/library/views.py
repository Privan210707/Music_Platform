from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    Playlist,
    PlaylistSong,
    LikedSong,
    RecentlyPlayed,
    SavedAlbum,
    SavedArtist
)

from .serializers import (
    PlaylistSerializer,
    PlaylistDetailSerializer,
    LikedSongSerializer,
    RecentlyPlayedSerializer,
    SavedAlbumSerializer,
    SavedArtistSerializer
)

from songs.models import Song, Album, Artist

#Library Main Page
class LibraryView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        liked_songs = LikedSong.objects.filter(
            user=user
        ).order_by("-created_at")[:10]
        playlists = Playlist.objects.filter(
            user=user
        ).order_by("-created_at")
        saved_albums = SavedAlbum.objects.filter(
            user=user
        ).order_by("-created_at")[:10]
        saved_artists = SavedArtist.objects.filter(
            user=user
        ).order_by("-created_at")[:10]
        recently_played = RecentlyPlayed.objects.filter(
            user=user
        ).order_by("-played_at")[:10]
        return Response({
            "liked_songs": LikedSongSerializer(
                liked_songs,
                many=True
            ).data,
            "playlists": PlaylistSerializer(
                playlists,
                many=True
            ).data,
            "albums": SavedAlbumSerializer(
                saved_albums,
                many=True
            ).data,
            "artists": SavedArtistSerializer(
                saved_artists,
                many=True
            ).data,
            "recently_played": RecentlyPlayedSerializer(
                recently_played,
                many=True
            ).data
        })

#Like Songs
class LikeSongView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, song_id):
        song = get_object_or_404(
            Song,
            id=song_id
        )
        liked_song, created = LikedSong.objects.get_or_create(
            user=request.user,
            song=song
        )
        if not created:
            return Response(
                {
                    "message": "Song already liked"
                },
                status=status.HTTP_200_OK
            )
        return Response(
            {
                "message": "Song liked",
                "song_id": song.id
            },
            status=status.HTTP_201_CREATED
        )


class UnlikeSongView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, song_id):

        deleted_count, _ = LikedSong.objects.filter(
            user=request.user,
            song_id=song_id
        ).delete()

        if deleted_count == 0:

            return Response(
                {
                    "error": "Song is not liked"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {
                "message": "Song unliked"
            },
            status=status.HTTP_200_OK
        )


class LikedSongsView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        songs = LikedSong.objects.filter(
            user=request.user
        ).order_by("-created_at")

        return Response(
            LikedSongSerializer(
                songs,
                many=True
            ).data
        )


#Playlist Create
class PlaylistListCreateView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        playlists = Playlist.objects.filter(
            user=request.user
        ).order_by("-created_at")

        return Response(
            PlaylistSerializer(
                playlists,
                many=True
            ).data
        )

    def post(self, request):

        name = request.data.get("name")
        image_url = request.data.get("image_url", "")

        if not name:

            return Response(
                {
                    "error": "Playlist name is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        playlist = Playlist.objects.create(
            user=request.user,
            name=name,
            image_url=image_url
        )

        return Response(
            PlaylistSerializer(playlist).data,
            status=status.HTTP_201_CREATED
        )


class PlaylistDetailView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, playlist_id):

        playlist = get_object_or_404(
            Playlist,
            id=playlist_id,
            user=request.user
        )

        return Response(
            PlaylistDetailSerializer(
                playlist
            ).data
        )


class PlaylistDeleteView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, playlist_id):

        playlist = get_object_or_404(
            Playlist,
            id=playlist_id,
            user=request.user
        )

        playlist.delete()

        return Response(
            {
                "message": "Playlist deleted"
            },
            status=status.HTTP_200_OK
        )


# ADD SONG TO PLAYLIST
class AddSongToPlaylistView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, playlist_id, song_id):

        playlist = get_object_or_404(
            Playlist,
            id=playlist_id,
            user=request.user
        )

        song = get_object_or_404(
            Song,
            id=song_id
        )

        playlist_song, created = PlaylistSong.objects.get_or_create(
            playlist=playlist,
            song=song
        )

        if not created:

            return Response(
                {
                    "message": "Song already exists in playlist"
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {
                "message": "Song added to playlist",
                "playlist_id": playlist.id,
                "song_id": song.id
            },
            status=status.HTTP_201_CREATED
        )


# REMOVE SONG FROM PLAYLIST
class RemoveSongFromPlaylistView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, playlist_id, song_id):

        playlist = get_object_or_404(
            Playlist,
            id=playlist_id,
            user=request.user
        )

        deleted_count, _ = PlaylistSong.objects.filter(
            playlist=playlist,
            song_id=song_id
        ).delete()

        if deleted_count == 0:

            return Response(
                {
                    "error": "Song not found in playlist"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {
                "message": "Song removed from playlist"
            },
            status=status.HTTP_200_OK
        )


# RECENTLY PLAYED
class RecentlyPlayedView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        songs = RecentlyPlayed.objects.filter(
            user=request.user
        ).order_by("-played_at")[:20]

        return Response(
            RecentlyPlayedSerializer(
                songs,
                many=True
            ).data
        )

    def post(self, request):

        song_id = request.data.get("song_id")

        if not song_id:

            return Response(
                {
                    "error": "song_id is required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        song = get_object_or_404(
            Song,
            id=song_id
        )

        RecentlyPlayed.objects.create(
            user=request.user,
            song=song
        )

        return Response(
            {
                "message": "Song added to recently played"
            },
            status=status.HTTP_201_CREATED
        )


# SAVE ALBUM
class SaveAlbumView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, album_id):

        album = get_object_or_404(
            Album,
            id=album_id
        )

        saved_album, created = SavedAlbum.objects.get_or_create(
            user=request.user,
            album=album
        )

        if not created:

            return Response(
                {
                    "message": "Album already saved"
                }
            )

        return Response(
            {
                "message": "Album saved"
            },
            status=status.HTTP_201_CREATED
        )


class RemoveAlbumView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, album_id):

        deleted_count, _ = SavedAlbum.objects.filter(
            user=request.user,
            album_id=album_id
        ).delete()

        if deleted_count == 0:

            return Response(
                {
                    "error": "Album not saved"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {
                "message": "Album removed from library"
            }
        )


class SavedAlbumsView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        albums = SavedAlbum.objects.filter(
            user=request.user
        ).order_by("-created_at")

        return Response(
            SavedAlbumSerializer(
                albums,
                many=True
            ).data
        )


# SAVE ARTIST
class SaveArtistView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, artist_id):

        artist = get_object_or_404(
            Artist,
            id=artist_id
        )

        saved_artist, created = SavedArtist.objects.get_or_create(
            user=request.user,
            artist=artist
        )

        if not created:

            return Response(
                {
                    "message": "Artist already saved"
                }
            )

        return Response(
            {
                "message": "Artist saved"
            },
            status=status.HTTP_201_CREATED
        )


class RemoveArtistView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, artist_id):

        deleted_count, _ = SavedArtist.objects.filter(
            user=request.user,
            artist_id=artist_id
        ).delete()

        if deleted_count == 0:

            return Response(
                {
                    "error": "Artist not saved"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {
                "message": "Artist removed from library"
            }
        )


class SavedArtistsView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        artists = SavedArtist.objects.filter(
            user=request.user
        ).order_by("-created_at")

        return Response(
            SavedArtistSerializer(
                artists,
                many=True
            ).data
        )