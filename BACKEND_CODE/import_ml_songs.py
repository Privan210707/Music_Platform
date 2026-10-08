import os
import django
import pandas as pd

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from songs.models import Song


# ML dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

CSV_PATH = os.path.join(
    BASE_DIR,
    "..",
    "ML",
    "backend",
    "data",
    "spotify_tracks.csv"
)

df = pd.read_csv(CSV_PATH)

# Take first 100 songs
df = df.head(100)

added = 0
skipped = 0

for _, row in df.iterrows():

    track_id = str(row["track_id"])
    title = str(row["track_name"])
    artist = str(row["artist_name"])

    # Genre column in your ML dataset
    genre = str(row.get("track_genre","Unknown"))

    # Skip if this ML song is already imported
    if Song.objects.filter(ml_track_id=track_id).exists():
        skipped += 1
        continue

    Song.objects.create(
        title=title,
        artist=artist,
        genre=genre,
        ml_track_id=track_id,
        image_url="",
        audio_url=""
    )

    added += 1

print("Import completed!")
print("Songs added:", added)
print("Songs skipped:", skipped)
print("Total songs in database:", Song.objects.count())