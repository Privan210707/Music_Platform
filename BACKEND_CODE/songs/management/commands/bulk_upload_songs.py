from pathlib import Path

import cloudinary.uploader

from django.conf import settings
from django.core.management.base import BaseCommand

from songs.models import Song


class Command(BaseCommand):
    help = "Upload 15 demo songs to Cloudinary and save them in PostgreSQL"

    def handle(self, *args, **kwargs):

        # Folder containing the MP3 files
        music_folder = Path(settings.BASE_DIR) / "music_uploads"

        if not music_folder.exists():
            self.stdout.write(
                self.style.ERROR(
                    f"music_uploads folder not found: {music_folder}"
                )
            )
            return

        # --------------------------------------------------
        # ALL 15 SONGS
        # --------------------------------------------------

        songs_data = [

            {
                "filename": "juliush-classic-guitar-bolero-2714.mp3",
                "title": "Classic Guitar Bolero",
                "artist": "JuliusH",
                "genre": "Romantic",
            },

            {
                "filename": "juliush-cool-jazz-loops-2641.mp3",
                "title": "Cool Jazz Loops",
                "artist": "JuliusH",
                "genre": "Chill",
            },

            {
                "filename": "juliush-for-elise-prelude-beethoven-classic-grand-piano-music-1124.mp3",
                "title": "For Elise - Prelude - Beethoven",
                "artist": "JuliusH",
                "genre": "Classical",
            },

            {
                "filename": "juliush-happy-hour-jazzy-summer-music-113220.mp3",
                "title": "Happy Hour - Jazzy Summer Music",
                "artist": "JuliusH",
                "genre": "Pop",
            },

            {
                "filename": "juliush-rhythm-and-blues-shuffle-2711.mp3",
                "title": "Rhythm and Blues Shuffle",
                "artist": "JuliusH",
                "genre": "Indie",
            },

            {
                "filename": "rockot-beautiful-acoustic-folk-184580.mp3",
                "title": "Beautiful Acoustic Folk",
                "artist": "Rockot",
                "genre": "Acoustic",
            },

            {
                "filename": "rockot-futuristic-sci-fi-174819.mp3",
                "title": "Futuristic Sci Fi",
                "artist": "Rockot",
                "genre": "Dance",
            },

            {
                "filename": "rockot-majestic-inspiring-orchestra-music-for-inspiration-174133.mp3",
                "title": "Majestic Inspiring Orchestra",
                "artist": "Rockot",
                "genre": "Instrumental",
            },

            {
                "filename": "rockot-motivational-technology-184600.mp3",
                "title": "Motivational Technology",
                "artist": "Rockot",
                "genre": "Dance",
            },

            {
                "filename": "rockot-pink-lemon-positive-happy-motivational-commercial-anthem-184602.mp3",
                "title": "Pink Lemon",
                "artist": "Rockot",
                "genre": "Pop",
            },

            {
                "filename": "rockot-strength-of-will-174144.mp3",
                "title": "Strength Of Will",
                "artist": "Rockot",
                "genre": "Rock",
            },

            {
                "filename": "rockot-success-affirmations-184606.mp3",
                "title": "Success Affirmations",
                "artist": "Rockot",
                "genre": "Instrumental",
            },

            {
                "filename": "tunetank-ambient-space-cinematic-music-347687.mp3",
                "title": "Ambient Space Cinematic Music",
                "artist": "Tunetank",
                "genre": "Chill",
            },

            {
                "filename": "tunetank-futuristic-chiil-beat-409346.mp3",
                "title": "Futuristic Chill Beat",
                "artist": "Tunetank",
                "genre": "Lo-fi",
            },

            {
                "filename": "tunetank-sci-fi-ambient-347390.mp3",
                "title": "Sci-Fi Ambient",
                "artist": "Tunetank",
                "genre": "Lo-fi",
            },
        ]

        # --------------------------------------------------
        # UPLOAD
        # --------------------------------------------------

        uploaded_count = 0
        skipped_count = 0
        failed_count = 0

        self.stdout.write("\n")
        self.stdout.write(
            self.style.SUCCESS(
                "===== VIBE BULK SONG UPLOAD ====="
            )
        )

        self.stdout.write(
            f"Total songs to process: {len(songs_data)}"
        )

        for song_data in songs_data:

            filename = song_data["filename"]
            title = song_data["title"]
            artist = song_data["artist"]
            genre = song_data["genre"]

            file_path = music_folder / filename

            self.stdout.write("\n")
            self.stdout.write(
                f"Processing: {title}"
            )

            # --------------------------------------------------
            # Check local file
            # --------------------------------------------------

            if not file_path.exists():

                self.stdout.write(
                    self.style.ERROR(
                        f"FILE NOT FOUND: {filename}"
                    )
                )

                failed_count += 1
                continue

            # --------------------------------------------------
            # Check duplicate
            # --------------------------------------------------

            existing_song = Song.objects.filter(
                title=title,
                artist=artist
            ).first()

            if existing_song:

                self.stdout.write(
                    self.style.WARNING(
                        "Already exists in PostgreSQL. Skipping."
                    )
                )

                skipped_count += 1
                continue

            # --------------------------------------------------
            # Upload MP3 to Cloudinary
            # --------------------------------------------------

            try:

                self.stdout.write(
                    "Uploading to Cloudinary..."
                )

                result = cloudinary.uploader.upload(
                    str(file_path),
                    resource_type="video",
                    folder="vibe/audio"
                )

                audio_url = result.get("secure_url")

                if not audio_url:
                    raise Exception(
                        "Cloudinary did not return a secure URL."
                    )

                # --------------------------------------------------
                # Save song in PostgreSQL
                # --------------------------------------------------

                song = Song.objects.create(
                    title=title,
                    artist=artist,
                    genre=genre,
                    image_url="",
                    audio_url=audio_url
                )

                uploaded_count += 1

                self.stdout.write(
                    self.style.SUCCESS(
                        "SUCCESS - Song saved!"
                    )
                )

                self.stdout.write(
                    f"Database ID: {song.id}"
                )

            except Exception as e:

                failed_count += 1

                self.stdout.write(
                    self.style.ERROR(
                        f"FAILED: {str(e)}"
                    )
                )

        # --------------------------------------------------
        # FINAL RESULT
        # --------------------------------------------------

        self.stdout.write("\n")
        self.stdout.write(
            "=" * 50
        )

        self.stdout.write(
            self.style.SUCCESS(
                f"Uploaded: {uploaded_count}"
            )
        )

        self.stdout.write(
            self.style.WARNING(
                f"Skipped: {skipped_count}"
            )
        )

        self.stdout.write(
            self.style.ERROR(
                f"Failed: {failed_count}"
            )
        )

        self.stdout.write(
            f"Total: {len(songs_data)}"
        )

        self.stdout.write(
            "=" * 50
        )