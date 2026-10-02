import { Link } from "react-router-dom";

function Explore() {

  const genres = [
    {
      name: "Pop",
      image: "/pop.png",
      bg: "bg-[#2db1bd]"
    },
    {
      name: "Hip-Hop",
      image: "/hip-hop.png",
      bg: "bg-[#ed873c]"
    },
    {
      name: "Mood",
      image: "/mood.png",
      bg: "bg-[#ff3942]"
    },
    {
      name: "Soul",
      image: "/soul.png",
      bg: "bg-[#dc4098]"
    },
    {
      name: "K-pop",
      image: "/k-pop.png",
      bg: "bg-[#ae3ce8]"
    },
    {
      name: "Rain & Monsoon",
      image: "/rain.png",
      bg: "bg-[#2673c9]"
    },
    {
      name: "Classical",
      image: "/classical.png",
      bg: "bg-[#f5b83f]"
    },
    {
      name: "Summer",
      image: "/summer.png",
      bg: "bg-[#8bd954]"
    }
  ];


  const artists = [
    {
      name: "K.K",
      image: "/kk.png"
    },
    {
      name: "Arijit Singh",
      image: "/arijit.png"
    },
    {
      name: "Rose",
      image: "/rose.png"
    },
    {
      name: "Jungkook",
      image: "/jungkook.png"
    },
    {
      name: "Halsey",
      image: "/halsey.png"
    },
    {
      name: "Justin Bieber",
      image: "/justin.png"
    }
  ];


  return (

    <div className="min-h-screen bg-black text-white">

      <main className="px-5 py-6 sm:px-8 lg:px-10">

     
        <h1 className="mb-7 text-3xl font-bold sm:text-4xl">
          Explore
        </h1>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {genres.map((genre) => (

            <div
              key={genre.name}
              className={`${genre.bg} relative h-[120px] overflow-hidden rounded-xl p-5 transition hover:scale-[1.02]`}
            >

              <h2 className="text-lg font-bold">
                {genre.name}
              </h2>

              <img
                src={genre.image}
                alt={genre.name}
                className="absolute bottom-[-15px] right-[-5px] h-[115px] w-[125px] rotate-[15deg] object-cover shadow-lg"
              />

            </div>

          ))}

        </div>


        <section className="mt-9 pb-10">

          <h2 className="mb-7 text-2xl font-bold sm:text-3xl">
            Your Favorite Artists
          </h2>


          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

            {artists.map((artist) => (

              <div
                key={artist.name}
                className="flex flex-col items-center"
              >

             
                <Link to={`/artist/${artist.name.toLowerCase().replace(" ", "-")}`}>

                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="h-32 w-32 rounded-full object-cover transition duration-300 hover:scale-105 sm:h-36 sm:w-36 lg:h-40 lg:w-40"
                  />

                </Link>


                
                <p className="mt-3 text-center text-sm font-bold sm:text-base">
                  {artist.name}
                </p>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>

  );
}

export default Explore;