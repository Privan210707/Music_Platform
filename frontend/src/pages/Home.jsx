import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";
import { getHome } from "../api";

function Home() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const music = [
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

  const trending = [
    {
      title: "Expresso",
      image: "/expresso.png",
    },
    {
      title: "Clouds",
      image: "/clouds.png",
    },
    {
      title: "Lover",
      image: "/lover.png",
    },
    {
      title: "Spring Days",
      image: "/spring days.png",
    },
  ];

  useEffect(() => {
    getHome()
      .then((data) => {
        setUser(data.email || "");
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/search");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <main className="min-h-screen px-5 py-6 sm:px-6 md:px-8 lg:mr-[280px] lg:px-10">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              {loading
                ? "Welcome to Vibe"
                : `Good morning, ${user || "Mayuri"}`}
            </h2>

            <p className="mt-1 font-semibold text-gray-400">
              Let the music brighten your day
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="w-full lg:w-[390px]"
          >
            <div className="flex items-center gap-3 rounded-full border border-[#444] bg-[#202020] px-5 py-3">

              <span className="text-xl text-gray-300">
                ⌕
              </span>

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

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">

            {music.map((item) => (

              <div
                key={item.title}
                className="group min-w-0 cursor-pointer"
              >

                <div className="relative w-full max-w-[150px]">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-square w-full rounded-xl object-cover"
                  />

                  <button
                    onClick={() => navigate("/explore")}
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white text-black opacity-0 transition group-hover:opacity-100"
                  >
                    ▶
                  </button>

                </div>

                <h3 className="mt-2 text-sm font-bold">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {item.subtitle}
                </p>

              </div>

            ))}

          </div>

        </section>

        <section className="mt-8 pb-8">

          <h2 className="mb-5 text-lg font-bold sm:text-xl">
            Trending Now
          </h2>

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">

            {trending.map((item) => (

              <div
                key={item.title}
                className="group min-w-0 cursor-pointer"
              >

                <div className="relative w-full max-w-[150px]">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-square w-full rounded-xl object-cover"
                  />

                  <button
                    onClick={() => navigate("/explore")}
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white text-black opacity-0 transition group-hover:opacity-100"
                  >
                    ▶
                  </button>

                </div>

                <h3 className="mt-2 text-sm font-bold">
                  {item.title}
                </h3>

              </div>

            ))}

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