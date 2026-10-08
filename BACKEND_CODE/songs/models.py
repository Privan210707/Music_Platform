from django.db import models
from django.conf import settings
import uuid

#Home Page
class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    genre = models.CharField(max_length=100)
    image_url = models.URLField(blank=True)
    audio_url = models.URLField(blank=True)

    ml_track_id=models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    album=models.ForeignKey("Album",on_delete=models.SET_NULL,null=True,blank=True,related_name="songs")
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title


#Search Page
class RecentSearch(models.Model):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE
    )
    query = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.query


#Explore Page
class Genre(models.Model):
    name = models.CharField(max_length=100)
    image_url = models.URLField(blank=True)
    def __str__(self):
        return self.name


class Artist(models.Model):
    name = models.CharField(max_length=200)
    image_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    cover_image_url = models.URLField(blank=True)
    followers_count = models.IntegerField(default=0)
    following_count = models.IntegerField(default=0)
    def __str__(self):
        return self.name  


class ArtistFollow(models.Model):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="artist_follows"
    )
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE,
        related_name="followers"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        unique_together = ("user", "artist")
    def __str__(self):
        return f"{self.user.email} follows {self.artist.name}"    


class Album(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    year = models.IntegerField()
    image_url = models.URLField(blank=True)
    def __str__(self):
        return self.title

class ArtistPlaylist(models.Model):
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE,
        related_name="playlists"
    )
    name = models.CharField(max_length=200)
    image_url = models.URLField(blank=True)
    def __str__(self):
        return self.name    


class MoodHistory(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="mood_history"
    )
    mood = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.email} - {self.mood}"

#ShareSongs
class SongShare(models.Model):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE,
        related_name="song_shares"
    )
    song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE,
        related_name="shares"
    )
    share_id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.email} shared {self.song.title}"
    