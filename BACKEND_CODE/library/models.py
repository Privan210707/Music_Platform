from django.db import models
from django.conf import settings

from songs.models import Song, Album, Artist


class Playlist(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="playlists"
    )
    name = models.CharField(max_length=200)
    image_url = models.URLField(
        blank=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )
    def __str__(self):
        return self.name


class PlaylistSong(models.Model):
    playlist = models.ForeignKey(
        Playlist,
        on_delete=models.CASCADE,
        related_name="playlist_songs"
    )
    song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE,
        related_name="playlist_entries"
    )
    added_at = models.DateTimeField(
        auto_now_add=True
    )
    class Meta:
        unique_together = ("playlist", "song")
    def __str__(self):
        return f"{self.playlist.name} - {self.song.title}"


class LikedSong(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="liked_songs"
    )
    song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE,
        related_name="liked_by_users"
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    class Meta:
        unique_together = ("user", "song")
    def __str__(self):
        return f"{self.user.email} - {self.song.title}"


class RecentlyPlayed(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="recently_played_songs"
    )
    song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE,
        related_name="played_by_users"
    )
    played_at = models.DateTimeField(
        auto_now_add=True
    )
    def __str__(self):
        return f"{self.user.email} - {self.song.title}"


class SavedAlbum(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="saved_albums"
    )
    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE,
        related_name="saved_by_users"
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    class Meta:
        unique_together = ("user", "album")
    def __str__(self):
        return f"{self.user.email} - {self.album.title}"


class SavedArtist(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="saved_artists"
    )
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE,
        related_name="saved_by_users"
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    class Meta:
        unique_together = ("user", "artist")
    def __str__(self):
        return f"{self.user.email} - {self.artist.name}"
    

class ListeningEvent(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="listening_events"
    )
    song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE,
        related_name="listening_events"
    )
    played_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.email} - {self.song.title} - {self.played_at}"    