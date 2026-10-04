from django.core.management.base import BaseCommand
from songs.models import Song
import cloudinary.uploader
from pathlib import Path


class Command(BaseCommand):
    help = "Upload Vibe home page songs to Cloudinary and PostgreSQL"

    def handle(self, *args, **kwargs):

        music_folder = Path("music_uploads")

        songs = [
            {
                "file_key": "vivaleum-happy-inspiring-upbeat-acoustic",
                "title": "Daily Mix 1",
                "artist": "Vivaleum",
                "genre": "Acoustic",
            },
            {
                "file_key": "zephiramusic-chill-lofi",
                "title": "Chill Vibes",
                "artist": "ZephiraMusic",
                "genre": "Lo-fi",
            },
            {
                "file_key": "the_mountain-upbeat-acoustic",
                "title": "Daily Mix 2",
                "artist": "The_Mountain",
                "genre": "Acoustic",
            },
            {
                "file_key": "the_mountain-happy-happy-upbeat",
                "title": "Mood Boosters",
                "artist": "The_Mountain",
                "genre": "Happy",
            },
            {
                "file_key": "alexguz-funk-on",
                "title": "Espresso",
                "artist": "AlexGuz",
                "genre": "Funk",
            },
            {
                "file_key": "alex-morgan-lofi-coffee-shop",
                "title": "Clouds",
                "artist": "alex-morgan",
                "genre": "Lo-fi",
            },
            {
                "file_key": "zephiramusic-lofi-romantic",
                "title": "Lover",
                "artist": "ZephiraMusic",
                "genre": "Romantic",
            },
            {
                "file_key": "good_b_music-happy-summer",
                "title": "Spring Days",
                "artist": "Good_B_Music",
                "genre": "Happy",
            },
            {
                "file_key": "alex-morgan-lofi-midnight-club",
                "title": "Midnight",
                "artist": "alex-morgan",
                "genre": "Lo-fi",
            },
            {
                "file_key": "zephiramusic-positive-lofi",
                "title": "Good Days",
                "artist": "ZephiraMusic",
                "genre": "Lo-fi",
            },
            {
                "file_key": "ornave-lofi-night-haze",
                "title": "Midnights",
                "artist": "Ornave",
                "genre": "Ambient",
            },
            {
                "file_key": "lemonmusicstudio-the-cradle",
                "title": "Flowers",
                "artist": "lemonmusicstudio",
                "genre": "Acoustic",
            },
            {
                "file_key": "alex-morgan-lofi-chill-vlog-beats",
                "title": "As It Was",
                "artist": "alex-morgan",
                "genre": "Lo-fi",
            },
            {
                "file_key": "zephiramusic-lofi-focus",
                "title": "Focus",
                "artist": "ZephiraMusic",
                "genre": "Lo-fi",
            },
            {
                "file_key": "cinematic-soul-next-level-energy",
                "title": "Energy",
                "artist": "Cinematic-Soul",
                "genre": "Electronic",
            },
        ]

        uploaded = 0
        skipped = 0
        failed = 0

        for song_data in songs:

            # Find the MP3 file using part of its filename
            matching_files = list(
                music_folder.glob(
                    f"*{song_data['file_key']}*.mp3"
                )
            )

            if not matching_files:
                self.stdout.write(
                    self.style.ERROR(
                        f"FILE NOT FOUND: {song_data['file_key']}"
                    )
                )
                failed += 1
                continue

            audio_file = matching_files[0]

            # Prevent duplicate database entries
            if Song.objects.filter(
                title=song_data["title"],
                artist=song_data["artist"]
            ).exists():

                self.stdout.write(
                    self.style.WARNING(
                        f"SKIPPED: {song_data['title']} already exists"
                    )
                )

                skipped += 1
                continue

            try:
                self.stdout.write(
                    f"Uploading: {audio_file.name}"
                )

                # Upload MP3 to Cloudinary
                result = cloudinary.uploader.upload(
                    str(audio_file),
                    resource_type="video",
                    folder="vibe/audio"
                )

                audio_url = result.get("secure_url")

                # Create Song record in PostgreSQL
                Song.objects.create(
                    title=song_data["title"],
                    artist=song_data["artist"],
                    genre=song_data["genre"],
                    audio_url=audio_url,
                    image_url=""
                )

                self.stdout.write(
                    self.style.SUCCESS(
                        f"SUCCESS: {song_data['title']} - "
                        f"{song_data['artist']}"
                    )
                )

                uploaded += 1

            except Exception as e:

                self.stdout.write(
                    self.style.ERROR(
                        f"FAILED: {song_data['title']} -> {e}"
                    )
                )

                failed += 1

        self.stdout.write("")
        self.stdout.write("========== SUMMARY ==========")
        self.stdout.write(
            self.style.SUCCESS(
                f"Uploaded: {uploaded}"
            )
        )
        self.stdout.write(
            self.style.WARNING(
                f"Skipped: {skipped}"
            )
        )
        self.stdout.write(
            self.style.ERROR(
                f"Failed: {failed}"
            )
        )
        self.stdout.write("=============================")