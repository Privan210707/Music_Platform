
import { useEffect, useState } from "react";
import {
  getLikedSongs,
  getPlaylists,
  getRecentlyPlayed,
  getSavedAlbums,
  getSavedArtists,
  createPlaylist,
} from "../api";

function listFrom(data, keys = []) {
  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  return [];
}

export default function Library() {
  const [section, setSection] = useState("recent");

  const [liked, setLiked] = useState([
    { id: "liked-1", title: "Khat", image: "/khat.png", artist: "Vibe" },
    { id: "liked-2", title: "Gul", image: "/gul.png", artist: "Vibe" },
  ]);

  const [playlists, setPlaylists] = useState([
    { id: "playlist-1", name: "Normal", image: "/As it.png" },
    { id: "playlist-2", name: "Die with Smile", image: "/die with.png" },
    { id: "playlist-3", name: "Havana", image: "/havana.png" },
  ]);

  const [recent, setRecent] = useState([
    { id: "recent-1", title: "Khat", image: "/khat.png", artist: "Vibe" },
    { id: "recent-2", title: "Chahu Main", image: "/chahu main.png", artist: "Vibe" },
    { id: "recent-3", title: "Gul", image: "/gul.png", artist: "Vibe" },
    { id: "recent-4", title: "Jhol", image: "/jhol.png", artist: "Vibe" },
    { id: "recent-5", title: "Alag Aasmaan", image: "/alag aasman.png", artist: "Vibe" },
  ]);

  const [albums, setAlbums] = useState([
    { id: "album-1", name: "As It Was", image: "/As it.png" },
    { id: "album-2", name: "Die with Smile", image: "/die with.png" },
  ]);

  const [artists, setArtists] = useState([
    { id: "artist-1", name: "Halsey", image: "/halsey.png" },
    { id: "artist-2", name: "Justin Bieber", image: "/justin.png" },
  ]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLibrary() {
      setLoading(true);
      setError("");

      const jobs = [
        getLikedSongs(),
        getPlaylists(),
        getRecentlyPlayed(),
        getSavedAlbums(),
        getSavedArtists(),
      ];

      const values = await Promise.allSettled(jobs);

      const hasSuccess = values.some(
        (item) => item.status === "fulfilled"
      );

      if (values[0].status === "fulfilled") {
        const items = listFrom(values[0].value, [
          "results",
          "songs",
          "liked_songs",
          "liked",
          "data",
        ]);

        if (items.length > 0) setLiked(items);
      }

      if (values[1].status === "fulfilled") {
        const items = listFrom(values[1].value, [
          "results",
          "playlists",
          "data",
        ]);

        if (items.length > 0) setPlaylists(items);
      }

      if (values[2].status === "fulfilled") {
        const items = listFrom(values[2].value, [
          "results",
          "recently_played",
          "songs",
          "data",
        ]);

        if (items.length > 0) setRecent(items);
      }

      if (values[3].status === "fulfilled") {
        const items = listFrom(values[3].value, [
          "results",
          "albums",
          "saved_albums",
          "data",
        ]);

        if (items.length > 0) setAlbums(items);
      }

      if (values[4].status === "fulfilled") {
        const items = listFrom(values[4].value, [
          "results",
          "artists",
          "saved_artists",
          "data",
        ]);

        if (items.length > 0) setArtists(items);
      }

      if (!hasSuccess) {
        setError(
          "Unable to load library data. Showing example content."
        );
      } else if (values.some((item) => item.status === "rejected")) {
        setError(
          "Some library data could not be loaded. Other sections remain available."
        );
      }

      setLoading(false);
    }

    loadLibrary();
  }, []);

  async function handleCreatePlaylist() {
    const name = window.prompt("Enter a playlist name");

    if (!name?.trim()) return;

    setError("");

    try {
      const created = await createPlaylist(name.trim());
      const playlist = created.playlist || created.data || created;

      if (playlist && typeof playlist === "object") {
        setPlaylists((old) => [...old, playlist]);
      } else {
        setError("Playlist was created, but its details were not returned.");
      }
    } catch (err) {
      setError(err.message || "Unable to create playlist.");
    }
  }

  const sections = [
    { id: "recent", label: "Recently Played", items: recent },
    { id: "liked", label: "Liked Songs", items: liked },
    { id: "playlists", label: "Playlists", items: playlists },
    { id: "albums", label: "Saved Albums", items: albums },
    { id: "artists", label: "Saved Artists", items: artists },
  ];

  const active = sections.find((item) => item.id === section);

  function getTitle(item) {
    return (
      item.title ||
      item.name ||
      item.song_name ||
      item.album_name ||
      item.artist_name ||
      "Untitled"
    );
  }

  function getImage(item) {
    return (
      item.image_url ||
      item.cover_image ||
      item.image ||
      item.album_image ||
      item.thumbnail ||
      item.picture ||
      "/daily1.png"
    );
  }

  function getSubtitle(item) {
    const artist = item.artist;
    const artistName =
      typeof artist === "string"
        ? artist
        : artist?.name || item.artist_name;

    return artistName || item.owner?.username || item.owner || "Vibe";
  }

  return (
    <div className="min-h-screen bg-black px-5 py-6 text-white sm:px-8">
      <h1 className="text-2xl font-bold italic">Library</h1>

      <p className="mt-1 font-semibold italic text-gray-300">
        Your music, your collection
      </p>

      <h2 className="mb-4 mt-7 text-xl font-bold italic">
        Quick Access
      </h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {sections.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSection(item.id)}
            className={`rounded-xl px-3 py-3 text-sm font-bold transition ${
              section === item.id
                ? "bg-gradient-to-r from-purple-600 to-pink-500"
                : "bg-[#242424] hover:bg-[#333]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {section === "playlists" && (
        <button
          type="button"
          onClick={handleCreatePlaylist}
          className="mt-5 rounded-full bg-white px-5 py-2 font-bold text-black"
        >
          + Create playlist
        </button>
      )}

      {error && (
        <p role="alert" className="mt-5 text-sm text-yellow-400">
          {error}
        </p>
      )}

      <h2 className="mb-4 mt-8 text-xl font-bold italic">
        {active.label}
      </h2>

      {loading && (
        <p className="mb-4 text-sm text-gray-400">
          Loading your library...
        </p>
      )}

      {!loading && active.items.length === 0 && (
        <p className="text-gray-500">
          No items here yet. Your saved music will appear here.
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {active.items.map((item, index) => {
          const title = getTitle(item);
          const image = getImage(item);

          return (
            <div
              key={item.id || `${title}-${index}`}
              className="min-w-0 rounded-xl bg-[#202020] p-3"
            >
              <img
                src={image}
                alt={title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/daily1.png";
                }}
                className="aspect-square w-full rounded-lg object-cover"
              />

              <h3 className="mt-3 truncate font-bold">
                {title}
              </h3>

              <p className="mt-1 truncate text-sm text-gray-400">
                {getSubtitle(item)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}