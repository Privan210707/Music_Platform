from rest_framework import serializers
from .models import Song,Genre,Artist,Album,ArtistPlaylist


#Home Page
class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = "__all__"


#Explore Page
class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ["id", "name", "image_url"]


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ["id", "name", "image_url"]

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model=Album
        fields="__all__"

class ArtistPlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtistPlaylist
        fields = [
            "id",
            "name",
            "image_url"
        ]



