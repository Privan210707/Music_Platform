
import { useEffect, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";

import {
  searchSongs,
  getRecentSearches,
  saveRecentSearch,
  deleteRecentSearch,
} from "../api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  async function loadRecentSearches() {
    try {
      const data = await getRecentSearches();

      const searches = Array.isArray(data)
        ? data
        : data.results ||
          data.recent_searches ||
          data.data ||
          [];

      setRecentSearches(searches);
    } catch (error) {
      setError(error.message || "Unable to load recent searches");
    }
  }

  async function handleSearch(searchText = query) {
    const searchQuery = searchText.trim();

    if (!searchQuery || loading) return;

    try {
      setLoading(true);
      setError("");
      setSearched(true);
      setQuery(searchQuery);

      const data = await searchSongs(searchQuery);

      const songs = Array.isArray(data)
        ? data
        : data.results ||
          data.songs ||
          data.data ||
          [];

      setResults(songs);

      try {
        await saveRecentSearch(searchQuery);
        await loadRecentSearches();
      } catch (error) {
        console.error("Could not save recent search:", error);
      }
    } catch (error) {
      setResults([]);
      setError(error.message || "Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (id === undefined || id === null) {
      setError("Cannot delete this search because its ID is missing.");
      return;
    }

    try {
      await deleteRecentSearch(id);

      setRecentSearches((previous) =>
        previous.filter((item) => item.id !== id)
      );

      setError("");
    } catch (error) {
      setError(error.message || "Could not delete recent search");
    }
  }

  function getArtist(song) {
    if (typeof song.artist === "string") {
      return song.artist;
    }

    return (
      song.artist?.name ||
      song.artist_name ||
      song.album_artist ||
      "Unknown Artist"
    );
  }

  function getImage(song) {
    return (
      song.image_url ||
      song.cover_image ||
      song.image ||
      song.album?.image_url ||
      "/music.png"
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white sm:p-6 lg:p-8">
      <h1 className="mb-5 text-2xl font-bold">
        Search
      </h1>

      <div className="relative w-full max-w-[500px]">
        <SearchIcon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search songs, artists, albums"
          className="h-12 w-full rounded-full border border-[#444] bg-[#222] pl-11 pr-24 text-white outline-none focus:border-purple-500"
        />

        <button
          onClick={() => handleSearch()}
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-purple-500 px-5 py-2 text-sm font-bold hover:bg-purple-600 disabled:opacity-60"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {error && (
        <p className="mt-5 break-words text-red-400">
          {error}
        </p>
      )}

      {loading && (
        <p className="mt-6 text-gray-400">
          Searching songs...
        </p>
      )}

      {!loading && searched && !error && results.length === 0 && (
        <p className="mt-6 text-gray-400">
          No songs found. Try another search.
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-8 w-full max-w-[600px]">
          <h2 className="mb-4 font-bold">
            Search Results
          </h2>

          {results.map((song, index) => (
            <div
              key={song.id || index}
              className="mb-2 flex items-center gap-4 rounded-xl p-3 hover:bg-[#181818]"
            >
              <img
                src={getImage(song)}
                alt={song.title || song.name || "Song"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/music.png";
                }}
                className="h-14 w-14 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0">
                <p className="truncate font-bold">
                  {song.title || song.name || song.song_name || "Unknown Song"}
                </p>

                <p className="truncate text-sm text-gray-400">
                  {getArtist(song)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 w-full max-w-[500px]">
        <h2 className="mb-5 font-bold">
          Recent Searches
        </h2>

        {recentSearches.length === 0 && (
          <p className="text-gray-500">
            No recent searches
          </p>
        )}

        {recentSearches.map((item, index) => (
          <div
            key={item.id ?? index}
            className="mb-3 flex items-center justify-between gap-3"
          >
            <button
              onClick={() => handleSearch(item.query || "")}
              className="flex min-w-0 items-center gap-4 text-left"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#222]">
                <SearchIcon
                  size={18}
                  className="text-gray-400"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate font-bold">
                  {item.query}
                </p>

                <p className="text-xs text-gray-500">
                  Recent search
                </p>
              </div>
            </button>

            <button
              onClick={() => handleDelete(item.id)}
              aria-label="Delete recent search"
              className="shrink-0 text-gray-500 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

