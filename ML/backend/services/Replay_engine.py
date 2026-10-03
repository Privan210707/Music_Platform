import pandas as pd


class ReplayEngine:

    def __init__(self, catalog_df, events):

        self.catalog = catalog_df.copy()
        self.events = pd.DataFrame(events)

        if self.events.empty:
            self.events = pd.DataFrame(
                columns=["user_id", "track_id", "timestamp"]
            )

        self.events["timestamp"] = pd.to_datetime(
            self.events["timestamp"]
        )

        # Avoid duplicate track_id rows in the catalog
        metadata = self.catalog.drop_duplicates("track_id")

        self.history = self.events.merge(
            metadata[
                [
                    "track_id",
                    "track_name",
                    "artist_name",
                    "album_name",
                    "language",
                    "duration_ms"
                ]
            ],
            on="track_id",
            how="left"
        )

    def generate_replay(self, user_id):

        history = self.history[
            self.history["user_id"] == user_id
        ].copy()

        if history.empty:
            return {
                "user_id": user_id,
                "message": "No listening history found."
            }

        total_plays = len(history)

        unique_songs = history["track_id"].nunique()

        unique_artists = history["artist_name"].nunique()

        song_counts = history["track_id"].value_counts()

        artist_counts = history["artist_name"].value_counts()

        language_counts = history["language"].value_counts()

        top_song_id = song_counts.index[0]

        top_song = history[
            history["track_id"] == top_song_id
        ].iloc[0]

        # Day vs Night
        night_hours = [20, 21, 22, 23, 0, 1, 2, 3, 4, 5]

        night_plays = int(
            history["timestamp"]
            .dt.hour
            .isin(night_hours)
            .sum()
        )

        day_plays = total_plays - night_plays

        listener_type = (
            "Night Owl"
            if night_plays > day_plays
            else "Day Listener"
        )

        # Most active hour
        hour_counts = (
            history["timestamp"]
            .dt.hour
            .value_counts()
        )

        most_active_hour = int(
            hour_counts.index[0]
        )

        # Most active day
        day_counts = (
            history["timestamp"]
            .dt.day_name()
            .value_counts()
        )

        most_active_day = str(
            day_counts.index[0]
        )

        # Repeat rate
        repeated_songs = (
            (song_counts > 1).sum()
        )

        repeat_rate = (
            repeated_songs / unique_songs
        )

        return {
            "user_id": user_id,

            "overview": {
                "total_plays": int(total_plays),
                "unique_songs": int(unique_songs),
                "unique_artists": int(unique_artists)
            },

            "favorites": {
                "most_repeated_song": {
                    "track_name": str(top_song["track_name"]),
                    "artist": str(top_song["artist_name"]),
                    "plays": int(song_counts.iloc[0])
                },

                "top_artist": {
                    "artist": str(artist_counts.index[0]),
                    "plays": int(artist_counts.iloc[0])
                },

                "top_language": {
                    "language": str(language_counts.index[0]),
                    "plays": int(language_counts.iloc[0])
                }
            },

            "listening_habit": {
                "type": listener_type,
                "most_active_hour": most_active_hour,
                "most_active_day": most_active_day,
                "day_plays": day_plays,
                "night_plays": night_plays
            },

            "repetition": {
                "repeat_rate": round(
                    float(repeat_rate),
                    4
                )
            }
        }