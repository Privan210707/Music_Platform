import { useState } from "react";
import MusicPlayer from "../components/MusicPlayer";

function Search() {

  const [search, setSearch] = useState("");

  const [recentSearches, setRecentSearches] = useState([
    {
      name: "Shawn Mendes",
      song: "Illuminate",
      image: "/gooddays.png"
    },
    {
      name: "Taylor Swift",
      song: "Lover",
      image: "/lover.png"
    },
    {
      name: "Arijit Singh",
      song: "Main na Raha Mera",
      image: "/moodbooster.png"
    },
    {
      name: "Rahul Nair",
      song: "Sar Aankhon pe mere",
      image: "/midnight.png"
    },
    {
      name: "Young C.O.A.T",
      song: "Young C.O.A.T",
      image: "/gooddays.png"
    }
  ]);

  function removeSearch(index) {

    const newList = recentSearches.filter(
      (_, i) => i !== index
    );

    setRecentSearches(newList);
  }

  return (

    <div className="min-h-screen bg-black text-white">

      <main className=" mr-[240px] min-h-screen px-6 sm:px-8 py-8">

        <div className="flex justify-end items-center gap-5 mb-6">

          <span className="text-xl">
            ♧
          </span>

          <div className="w-5 h-5 rounded-full bg-[#ffbd42] border-2 border-[#ff4f9a]"></div>

        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Search
        </h1>

        <div className="flex items-center gap-3 bg-[#202020] border border-[#555] rounded-full px-5 h-12">

          <span className="text-lg text-gray-300">
            ⌕
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search songs, artists, albums"
            className="w-full bg-transparent outline-none text-white placeholder-gray-400 font-semibold text-sm"
          />

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-7">

          <button className="h-9 rounded-full bg-[#292929] border border-[#555] text-[#d13cff] font-bold">
            Top result
          </button>

          <button className="h-9 rounded-full bg-[#292929] border border-[#555] font-bold">
            Songs
          </button>

          <button className="h-9 rounded-full bg-[#292929] border border-[#555] font-bold">
            Artists
          </button>

          <button className="h-9 rounded-full bg-[#292929] border border-[#555] font-bold">
            Albums
          </button>

        </div>

        <section className="mt-7">

          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Recent Searches
          </h2>

          <div className="space-y-4">

            {recentSearches.map((item, index) => (

              <div
                key={index}
                className="flex items-center justify-between gap-4"
              >

                <div className="flex items-center gap-4 min-w-0">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl"
                  />

                  <div className="min-w-0">

                    <h3 className="font-bold text-base sm:text-lg truncate">
                      {item.name}
                    </h3>

                    <p className="text-gray-400 text-sm sm:text-base font-semibold truncate">
                      {item.song}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => removeSearch(index)}
                  className="text-gray-300 hover:text-white text-2xl px-2"
                >
                  ×
                </button>

              </div>

            ))}

          </div>

        </section>

        {search && (

          <div className="mt-8">

            <h2 className="text-xl font-bold">
              Results for "{search}"
            </h2>

          </div>

        )}

      </main>

      <MusicPlayer />

    </div>

  );
}

export default Search;