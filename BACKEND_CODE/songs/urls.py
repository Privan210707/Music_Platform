from django.urls import path
from .views import (SongListView,SongSearchView,RecentSearchCreateView,RecentSearchListView,RecentSearchDeleteView,
ArtistListView,GenreListView,ArtistDetailView,AlbumDetailView,ArtistProfileView)


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
    path("artists/<str:artist_name>/profile/",ArtistProfileView.as_view(),name="artist-profile")
]