function Album() {
  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">

      <div className="flex items-center gap-8">

        <img
          src="/badland.png"
          alt="Badlands"
          className="h-44 w-44 rounded-2xl object-cover"
        />

        <div>

          <h1 className="text-4xl font-bold">
            Badlands
          </h1>

          <p className="mt-2 text-lg text-gray-300">
            Halsey · 2018
          </p>

          <div className="mt-8 flex gap-16">

            <div>
              <h2 className="text-3xl font-bold">
                12
              </h2>

              <p className="text-gray-400">
                Playlists
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                243
              </h2>

              <p className="text-gray-400">
                Followers
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                158
              </h2>

              <p className="text-gray-400">
                Following
              </p>
            </div>

          </div>

        </div>

      </div>

      <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-bold">
        Edit Profile
      </button>

      <h2 className="mt-10 text-2xl font-bold">
        Playlists
      </h2>

      <div className="mt-8 flex gap-16">

        <div>
          <img
            src="/my playlists.png"
            alt="My Playlists"
            className="h-52 w-60 rounded-2xl object-cover"
          />

          <p className="mt-3 text-center font-bold">
            My Playlists
          </p>
        </div>

        <div>
          <img
            src="/favorite.png"
            alt="Favorite"
            className="h-52 w-60 rounded-2xl object-cover"
          />

          <p className="mt-3 text-center font-bold">
            Favorite
          </p>
        </div>

      </div>

      <button className="fixed bottom-5 right-5 h-20 w-20 rounded-full bg-[#202020] text-3xl">
        <img src="/Ai chat.png" alt="Chat" />
      </button>

    </div>
  );
}

export default Album;