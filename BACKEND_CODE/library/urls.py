from django.urls import path

from .views import (
    LibraryView,
    
    LikeSongView,
    UnlikeSongView,
    LikedSongsView,

    PlaylistListCreateView,
    PlaylistDetailView,
    PlaylistDeleteView,

    AddSongToPlaylistView,
    RemoveSongFromPlaylistView,

    RecentlyPlayedView,

    SaveAlbumView,
    RemoveAlbumView,
    SavedAlbumsView,

    SaveArtistView,
    RemoveArtistView,
    SavedArtistsView,
)


urlpatterns = [

    # Main Library
    path(
        "",
        LibraryView.as_view(),
        name="library"
    ),

    # Liked Songs
    path(
        "liked/",
        LikedSongsView.as_view(),
        name="liked-songs"
    ),

    path(
        "liked/<int:song_id>/",
        LikeSongView.as_view(),
        name="like-song"
    ),

    path(
        "liked/<int:song_id>/remove/",
        UnlikeSongView.as_view(),
        name="unlike-song"
    ),

    # Playlists
    path(
        "playlists/",
        PlaylistListCreateView.as_view(),
        name="playlist-list-create"
    ),

    path(
        "playlists/<int:playlist_id>/",
        PlaylistDetailView.as_view(),
        name="playlist-detail"
    ),

    path(
        "playlists/<int:playlist_id>/delete/",
        PlaylistDeleteView.as_view(),
        name="playlist-delete"
    ),

    # Playlist Songs
    path(
        "playlists/<int:playlist_id>/songs/<int:song_id>/",
        AddSongToPlaylistView.as_view(),
        name="add-song-to-playlist"
    ),

    path(
        "playlists/<int:playlist_id>/songs/<int:song_id>/remove/",
        RemoveSongFromPlaylistView.as_view(),
        name="remove-song-from-playlist"
    ),

    # Recently Played
    path(
        "recently-played/",
        RecentlyPlayedView.as_view(),
        name="recently-played"
    ),

    # Albums
    path(
        "albums/",
        SavedAlbumsView.as_view(),
        name="saved-albums"
    ),

    path(
        "albums/<int:album_id>/save/",
        SaveAlbumView.as_view(),
        name="save-album"
    ),

    path(
        "albums/<int:album_id>/remove/",
        RemoveAlbumView.as_view(),
        name="remove-album"
    ),

    # Artists
    path(
        "artists/",
        SavedArtistsView.as_view(),
        name="saved-artists"
    ),

    path(
        "artists/<int:artist_id>/save/",
        SaveArtistView.as_view(),
        name="save-artist"
    ),

    path(
        "artists/<int:artist_id>/remove/",
        RemoveArtistView.as_view(),
        name="remove-artist"
    ),
]