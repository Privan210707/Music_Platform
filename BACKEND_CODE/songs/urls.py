from django.urls import path
from .views import SongListView,SongSearchView,RecentSearchCreateView,RecentSearchListView,RecentSearchDeleteView

urlpatterns = [
    path("", SongListView.as_view(), name="song-list"),
    path("search/",SongSearchView.as_view(),name="song-search"),
    path("search/recent/",RecentSearchCreateView.as_view()),
    path("search/recent/list/",RecentSearchListView.as_view()),
    path("search/recent/<int:id>/",RecentSearchDeleteView.as_view())
]