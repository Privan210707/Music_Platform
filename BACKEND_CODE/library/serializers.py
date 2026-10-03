from rest_framework import serializers
from .models import (
    Playlist,
    PlaylistSong,
    LikedSong,
    RecentlyPlayed,
    SavedAlbum,
    SavedArtist
)
from songs.models import Song, Album, Artist


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = [
            "id",
            "title",
            "artist",
            "genre",
            "image_url",
            "audio_url",
            "album"
        ]


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = [
            "id",
            "title",
            "artist",
            "year",
            "image_url"
        ]


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = [
            "id",
            "name",
            "image_url",
            "bio",
            "cover_image_url",
            "followers_count",
            "following_count"
        ]


class PlaylistSongSerializer(serializers.ModelSerializer):
    song = SongSerializer()
    class Meta:
        model = PlaylistSong
        fields = [
            "id",
            "song",
            "added_at"
        ]


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = [
            "id",
            "name",
            "image_url",
            "created_at",
            "updated_at"
        ]


class PlaylistDetailSerializer(serializers.ModelSerializer):
    songs = serializers.SerializerMethodField()
    class Meta:
        model = Playlist
        fields = [
            "id",
            "name",
            "image_url",
            "created_at",
            "updated_at",
            "songs"
        ]
    def get_songs(self, obj):
        playlist_songs = PlaylistSong.objects.filter(
            playlist=obj
        ).order_by("-added_at")
        return PlaylistSongSerializer(
            playlist_songs,
            many=True
        ).data


class LikedSongSerializer(serializers.ModelSerializer):
    song = SongSerializer()
    class Meta:
        model = LikedSong
        fields = [
            "id",
            "song",
            "created_at"
        ]


class RecentlyPlayedSerializer(serializers.ModelSerializer):
    song = SongSerializer()
    class Meta:
        model = RecentlyPlayed
        fields = [
            "id",
            "song",
            "played_at"
        ]


class SavedAlbumSerializer(serializers.ModelSerializer):
    album = AlbumSerializer()
    class Meta:
        model = SavedAlbum
        fields = [
            "id",
            "album",
            "created_at"
        ]


class SavedArtistSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer()
    class Meta:
        model = SavedArtist
        fields = [
            "id",
            "artist",
            "created_at"
        ]