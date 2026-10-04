import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Artist() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("popular");

  const songs = [
    {
      name: "Closer",
      image: "/closer.png",
      plays: "36,288,39",
    },
    {
      name: "Without Me",
      image: "/without.png",
      plays: "90,398,65",
    },
    {
      name: "Him & I",
      image: "/him.png",
      plays: "1,43,759,08",
    },
    {
      name: "Boy With Luv",
      image: "/boy with.png",
      plays: "1,36,642,43",
    },
  ];

  const albums = [
    {
      id: "great-impersonator",
      name: "The Great Impersonator",
      year: "2025",
      image: "/the great.png",
    },
    {
      id: "manic",
      name: "Manic",
      year: "2020",
      image: "/manic.png",
    },
    {
      id: "badlands",
      name: "Badlands",
      year: "2018",
      image: "/badland.png",
    },
    {
      id: "hopeless-fountain-kingdom",
      name: "Hopeless fountain kingdom",
      year: "2017",
      image: "/hopeless.png",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      <div
        className="h-[180px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/halsey banner.png')",
        }}
      ></div>

      <div className="px-8">

        <div className="flex items-center gap-5 -mt-16">

          <img
            src="/halsey.png"
            alt="Halsey"
            className="w-28 h-28 rounded-full object-cover border-2 border-pink-500"
          />

          <div className="pt-16">

            <h1 className="text-3xl font-bold">
              Halsey
            </h1>

            <p className="text-gray-400">
              @halsey
            </p>

            <button className="mt-2 px-7 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
              Follow
            </button>

          </div>

        </div>

        <div className="flex gap-10 mt-7 mb-6">

          <button
            onClick={() => setTab("popular")}
            className={`font-bold text-lg ${
              tab === "popular"
                ? "text-pink-500"
                : "text-white"
            }`}
          >
            Popular
          </button>

          <button
            onClick={() => setTab("albums")}
            className={`font-bold text-lg ${
              tab === "albums"
                ? "text-pink-500"
                : "text-white"
            }`}
          >
            Albums
          </button>

        </div>

        {tab === "popular" && (
          <div className="pb-10">

            {songs.map((song, index) => (
              <div
                key={index}
                className="flex items-center gap-5 mb-5"
              >

                <img
                  src={song.image}
                  alt={song.name}
                  className="w-[72px] h-[62px] rounded-xl object-cover"
                />

                <div>

                  <h3 className="font-bold">
                    {song.name}
                  </h3>

                  <p className="text-gray-400 font-semibold text-sm">
                    {song.plays}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

        {tab === "albums" && (
          <div className="pb-10">

            {albums.map((album) => (
              <div
                key={album.id}
                onClick={() => navigate(`/album/${album.id}`)}
                className="flex items-center gap-5 mb-5 cursor-pointer hover:bg-[#171717] p-2 rounded-xl transition"
              >

                <img
                  src={album.image}
                  alt={album.name}
                  className="w-[72px] h-[62px] rounded-xl object-cover"
                />

                <div>

                  <h3 className="font-bold">
                    {album.name}
                  </h3>

                  <p className="text-gray-400 font-semibold text-sm">
                    Album · {album.year}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Artist;