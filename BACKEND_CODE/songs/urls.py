from django.urls import path
from .views import (SongListView,SongSearchView,RecentSearchCreateView,RecentSearchListView,RecentSearchDeleteView,
ArtistListView,GenreListView,ArtistDetailView,AlbumDetailView,ArtistProfileView,SongPlayView,
SongUploadView,SongShareView,SharedSongView,
ArtistFollowView,ArtistUnfollowView,ArtistFollowersView,ArtistFollowStatusView,
VibeMoodsView,RecentVibesView,CreateVibePlaylistView,
MLRecommendationView,VibeRecommendationView,StatisticsView)


urlpatterns = [
    path("", SongListView.as_view(), name="song-list"),
    path("search/",SongSearchView.as_view(),name="song-search"),
    path("search/recent/",RecentSearchCreateView.as_view()),
    path("search/recent/list/",RecentSearchListView.as_view()),
    path("search/recent/<int:id>/",RecentSearchDeleteView.as_view()),
    path("explore/genres/",GenreListView.as_view(),name="genre-list"),
    path("explore/artists/",ArtistListView.as_view(),name="artist-list"),
    path("artists/<str:artist_name>/",ArtistDetailView.as_view(),name="artist-detail"),
    path("albums/<int:album_id>/",AlbumDetailView.as_view(),name="album-detail"),
    path("artists/<str:artist_name>/profile/",ArtistProfileView.as_view(),name="artist-profile"),
    path("play/",SongPlayView.as_view(),name="song-play"),
    path("vibe-ai/moods/",VibeMoodsView.as_view(),name="vibe-ai-moods"),
    path("vibe-ai/recent/",RecentVibesView.as_view(),name="vibe-ai-recent"),
    path("vibe-ai/create-playlist/",CreateVibePlaylistView.as_view(),name="vibe-ai-create-playlist"),
    path("upload/",SongUploadView.as_view(),name="song-upload"),
    path("share/",SongShareView.as_view(),name="song-share"),
    path("share/<uuid:share_id>/",SharedSongView.as_view(),name="shared-song"),
    path("artists/<int:artist_id>/follow/",ArtistFollowView.as_view(),name="artist-follow"),
    path("artists/<int:artist_id>/unfollow/",ArtistUnfollowView.as_view(),name="artist-unfollow"),
    path("artists/<int:artist_id>/followers/",ArtistFollowersView.as_view(),name="artist-followers"),
    path("artists/<int:artist_id>/follow-status/",ArtistFollowStatusView.as_view(),name="artist-folllow-status"),

    #ML APIs
    path("recommended/",MLRecommendationView.as_view(),name="ml-recommend"),
    path("vibe-ai/recommend/",VibeRecommendationView.as_view(),name="vibe-ai-recommend"),
    path("statistics/",StatisticsView.as_view(),name="statistics"),
]