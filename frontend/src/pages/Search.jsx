import { useState } from "react";

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

    <div className="min-h-screen bg-black text-white px-5 sm:px-8 md:px-8 lg:px-8 py-8 pb-28">

      {/* TOP BAR */}

      <div className="flex justify-end items-center gap-5 mb-6">

        <span className="text-xl">
          ♧
        </span>

        <div className="w-5 h-5 rounded-full bg-[#ffbd42] border-2 border-[#ff4f9a]"></div>

      </div>


     

      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Search
      </h1>


     

      <div className="w-full">

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

      </div>


     

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-7">

        <button className="h-9 rounded-full bg-[#292929] border border-[#555] text-[#d13cff] font-bold hover:bg-[#3a3a3a]">
          Top result
        </button>

        <button className="h-9 rounded-full bg-[#292929] border border-[#555] font-bold hover:bg-[#3a3a3a]">
          Songs
        </button>

        <button className="h-9 rounded-full bg-[#292929] border border-[#555] font-bold hover:bg-[#3a3a3a]">
          Artists
        </button>

        <button className="h-9 rounded-full bg-[#292929] border border-[#555] font-bold hover:bg-[#3a3a3a]">
          Albums
        </button>

        <button className="h-9 rounded-full bg-[#292929] border border-[#555] font-bold hover:bg-[#3a3a3a]">
          Playlists
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
              className="flex items-center justify-between gap-4 group"
            >

              <div className="flex items-center gap-4 min-w-0">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl flex-shrink-0"
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


     

      <div className="fixed bottom-0 left-0 md:left-[180px] right-0 h-[70px] bg-[#430606] border-t border-[#651111] z-40 px-4 sm:px-6">

        <div className="h-full flex items-center gap-3 sm:gap-5">


          <div className="flex items-center gap-3 w-[180px] sm:w-[230px] min-w-0">

            <img
              src="/gooddays.png"
              alt="Finding Her"
              className="w-10 h-10 object-cover rounded-lg"
            />

            <div className="min-w-0">

              <h3 className="font-bold text-sm truncate">
                Finding Her
              </h3>

              <p className="text-xs text-gray-300 truncate">
                Kushagra
              </p>

            </div>

          </div>


          

          <div className="flex items-center gap-5 mx-auto">

            <button className="text-white">
              |◀
            </button>

            <button className="w-8 h-8 rounded-full bg-white text-black">
              ▶
            </button>

            <button className="text-white">
              ▶|
            </button>

          </div>


         
          <div className="hidden sm:block w-[200px] md:w-[285px]">

            <div className="h-1 bg-gray-500 rounded-full">

              <div className="relative h-1 w-[70%] bg-[#c23cff] rounded-full">

                <div className="absolute right-0 -top-1 w-3 h-3 bg-[#c23cff] rounded-full"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Search;