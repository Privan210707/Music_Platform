from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Song,RecentSearch,Genre,Artist,Album
from .serializers import SongSerializer,ArtistSerializer,GenreSerializer,AlbumSerializer
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

    