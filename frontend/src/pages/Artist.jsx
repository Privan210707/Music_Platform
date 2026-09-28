function Artist() {

  const songs = [

    {
      image: "/gooddays.png",
      title: "The Great Impersonator",
      artist: "Halsey"
    },

    {
      image: "/lover.png",
      title: "Manic",
      artist: "Halsey"
    },

    {
      image: "/daily1.png",
      title: "Badlands",
      artist: "Halsey"
    },

    {
      image: "/flowers.png",
      title: "Hopeless Fountain Kingdom",
      artist: "Halsey"
    }

  ];


  return (

    <div className="p-5 md:p-8">

      <div className="max-w-[900px]">

        <div className="relative h-[240px] rounded-2xl overflow-hidden">

          <img
            src="/banner.png"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>


          <div className="absolute bottom-6 left-6 flex items-center gap-5">

            <img
              src="/As it.png"
              className="w-20 h-20 rounded-full object-cover"
            />


            <div>

              <h1 className="text-3xl font-bold">
                Halsey
              </h1>

              <p className="text-gray-300 mt-1">
                12.4M monthly listeners
              </p>


              <button className="mt-3 border border-white rounded-full px-5 py-2 text-sm hover:bg-white hover:text-black transition">
                Follow
              </button>

            </div>

          </div>

        </div>


        <h2 className="text-xl font-bold mt-8 mb-5">
          Popular
        </h2>


        <div className="space-y-3">

          {songs.map((song, index) => (

            <div
              key={song.title}
              className="flex items-center gap-5 p-3 rounded-xl hover:bg-[#202630] transition"
            >

              <span className="w-5 text-gray-500">
                {index + 1}
              </span>


              <img
                src={song.image}
                className="w-12 h-12 rounded-lg object-cover"
              />


              <div>

                <p className="font-bold">
                  {song.title}
                </p>

                <p className="text-sm text-gray-400">
                  {song.artist}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Artist;