import {
  Shuffle,
  SkipBack,
  Play,
  SkipForward,
  Repeat,
} from "lucide-react";

function MusicPlayer() {
  const recentlyPlayed = [
    {
      title: "Good Days",
      artist: "One 4",
      image: "/gooddays.png",
    },
    {
      title: "Midnights",
      artist: "Taylor Swift",
      image: "/midnight.png",
    },
    {
      title: "Flowers",
      artist: "Olivia",
      image: "/flowers.png",
    },
    {
      title: "As It Was",
      artist: "Harry Styles",
      image: "/As it.png",
    },
  ];

  return (
    <aside className="fixed right-0 top-0 z-40 hidden h-screen w-[245px] border-l border-[#303030] bg-[#151515] px-4 py-4 lg:block">

  
      <div className="rounded-2xl bg-[#202020] p-2">
        <img
          src="/daily1.png"
          alt="Now Playing"
          className="h-[210px] w-full rounded-xl object-cover"
        />
      </div>

      <div className="mt-3">
        <div className="relative h-[3px] w-full rounded-full bg-[#555]">
          <div className="absolute left-0 top-0 h-[3px] w-[55%] rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />

          <div className="absolute left-[55%] top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400" />
        </div>
      </div>

     
      <div className="mt-3 flex items-center justify-between px-1 text-gray-300">
        <button className="transition hover:text-white">
          <Shuffle size={17} />
        </button>

        <button className="transition hover:text-white">
          <SkipBack size={18} fill="currentColor" />
        </button>

        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:scale-105">
          <Play size={15} fill="currentColor" />
        </button>

        <button className="transition hover:text-white">
          <SkipForward size={18} fill="currentColor" />
        </button>

        <button className="transition hover:text-white">
          <Repeat size={17} />
        </button>
      </div>

     
      <div className="mt-6">
        <h2 className="mb-4 text-sm font-bold text-white">
          Recently Played
        </h2>

        <div className="space-y-4">
          {recentlyPlayed.map((song) => (
            <div
              key={song.title}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-1 transition hover:bg-[#252525]"
            >
              <img
                src={song.image}
                alt={song.title}
                className="h-11 w-11 rounded-lg object-cover"
              />

              <div className="min-w-0">
                <h3 className="truncate text-xs font-bold text-white">
                  {song.title}
                </h3>

                <p className="mt-1 truncate text-[11px] text-gray-400">
                  {song.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default MusicPlayer;