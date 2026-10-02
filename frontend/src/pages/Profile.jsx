function Profile() {

  const recentlyPlayed = [
    {
      name: "Khat",
      image: "/khat.png"
    },
    {
      name: "Chahu Main",
      image: "/chahu main.png"
    },
    {
      name: "Gul",
      image: "/gul.png"
    },
    {
      name: "Jhol",
      image: "/jhol.png"
    },
    {
      name: "Alag Aasmaan",
      image: "/alag aasman.png"
    }
  ];

  const playlists = [
    {
      name: "Normal",
      image: "/As it.png"
    },
    {
      name: "Die with Smile",
      image: "/die with.png"
    },
    {
      name: "Havana",
      image: "/havana.png"
    },
    {
      name: "Slim Shaddy",
      image: "/him.png"
    },
    {
      name: "Starboy",
      image: "/justin.png"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6">

        <div className="flex justify-between items-center">

          <div className="w-full  h-[45px] bg-[#202020] border border-[#444] rounded-2xl flex items-center px-4 gap-3">

            <span className="text-gray-300">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search songs, artists, albums"
              className="bg-transparent outline-none w-full text-white text-sm font-semibold placeholder:text-white"
            />

        

         
          </div>

        </div>


        <div className="mt-6 w-full  bg-[#202020] border border-[#444] rounded-[30px] p-5 sm:p-6 md:px-10 flex flex-col sm:flex-row items-center sm:items-center gap-5 md:gap-8">

          <img
            src="/profile.png"
            alt="Mayuri"
            className="w-[120px] h-[120px] sm:w-[135px] sm:h-[135px] rounded-full object-cover border-2 border-black flex-shrink-0"
          />

          <div className="text-center sm:text-left">

            <h1 className="text-2xl sm:text-3xl font-bold italic">
              Mayuri
            </h1>

            <p className="text-gray-300 font-semibold">
              @mayuri_music
            </p>

            <p className="text-gray-300 font-semibold mt-1">
              late-night listener · K-pop & indie
            </p>

            <div className="flex justify-center sm:justify-start gap-6 mt-1">

              <p className="font-bold text-sm">
                128 Followers
              </p>

              <p className="font-bold text-sm">
                84 Following
              </p>

            </div>

            <button className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-2 rounded-xl font-bold">
              Edit Profile
            </button>

          </div>

        </div>


        <section className="mt-6">

          <h2 className="text-xl sm:text-2xl font-bold italic mb-5">
            Recently played
          </h2>


          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 lg:gap-8">

            {recentlyPlayed.map((song) => (

              <div
                key={song.name}
                className="w-full max-w-[150px]"
              >

                <img
                  src={song.image}
                  alt={song.name}
                  className="w-full aspect-square object-cover rounded-2xl"
                />

                <p className="text-center mt-2 text-sm sm:text-base font-bold italic">
                  {song.name}
                </p>

              </div>

            ))}

          </div>

        </section>


        <section className="mt-6">

          <h2 className="text-xl sm:text-2xl font-bold italic mb-5">
            Your Playlists
          </h2>


          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 lg:gap-8">

            {playlists.map((playlist) => (

              <div
                key={playlist.name}
                className="w-full max-w-[150px]"
              >

                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-2xl"
                />

                <p className="text-center mt-2 text-sm sm:text-base font-bold italic">
                  {playlist.name}
                </p>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;