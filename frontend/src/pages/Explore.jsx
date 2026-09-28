function Explore() {

  const genres = [
    {
      title: "Pop",
      image: "/chillvibes.png",
      bg: "bg-[#2bb3c0]"
    },
    {
      title: "Hip-Hop",
      image: "/hip-hop.png",
      bg: "bg-[#e88443]"
    },
    {
      title: "Mood",
      image: "/mood.png",
      bg: "bg-[#ff3838]"
    },
    {
      title: "Soul",
      image: "/soul.png",
      bg: "bg-[#df46a5]"
    },
    {
      title: "K-pop",
      image: "/k-pop.png",
      bg: "bg-[#aa48f2]"
    },
    {
      title: "Rain & Monsoon",
      image: "/rain.png",
      bg: "bg-[#1970d0]"
    },
    {
      title: "Classical",
      image: "/classical.png",
      bg: "bg-[#f2b544]"
    },
    {
      title: "Summer",
      image: "/clouds.png",
      bg: "bg-[#8edb61]"
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
      name: "Rose’",
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
      image: "/justein.png"
    }
  ];


  return (

    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">

      

      <div className="flex justify-end items-center gap-4 mb-5 md:mb-7">

        <span className="text-lg md:text-xl">
          ♧
        </span>

        <div className="w-5 h-5 rounded-full bg-[#ffbd42] border-2 border-[#ff4f9a]">
        </div>

      </div>


      

      <h1 className="text-2xl sm:text-3xl font-bold">
        Explore
      </h1>


      

      <section className="mt-7 md:mt-8">

        <h2 className="text-lg sm:text-xl font-bold mb-4 md:mb-5">
          Genres
        </h2>


        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">

          {genres.map((genre) => (

            <div
              key={genre.title}
              className={`relative h-[115px] sm:h-[125px] md:h-[130px] rounded-xl overflow-hidden ${genre.bg}`}
            >

              <h3 className="absolute top-3 left-4 sm:left-5 z-10 text-base sm:text-lg font-bold">
                {genre.title}
              </h3>


              <img
                src={genre.image}
                alt={genre.title}
                className="absolute w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] md:w-[105px] md:h-[105px] object-cover right-[-4px] bottom-[-8px] rotate-[-35deg]"
              />

            </div>

          ))}

        </div>

      </section>



      <section className="mt-8 md:mt-10">

        <h2 className="text-lg sm:text-xl font-bold mb-5 md:mb-6">
          Your Favorite Artists
        </h2>


        <div className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-7">

          {artists.map((artist) => (

            <div
              key={artist.name}
              className="text-center cursor-pointer"
            >

              <img
                src={artist.image}
                alt={artist.name}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-[100px] md:h-[100px] lg:w-[105px] lg:h-[105px] mx-auto object-cover rounded-full"
              />


              <h3 className="mt-2 md:mt-3 text-sm sm:text-base font-bold truncate">
                {artist.name}
              </h3>

            </div>

          ))}

        </div>

      </section>

    </div>

  );
}

export default Explore;