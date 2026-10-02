from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    genre = models.CharField(max_length=100)
    image_url = models.URLField(blank=True)
    audio_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title


class RecentSearch(models.Model):
    user = models.ForeignKey(
        "accounts.User",
        on_delete=models.CASCADE
    )
    query = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.query
    