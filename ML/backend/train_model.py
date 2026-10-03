import os
import joblib
import pandas as pd
import numpy as np

from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors


# --------------------------------------------------
# PATHS
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

CSV_PATH = os.path.join(DATA_DIR, "musix_cleaned_data.csv")


# --------------------------------------------------
# LOAD DATA
# --------------------------------------------------

print("Loading dataset...")

df = pd.read_csv(CSV_PATH)

print("Dataset loaded!")
print("Rows:", len(df))
print("Columns:", len(df.columns))


# --------------------------------------------------
# AUDIO FEATURES
# --------------------------------------------------

audio_features = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "loudness",
    "speechiness",
    "tempo",
    "valence",
]


# Make sure all required columns exist
missing = [
    feature
    for feature in audio_features
    if feature not in df.columns
]

if missing:
    raise ValueError(
        f"Missing audio features: {missing}"
    )


# --------------------------------------------------
# CLEAN AUDIO DATA
# --------------------------------------------------

features_df = df[audio_features].copy()

features_df = features_df.apply(
    pd.to_numeric,
    errors="coerce"
)

features_df = features_df.fillna(
    features_df.median()
)


# --------------------------------------------------
# SCALE FEATURES
# --------------------------------------------------

print("Scaling audio features...")

scaler = StandardScaler()

feature_matrix = scaler.fit_transform(
    features_df
)


# --------------------------------------------------
# TRAIN KNN MODEL
# --------------------------------------------------

print("Training KNN model...")

knn = NearestNeighbors(
    metric="cosine",
    algorithm="brute"
)

knn.fit(feature_matrix)


# --------------------------------------------------
# TF-IDF MODEL
# --------------------------------------------------

print("Creating TF-IDF model...")

text_column = "combined_text"

if text_column in df.columns:

    text_data = (
        df[text_column]
        .fillna("")
        .astype(str)
    )

else:

    text_data = (
        df["track_name"]
        .fillna("")
        .astype(str)
    )


tfidf = TfidfVectorizer(
    max_features=5000,
    stop_words="english"
)

tfidf_matrix = tfidf.fit_transform(
    text_data
)


# --------------------------------------------------
# SAVE MODELS
# --------------------------------------------------

print("Saving model files...")

joblib.dump(
    knn,
    os.path.join(
        DATA_DIR,
        "musix_knn_model.pkl"
    )
)

joblib.dump(
    feature_matrix,
    os.path.join(
        DATA_DIR,
        "musix_features.pkl"
    )
)

joblib.dump(
    tfidf,
    os.path.join(
        DATA_DIR,
        "musix_tfidf.pkl"
    )
)

joblib.dump(
    scaler,
    os.path.join(
        DATA_DIR,
        "musix_scaler.pkl"
    )
)


# --------------------------------------------------
# FINISHED
# --------------------------------------------------

print("\n================================")
print("ML MODEL TRAINING COMPLETED")
print("================================")

print("\nCreated files:")

print("✓ musix_knn_model.pkl")
print("✓ musix_features.pkl")
print("✓ musix_tfidf.pkl")
print("✓ musix_scaler.pkl")