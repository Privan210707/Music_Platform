function Library() {

  const recentlyAdded = [
    {
      title: "After Hours",
      artist: "The weekend",
      image: "/after hours.png"
    },
    {
      title: "Sour Candy",
      artist: "Olivia Rodrigo",
      image: "/sour.png"
    },
    {
      title: "Ocean eyes",
      artist: "Billie Eilish",
      image: "/ocean.png"
    },
    {
      title: "Stay",
      artist: "The Kid Laroi",
      image: "/stay.png"
    }
  ];

  const recentlyPlayed = [
    {
      number: "1",
      title: "Cruel Summer",
      artist: "Taylor Swift",
      album: "Paper Rings",
      image: "/cruel summer.png"
    },
    {
      number: "2",
      title: "Die For You",
      artist: "The weekend",
      album: "Good Days",
      image: "/die for you.png"
    },
    {
      number: "3",
      title: "Justice",
      artist: "Justin Bieber",
      album: "Stay",
      image: "/justice.png"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      <main className="px-7 py-6">

        <h1 className="text-2xl font-bold italic">
          Library
        </h1>

        <p className="text-gray-300 font-semibold italic mt-1">
          Your music, your collection
        </p>


        <h2 className="text-xl font-bold italic mt-5 mb-3">
          Quick Access
        </h2>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          <button className="bg-gradient-to-r from-purple-600 to-pink-500 h-[40px] rounded-xl font-bold flex items-center justify-center gap-3">
            <span className="bg-white text-purple-600 rounded-md px-1">
              ♥
            </span>
            Liked songs
          </button>

          <button className="bg-gradient-to-r from-purple-600 to-pink-500 h-[40px] rounded-xl font-bold flex items-center justify-center gap-3">
            <span className="bg-white text-purple-600 rounded-md px-1">
              ♫
            </span>
            Playlists
          </button>

          <button className="bg-gradient-to-r from-purple-600 to-pink-500 h-[40px] rounded-xl font-bold flex items-center justify-center gap-3">
            <span className="bg-white text-purple-600 rounded-md px-1">
              ●
            </span>
            Albums
          </button>

          <button className="bg-gradient-to-r from-purple-600 to-pink-500 h-[40px] rounded-xl font-bold flex items-center justify-center gap-3">
            <span className="bg-white text-purple-600 rounded-md px-1">
              ♟
            </span>
            Artists
          </button>

        </div>


        <h2 className="text-xl font-bold italic mt-5 mb-4">
          Recently added
        </h2>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

         {recentlyAdded.map((item) => (

        <div
         key={item.title}
          className="bg-[#202020] rounded-xl overflow-hidden"
       >

         <img
        src={item.image}
        alt={item.title}
        className="w-full h-[130px] sm:h-[150px] md:h-[170px] object-cover"
        />

        <div className="p-4">

          <h3 className="font-bold italic text-base md:text-lg">
            {item.title}
           </h3>

          <p className="text-gray-300 text-sm font-semibold">
            {item.artist}
           </p>

           </div>

           </div>

            ))}

           </div>



            

        
       


        <h2 className="text-xl font-bold italic mt-5 mb-3">
          Recently Played
        </h2>


        <div className="w-full">

          <div className="grid grid-cols-[60px_2fr_1.5fr_1.5fr] items-center text-gray-300 font-bold italic mb-3">

            <p>#</p>

            <p>Title</p>

            <p>Artist</p>

            <p>Album</p>

          </div>


          {recentlyPlayed.map((song) => (

            <div
              key={song.number}
              className="grid grid-cols-[60px_2fr_1.5fr_1.5fr] items-center mb-3"
            >

              <p className="font-bold">
                {song.number}
              </p>


              <div className="flex items-center gap-3">

                <img
                  src={song.image}
                  alt={song.title}
                  className="w-[45px] h-[45px] object-cover rounded"
                />

                <p className="font-bold italic">
                  {song.title}
                </p>

              </div>


              <p className="font-bold italic">
                {song.artist}
              </p>


              <p className="font-bold italic">
                {song.album}
              </p>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default Library;