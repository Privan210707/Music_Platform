import { useState } from "react";

function Home() {

  const [search, setSearch] = useState("");

  const music = [
    {
      title: "Daily Mix 1",
      subtitle: "Vibe Music",
      image: "/daily1.png"
    },
    {
      title: "Chill Vibes",
      subtitle: "Chill Music",
      image: "/chillvibes.png"
    },
    {
      title: "Daily Mix 2",
      subtitle: "Daily Mix",
      image: "/daily2.png"
    },
    {
      title: "Mood Boosters",
      subtitle: "Happy Music",
      image: "/moodbooster.png"
    }
  ];

  const trending = [
    {
      title: "Expresso",
      image: "/expresso.png"
    },
    {
      title: "Clouds",
      image: "/clouds.png"
    },
    {
      title: "Lover",
      image: "/lover.png"
    },
    {
      title: "Spring Days",
      image: "/spring days.png"
    }
  ];

  const recent = [
    {
      title: "Good Days",
      artist: "One 4",
      image: "/gooddays.png"
    },
    {
      title: "Midnights",
      artist: "Taylor Swift",
      image: "/midnight.png"
    },
    {
      title: "Flowers",
      artist: "Olivia",
      image: "/flowers.png"
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
      image: "/As it.png"
    }
  ];

  return (

    <div className="min-h-screen bg-black text-white overflow-x-hidden">

     

      <main className="px-5 sm:px-6 md:px-8 lg:px-10 py-6 md:py-7 lg:pr-[310px]">


        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>

            <h2 className="text-xl sm:text-2xl font-bold">
              Good morning, Mayuri
            </h2>

            <p className="mt-1 text-gray-400 font-semibold">
              Let the music brighten your day
            </p>

          </div>


          

          <div className="w-full lg:w-[390px]">

            <div className="flex items-center gap-3 bg-[#202020] border border-[#444] rounded-full px-5 py-3">

              <span className="text-gray-300">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search songs, artists, albums"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />

            </div>

          </div>

        </div>


       

        <section className="mt-7">

          <div className="relative h-[170px] sm:h-[185px] md:h-[200px] overflow-hidden rounded-2xl">

            <img
              src="/banner.png"
              alt="Chill Vibes"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10 p-6 sm:p-7">

              <h1 className="text-xl sm:text-2xl font-bold">
                Chill Vibes
              </h1>

              <p className="mt-2 font-semibold">
                Chill . Happy . Dark
              </p>

              <button className="mt-4 w-10 h-10 rounded-full bg-white text-black">
                ▶
              </button>

            </div>

          </div>

        </section>


       

        <section className="mt-7">

          <h2 className="text-lg sm:text-xl font-bold mb-5">
            Music For You
          </h2>


          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">

            {music.map((item, index) => (

              <div
                key={index}
                className="group cursor-pointer"
              >

                <div className="relative w-[135px] sm:w-[145px] md:w-[150px]">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[135px] h-[135px] sm:w-[145px] sm:h-[145px] md:w-[150px] md:h-[150px] object-cover rounded-xl"
                  />

                  <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition">
                    ▶
                  </button>

                </div>


                <h3 className="mt-2 font-bold text-sm">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {item.subtitle}
                </p>

              </div>

            ))}

          </div>

        </section>


     

        <section className="mt-8">

          <h2 className="text-lg sm:text-xl font-bold mb-5">
            Trending Now
          </h2>


          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">

            {trending.map((item, index) => (

              <div
                key={index}
                className="group cursor-pointer"
              >

                <div className="relative w-[135px] sm:w-[145px] md:w-[150px]">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[135px] h-[135px] sm:w-[145px] sm:h-[145px] md:w-[150px] md:h-[150px] object-cover rounded-xl"
                  />

                  <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition">
                    ▶
                  </button>

                </div>


                <h3 className="mt-2 font-bold text-sm">
                  {item.title}
                </h3>

              </div>

            ))}

          </div>

        </section>

      </main>



      <aside className="hidden lg:block fixed right-0 top-0 w-[290px] h-screen bg-[#171717] border-l border-[#333] p-5 overflow-y-auto">

        <h2 className="text-lg font-bold mb-5">
          Now Playing
        </h2>


        <img
          src="/midnight.png"
          alt="Now Playing"
          className="w-full h-[150px] object-cover rounded-xl"
        />


        <h3 className="mt-5 text-lg font-bold">
          Midnight
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          Vibe Music
        </p>


      

        <div className="mt-6">

          <div className="h-1 bg-gray-600 rounded-full">

            <div className="h-1 w-[55%] bg-[#c23cff] rounded-full">
            </div>

          </div>


          <div className="flex justify-between text-xs text-gray-400 mt-2">

            <span>
              1:24
            </span>

            <span>
              3:45
            </span>

          </div>

        </div>


       

        <div className="flex items-center justify-center gap-5 mt-7">

          <button>
            ↶
          </button>

          <button>
            ◀
          </button>

          <button className="w-12 h-12 rounded-full bg-white text-black">
            ▶
          </button>

          <button>
            ▶
          </button>

          <button>
            ↷
          </button>

        </div>



        <h2 className="text-lg font-bold mt-9 mb-5">
          Recently Played
        </h2>


        <div className="space-y-5">

          {recent.map((item, index) => (

            <div
              key={index}
              className="flex items-center gap-4"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 object-cover rounded-lg"
              />


              <div className="min-w-0">

                <h3 className="font-bold truncate">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm truncate">
                  {item.artist}
                </p>

              </div>

            </div>

          ))}

        </div>

      </aside>

    </div>
  );
}

export default Home;