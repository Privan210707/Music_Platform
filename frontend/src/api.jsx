const API_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://vibe-backend-3jcm.onrender.com"
).replace(/\/$/, "");


function saveTokens(data) {
  const access = data.access || data.access_token;
  const refresh = data.refresh || data.refresh_token;


  if (access) localStorage.setItem("access", access);
  if (refresh) localStorage.setItem("refresh", refresh);
}



export function getToken() {
  return (
    localStorage.getItem("access") ||
    localStorage.getItem("access_token")
  );
}

async function apiRequest(path, options = {}, protectedRoute = false) {
  const headers = { ...options.headers };

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (protectedRoute) {
    const token = getToken();

    if (!token) throw new Error("Please log in first.");

    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error("Cannot connect to the backend.");
  }

  if (response.status === 204) return {};

  const contentType = response.headers.get("content-type") || "";
  let data;

  if (contentType.includes("application/json")) {
    data = await response.json().catch(() => ({}));
  } else {
    data = await response.text().catch(() => "");
  }

  if (!response.ok) {
    let message = "Request failed. Please try again.";

    if (typeof data === "string" && data) {
      message = data;
    } else if (data.detail) {
      message = data.detail;
    } else if (data.message) {
      message = data.message;
    } else if (data.error) {
      message = data.error;
    } else {
      message = Object.entries(data)
        .map(([key, value]) =>
          `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
        )
        .join(" ") || message;
    }

    throw new Error(message);
  }

  return data;
}

function get(path, protectedRoute = false) {
  return apiRequest(path, {}, protectedRoute);
}

function post(path, body = {}, protectedRoute = false) {
  return apiRequest(
    path,
    { method: "POST", body: JSON.stringify(body) },
    protectedRoute
  );
}

function remove(path, protectedRoute = true) {
  return apiRequest(path, { method: "DELETE" }, protectedRoute);
}

function encode(value) {
  return encodeURIComponent(value);
}

export async function signupUser(details) {
  return post("/api/signup/", details);
}

export async function loginUser(details) {
  const data = await post("/api/login/", details);
  saveTokens(data);
  return data;
}

export function logoutUser() {
  localStorage.removeItem("access");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("refresh_token");
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function getProfile() {
  return get("/api/profile/", true);
}

export function getHome() {
  return get("/api/home/", true);
}

export function searchSongs(query) {
  return get(`/api/songs/search/?q=${encode(query)}`);
}

export function saveRecentSearch(query) {
  return post("/api/songs/search/recent/", { query }, true);
}

export function getRecentSearches() {
  return get("/api/songs/search/recent/list/", true);
}

export function deleteRecentSearch(id) {
  return remove(`/api/songs/search/recent/${id}/`);
}

export function getGenres() {
  return get("/api/songs/genres/");
}

export function getArtists() {
  return get("/api/songs/artists/");
}

export function getArtistDetails(artistName) {
  return get(`/api/songs/artists/${encode(artistName)}/`);
}

export function getArtistProfile(artistName) {
  return get(`/api/songs/artists/${encode(artistName)}/profile/`);
}

export function getAlbumDetails(albumName) {
  return get(`/api/songs/albums/${encode(albumName)}/`);
}

export function playSong(songId) {
  return post("/api/songs/play/", { song_id: songId }, true);
}

export function getLibrary() {
  return get("/api/library/", true);
}

export function getLikedSongs() {
  return get("/api/library/liked-songs/", true);
}

export function likeSong(songId) {
  return post(`/api/library/liked-songs/${songId}/`, {}, true);
}

export function unlikeSong(songId) {
  return remove(`/api/library/liked-songs/${songId}/`);
}

export function getPlaylists() {
  return get("/api/library/playlists/", true);
}

export function createPlaylist(name) {
  return post("/api/library/playlists/", { name }, true);
}

export function addSongToPlaylist(playlistId, songId) {
  return post(
    `/api/library/playlists/${playlistId}/songs/`,
    { song_id: songId },
    true
  );
}

export function removeSongFromPlaylist(playlistId, songId) {
  return remove(
    `/api/library/playlists/${playlistId}/songs/${songId}/`
  );
}

export function getRecentlyPlayed() {
  return get("/api/library/recently-played/", true);
}

export function getSavedAlbums() {
  return get("/api/library/saved-albums/", true);
}

export function getSavedArtists() {
  return get("/api/library/saved-artists/", true);
}

export function uploadSong(songDetails) {
  const formData = new FormData();

  Object.entries(songDetails).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  return apiRequest(
    "/api/songs/upload/",
    { method: "POST", body: formData },
    true
  );
}

export function shareSong(songId) {
  return post("/api/songs/share/", { song_id: songId }, true);
}

export function getSharedSong(shareId) {
  return get(`/api/songs/share/${encode(shareId)}/`);
}

export function followUser(userId) {
  return post(`/api/accounts/users/${userId}/follow/`, {}, true);
}

export function unfollowUser(userId) {
  return remove(`/api/accounts/users/${userId}/unfollow/`);
}

export function followArtist(artistId) {
  return post(`/api/songs/artists/${artistId}/follow/`, {}, true);
}

export function unfollowArtist(artistId) {
  return remove(`/api/songs/artists/${artistId}/unfollow/`);
}

export function getArtistFollowers(artistId) {
  return get(`/api/songs/artists/${artistId}/followers/`);
}

export function getArtistFollowStatus(artistId) {
  return get(`/api/songs/artists/${artistId}/follow-status/`, true);
}

export function getMoods() {
  return get("/api/songs/vibe-ai/moods/", true);
}

export function getRecentMoods() {
  return get("/api/songs/vibe-ai/recent/", true);
}

export function getMoodRecommendations(mood) {
  return post("/api/songs/vibe-ai/recommend/", { mood }, true);
}

export function createMoodPlaylist(mood) {
  return post("/api/songs/vibe-ai/create-playlist/", { mood }, true);
}

export function getMLRecommendations(songName, n = 5) {
  return post(
    "/api/songs/ml-recommend/",
    { song_name: songName, n },
    true
  );
}