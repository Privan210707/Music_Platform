const API_URL = "https://vibe-backend-3jcm.onrender.com";

async function request(url, options = {}) {
  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.detail ||
        data.message ||
        data.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}

export async function signup(username, email, password) {
  return request("/api/signup/", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
}

export async function login(email, password) {
  const data = await request("/api/login/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const token =
    data.access_token ||
    data.access ||
    data.token;

  if (!token) {
    throw new Error("Login successful but token was not received.");
  }

  localStorage.setItem("access_token", token);

  if (data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }

  return data;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export async function getHome() {
  return request("/api/home/");
}

export async function getProfile() {
  return request("/api/profile/");
}

export async function searchSongs(query) {
  return request(
    `/api/songs/search/?q=${encodeURIComponent(query)}`
  );
}

export async function getRecentSearches() {
  return request("/api/songs/search/recent/list/");
}

export async function saveRecentSearch(query) {
  return request("/api/songs/search/recent/", {
    method: "POST",
    body: JSON.stringify({
      query: query.trim(),
    }),
  });
}

export async function deleteRecentSearch(id) {
  return request(`/api/songs/search/recent/${id}/`, {
    method: "DELETE",
  });
}

export async function playSong(songId) {
  return request("/api/songs/play/", {
    method: "POST",
    body: JSON.stringify({
      song_id: songId,
    }),
  });
}

export async function getLikedSongs() {
  return request("/api/songs/liked/");
}

export async function likeSong(songId) {
  return request(`/api/songs/${songId}/like/`, {
    method: "POST",
  });
}

export async function unlikeSong(songId) {
  return request(`/api/songs/${songId}/like/`, {
    method: "DELETE",
  });
}

export async function getPlaylists() {
  return request("/api/playlists/");
}

export async function createPlaylist(name) {
  return request("/api/playlists/", {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
}

export async function getRecentlyPlayed() {
  return request("/api/songs/recently-played/");
}

export async function getGenres() {
  return request("/api/genres/");
}

export async function getArtists() {
  return request("/api/artists/");
}

export async function getMoods() {
  return request("/api/songs/vibe-ai/moods/");
}

export async function vibeRecommend(mood) {
  return request("/api/songs/vibe-ai/recommend/", {
    method: "POST",
    body: JSON.stringify({
      mood,
    }),
  });
}

export async function vibeCreatePlaylist(mood) {
  return request("/api/songs/vibe-ai/create-playlist/", {
    method: "POST",
    body: JSON.stringify({
      mood,
    }),
  });
}

export async function mlRecommend(songName, n = 10) {
  return request("/api/songs/ml-recommend/", {
    method: "POST",
    body: JSON.stringify({
      song_name: songName,
      n,
    }),
  });
}