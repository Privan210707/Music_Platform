from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
from pathlib import Path
import pandas as pd

from services.Replay_engine import ReplayEngine
from services.recommendation_engine import (
    recommend_songs,
    recommend_by_mood
)


app = FastAPI(
    title="Music Streaming API",
    description="Backend API for our music streaming platform",
    version="1.0.0"
)


# =========================
# LOAD MUSIC DATASET
# =========================

DATA_PATH = Path("data/spotify_tracks.csv")

df = pd.read_csv(DATA_PATH)


# =========================
# TEMPORARY LISTENING STORAGE
# =========================

listening_events = []


# =========================
# REQUEST MODELS
# =========================

class ListeningEvent(BaseModel):
    user_id: int
    track_id: str


class RecommendationRequest(BaseModel):
    song_name: str
    n: int = 5


class MoodRequest(BaseModel):
    mood: str
    n: int = 5


# =========================
# HOME
# =========================

@app.get("/")
def home():
    return {
        "message": "Music Streaming API is running!"
    }


# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# =========================
# RECORD LISTENING EVENT
# =========================

@app.post("/listen")
def record_listening(event: ListeningEvent):

    track = df[
        df["track_id"] == event.track_id
    ]

    if track.empty:
        raise HTTPException(
            status_code=404,
            detail="Track ID not found in music catalog."
        )

    timestamp = datetime.now()

    listening_event = {
        "user_id": event.user_id,
        "track_id": event.track_id,
        "timestamp": timestamp
    }

    listening_events.append(listening_event)

    song = track.iloc[0]

    return {
        "message": "Listening event recorded successfully",
        "data": {
            "user_id": event.user_id,
            "track_id": event.track_id,
            "song": song["track_name"],
            "artist": song["artist_name"],
            "timestamp": timestamp.isoformat()
        }
    }


# =========================
# PERSONALIZED REPLAY
# =========================

@app.get("/replay/{user_id}")
def get_replay(user_id: int):

    user_events = [
        event
        for event in listening_events
        if event["user_id"] == user_id
    ]

    if not user_events:
        return {
            "user_id": user_id,
            "message": "No listening history found."
        }

    engine = ReplayEngine(
        catalog_df=df,
        events=listening_events
    )

    return engine.generate_replay(
        user_id=user_id
    )


# =========================
# SONG RECOMMENDATION
# =========================

@app.post("/recommend")
def get_recommendations(request: RecommendationRequest):

    result = recommend_songs(
        request.song_name,
        request.n
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Song not found"
        )

    return {
        "song": request.song_name,
        "recommendations": result.to_dict(
            orient="records"
        )
    }


# =========================
# MOOD RECOMMENDATION
# =========================

@app.post("/recommend/mood")
def get_mood_recommendations(request: MoodRequest):

    result = recommend_by_mood(
        request.mood,
        request.n
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Mood not supported or required features are missing"
        )

    return {
        "mood": request.mood,
        "recommendations": result.to_dict(
            orient="records"
        )
    }