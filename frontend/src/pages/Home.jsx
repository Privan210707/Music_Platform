
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";
import { getHome } from "../api";

const defaultMusic = [
  {
    title: "Daily Mix 1",
    subtitle: "Vibe Music",
    image: "/daily1.png",
  },
  {
    title: "Chill Vibes",
    subtitle: "Chill Music",
    image: "/chillvibes.png",
  },
  {
    title: "Daily Mix 2",
    subtitle: "Daily Mix",
    image: "/daily2.png",
  },
  {
    title: "Mood Boosters",
    subtitle: "Happy Music",
    image: "/moodbooster.png",
  },
];

const defaultTrending = [
  { title: "Expresso", image: "/expresso.png" },
  { title: "Clouds", image: "/clouds.png" },
  { title: "Lover", image: "/lover.png" },
  { title: "Spring Days", image: "/spring days.png" },
];

function getList(data, keys) {
  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  return [];
}

function formatMusic(items, defaults) {
  if (!items.length) return defaults;

  return items.map((item, index) => ({
    ...item,
    id: item.id || item.song_id || `${item.title || item.name}-${index}`,
    title:
      item.title ||
      item.name ||
      item.song_name ||
      item.album_name ||
      "Unknown song",
    subtitle:
      typeof item.artist === "string"
        ? item.artist
        : item.artist?.name ||
          item.artist_name ||
          item.subtitle ||
          "Vibe Music",
    image:
      item.image_url ||
      item.cover_image ||
      item.album_image ||
      item.thumbnail ||
      item.image ||
      defaults[index % defaults.length].image,
  }));
}

function Home() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("Mayuri");
  const [music, setMusic] = useState(defaultMusic);
  const [trending, setTrending] = useState(defaultTrending);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function loadHome() {
      setLoading(true);
      setError("");

      try {
        const data = await getHome();

        if (!active) return;

        const greeting =
          data.greeting ||
          data.username ||
          data.user?.username ||
          data.user?.name ||
          data.profile?.username ||
          data.email?.split("@")[0];

        if (greeting) {
          setUser(greeting);
        }

        const musicData = getList(data, [
          "music_for_you",
          "music",
          "recommended_songs",
          "recommendations",
          "songs",
        ]);

        const trendingData = getList(data, [
          "trending",
          "trending_now",
          "trending_songs",
          "popular_songs",
        ]);

        const recentData = getList(data, [
          "recently_played",
          "recent",
          "recent_songs",
        ]);

        if (musicData.length > 0) {
          setMusic(formatMusic(musicData, defaultMusic));
        }

        if (trendingData.length > 0) {
          setTrending(formatMusic(trendingData, defaultTrending));
        }

        if (recentData.length > 0) {
          setRecent(formatMusic(recentData, defaultMusic));
        }
      } catch (err) {
        if (active) {
          setError(
            err.message || "Could not load home data from the backend."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadHome();

    return () => {
      active = false;
    };
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/search");
    }
  }

  function openMusic(item) {
    if (item.artist_name || item.artist?.name) {
      navigate(
        `/artist/${encodeURIComponent(
          item.artist_name || item.artist.name
        )}`
      );
    } else {
      navigate("/explore");
    }
  }

  function renderCards(items) {
    return items.map((item) => (
      <div
        key={item.id || item.title}
        className="group min-w-0 cursor-pointer"
        onClick={() => openMusic(item)}
      >
        <div className="relative w-full max-w-[150px]">
          <img
            src={item.image}
            alt={item.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/daily1.png";
            }}
            className="aspect-square w-full rounded-xl object-cover transition group-hover:brightness-75"
          />

          <button
            type="button"
            aria-label={`Open ${item.title}`}
            onClick={(e) => {
              e.stopPropagation();
              openMusic(item);
            }}
            className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white text-black opacity-0 transition group-hover:opacity-100"
          >
            ▶
          </button>
        </div>

        <h3 className="mt-2 truncate text-sm font-bold">
          {item.title}
        </h3>

        {item.subtitle && (
          <p className="truncate text-sm text-gray-400">
            {item.subtitle}
          </p>
        )}
      </div>
    ));
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="min-h-screen px-5 py-6 sm:px-6 md:px-8 lg:mr-[280px] lg:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              {loading
                ? "Welcome to Vibe"
                : `Good morning, ${user}`}
            </h2>

            <p className="mt-1 font-semibold text-gray-400">
              Let the music brighten your day
            </p>
          </div>

          <form onSubmit={handleSearch} className="w-full lg:w-[390px]">
            <div className="flex items-center gap-3 rounded-full border border-[#444] bg-[#202020] px-5 py-3">
              <span className="text-xl text-gray-300">⌕</span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search songs, artists, albums"
                className="w-full bg-transparent text-white outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="text-sm text-purple-400"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-yellow-400">
            {error}
          </p>
        )}

        <section className="mt-7">
          <div className="relative h-[170px] overflow-hidden rounded-2xl sm:h-[185px] md:h-[200px]">
            <img
              src="/banner.png"
              alt="Chill Vibes"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 p-6 sm:p-7">
              <h1 className="text-xl font-bold sm:text-2xl">
                Chill Vibes
              </h1>

              <p className="mt-2 font-semibold">
                Chill . Happy . Dark
              </p>

              <button
                type="button"
                onClick={() => navigate("/explore")}
                className="mt-4 h-10 w-10 rounded-full bg-white text-black transition hover:scale-105"
              >
                ▶
              </button>
            </div>
          </div>
        </section>

        <section className="mt-7">
          <h2 className="mb-5 text-lg font-bold sm:text-xl">
            Music For You
          </h2>

          {loading && (
            <p className="mb-3 text-sm text-gray-400">
              Loading your music...
            </p>
          )}

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {renderCards(music)}
          </div>
        </section>

        {recent.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-5 text-lg font-bold sm:text-xl">
              Recently Played
            </h2>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {renderCards(recent)}
            </div>
          </section>
        )}

        <section className="mt-8 pb-8">
          <h2 className="mb-5 text-lg font-bold sm:text-xl">
            Trending Now
          </h2>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {renderCards(trending)}
          </div>
        </section>
      </main>

      <div className="hidden lg:block">
        <MusicPlayer />
      </div>
    </div>
  );
}

export default Home;