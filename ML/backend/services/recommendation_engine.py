import os
import joblib
import pandas as pd
import numpy as np


# --------------------------------------------------
# FIND DATA FOLDER
# --------------------------------------------------

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

DATA_DIR = os.path.join(BASE_DIR, "data")


# --------------------------------------------------
# LOAD ML MODEL
# --------------------------------------------------

knn = joblib.load(
    os.path.join(DATA_DIR, "musix_knn_model.pkl")
)

feature_matrix = joblib.load(
    os.path.join(DATA_DIR, "musix_features.pkl")
)

tfidf = joblib.load(
    os.path.join(DATA_DIR, "musix_tfidf.pkl")
)

scaler = joblib.load(
    os.path.join(DATA_DIR, "musix_scaler.pkl")
)

df = pd.read_csv(
    os.path.join(DATA_DIR, "musix_cleaned_data.csv")
)


# --------------------------------------------------
# FIND IMPORTANT COLUMNS
# --------------------------------------------------

track_col = None
artist_col = None
genre_col = None


for col in df.columns:

    col_lower = col.lower()

    if track_col is None and (
        "track" in col_lower
        or "song" in col_lower
        or "name" in col_lower
    ):
        track_col = col

    if artist_col is None and "artist" in col_lower:
        artist_col = col

    if genre_col is None and "genre" in col_lower:
        genre_col = col


# --------------------------------------------------
# SONG RECOMMENDATION
# --------------------------------------------------

def recommend_songs(song_name, n=5):

    matches = df[
        df[track_col]
        .astype(str)
        .str.lower()
        == song_name.lower()
    ]

    if matches.empty:
        return None

    song_index = matches.index[0]

    song_position = df.index.get_loc(song_index)

    distances, indices = knn.kneighbors(
        feature_matrix[song_position],
        n_neighbors=min(n + 1, len(df))
    )

    recommended_indices = [
        i
        for i in indices[0]
        if i != song_position
    ][:n]

    columns = []

    if track_col:
        columns.append(track_col)

    if artist_col:
        columns.append(artist_col)

    if genre_col:
        columns.append(genre_col)

    result = df.iloc[
        recommended_indices
    ][columns]

    return result


# --------------------------------------------------
# MOOD PROFILES
# --------------------------------------------------

mood_profiles = {

    "happy": {
        "valence": 0.8,
        "energy": 0.8,
        "danceability": 0.7
    },

    "sad": {
        "valence": 0.2,
        "energy": 0.3,
        "danceability": 0.3
    },

    "calm": {
        "valence": 0.5,
        "energy": 0.2,
        "danceability": 0.3
    },

    "party": {
        "valence": 0.8,
        "energy": 0.9,
        "danceability": 0.9
    },

    "love": {
        "valence": 0.7,
        "energy": 0.5,
        "danceability": 0.5
    }
}


# --------------------------------------------------
# MOOD RECOMMENDATION
# --------------------------------------------------

def recommend_by_mood(mood, n=5):

    mood = mood.lower()

    if mood not in mood_profiles:
        return None

    profile = mood_profiles[mood]

    required_features = [
        "valence",
        "energy",
        "danceability"
    ]

    # Check that the dataset contains these columns
    for feature in required_features:

        if feature not in df.columns:
            return None

    # Calculate distance from mood profile

    distances = np.zeros(len(df))

    for feature in required_features:

        difference = (
            df[feature] - profile[feature]
        )

        distances += difference ** 2

    distances = np.sqrt(distances)

    # Get closest songs

    closest_indices = np.argsort(
        distances
    )[:n]

    columns = []

    if track_col:
        columns.append(track_col)

    if artist_col:
        columns.append(artist_col)

    if genre_col:
        columns.append(genre_col)

    return df.iloc[
        closest_indices
    ][columns]


if __name__ == "__main__":
    print("\nTesting recommendation model...\n")
    result = recommend_songs("TROUBLE", 5)
    print(result)
