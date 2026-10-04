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

  useEffect(() => {
    loadRecentSearches();
  }, []);

  async function loadRecentSearches() {
    try {
      const data = await getRecentSearches();

      setRecentSearches(
        Array.isArray(data)
          ? data
          : data.results || data.recent_searches || []
      );
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleSearch() {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");

      const data = await searchSongs(query);

      const songs = Array.isArray(data)
        ? data
        : data.results || data.songs || [];

      setResults(songs);

      await saveRecentSearch(query);

      loadRecentSearches();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteRecentSearch(id);

      setRecentSearches(
        recentSearches.filter((item) => item.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-black p-8 text-white">

      <h1 className="mb-5 text-2xl font-bold">
        Search
      </h1>

      <div className="relative max-w-[500px]">

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
          className="h-12 w-full rounded-full border border-[#444] bg-[#222] pl-11 pr-24 text-white outline-none"
        />

        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-purple-500 px-5 py-2 text-sm font-bold"
        >
          {loading ? "..." : "Search"}
        </button>

      </div>

      {error && (
        <p className="mt-5 text-red-400">
          {error}
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-8 max-w-[600px]">

          <h2 className="mb-4 font-bold">
            Search Results
          </h2>

          {results.map((song, index) => (
            <div
              key={song.id || index}
              className="mb-2 flex items-center gap-4 rounded-xl p-3 hover:bg-[#181818]"
            >

              <img
                src={song.image_url || "/music.png"}
                alt={song.title}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div>
                <p className="font-bold">
                  {song.title || "Unknown Song"}
                </p>

                <p className="text-sm text-gray-400">
                  {song.artist || "Unknown Artist"}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}

      <div className="mt-10 max-w-[500px]">

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
            key={item.id || index}
            className="mb-3 flex items-center justify-between"
          >

            <button
              onClick={() => setQuery(item.query)}
              className="flex items-center gap-4"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#222]">
                <SearchIcon
                  size={18}
                  className="text-gray-400"
                />
              </div>

              <div className="text-left">
                <p className="font-bold">
                  {item.query}
                </p>

                <p className="text-xs text-gray-500">
                  Recent search
                </p>
              </div>

            </button>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-gray-500 hover:text-white"
            >
              <X size={18} />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}