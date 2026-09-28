function MusicPlayer() {

  return (

    <aside className="hidden lg:block w-[240px] bg-[#10151e] p-5">

      <h2 className="text-lg font-bold mb-5">
        Now Playing
      </h2>


      <img
        src="/midnight.png"
        alt="Midnight"
        className="w-full h-[190px] object-cover rounded-xl"
      />


      <div className="mt-4">

        <h3 className="text-lg font-bold">
          Midnight
        </h3>

        <p className="text-sm text-gray-400">
          Vibe Music
        </p>

      </div>


      <div className="mt-6">

        <div className="h-1 bg-gray-700 rounded-full">

          <div className="h-1 w-[35%] bg-purple-500 rounded-full"></div>

        </div>


        <div className="flex justify-between text-xs text-gray-500 mt-2">

          <span>1:24</span>

          <span>3:45</span>

        </div>

      </div>


      <div className="flex justify-center items-center gap-5 mt-6">

        <button>
          ↶
        </button>

        <button>
          ◀
        </button>

        <button className="w-10 h-10 bg-white text-black rounded-full">
          ▶
        </button>

        <button>
          ▶
        </button>

        <button>
          ↷
        </button>

      </div>


      <div className="mt-8">

        <h3 className="font-bold mb-4">
          Recently Played
        </h3>


        <div className="space-y-4">

          <div className="flex items-center gap-3">

            <img
              src="/gooddays.png"
              className="w-10 h-10 rounded"
            />

            <div>
              <p className="text-sm font-bold">
                Good Days
              </p>

              <p className="text-xs text-gray-500">
                One 4
              </p>
            </div>

          </div>


          <div className="flex items-center gap-3">

            <img
              src="/midnight.png"
              className="w-10 h-10 rounded"
            />

            <div>
              <p className="text-sm font-bold">
                Midnights
              </p>

              <p className="text-xs text-gray-500">
                Taylor Swift
              </p>
            </div>

          </div>


          <div className="flex items-center gap-3">

            <img
              src="/flowers.png"
              className="w-10 h-10 rounded"
            />

            <div>
              <p className="text-sm font-bold">
                Flowers
              </p>

              <p className="text-xs text-gray-500">
                Olivia
              </p>
            </div>

          </div>


          <div className="flex items-center gap-3">

            <img
              src="/As it.png"
              className="w-10 h-10 rounded"
            />

            <div>
              <p className="text-sm font-bold">
                As It Was
              </p>

              <p className="text-xs text-gray-500">
                Harry Styles
              </p>
            </div>

          </div>

        </div>

      </div>

    </aside>

  );
}

export default MusicPlayer;