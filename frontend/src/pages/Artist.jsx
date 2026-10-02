import { useState } from "react";
import { Link } from "react-router-dom";

function Artist() {
  const [activeTab, setActiveTab] = useState("Popular");

  const popular = [
    {
      title: "Closer",
      number: "36,288,39",
      image: "/closer.png"
    },
    {
      title: "Without Me",
      number: "90,398,65",
      image: "/without.png"
    },
    {
      title: "Him & I",
      number: "1,43,759,08",
      image: "/him.png"
    },
    {
      title: "Boy With Luv",
      number: "1,36,642,43",
      image: "/boy with.png"
    }
  ];

  const albums = [
    {
      title: "The Great Impersonator",
      year: "2025",
      image: "/the great.png"
    },
    {
      title: "Manic",
      year: "2020",
      image: "/manic.png"
    },
    {
      title: "Badlands",
      year: "2018",
      image: "/badland.png"
    },
    {
      title: "Hopeless Fountain Kingdom",
      year: "2017",
      image: "/hopeless.png"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">

      <div className="relative h-[230px]">

        <img
          src="/halsey-banner.png"
          alt="Halsey"
          className="absolute h-full w-full object-cover"
        />

        <div className="absolute bottom-5 left-10 flex items-center gap-5">

          <img
            src="/halsey.png"
            alt="Halsey"
            className="h-32 w-32 rounded-full object-cover"
          />

          <div>
            <h1 className="text-4xl font-bold">
              Halsey
            </h1>

            <p className="text-lg">
              @halsey
            </p>

            <button className="mt-3 rounded-xl bg-[#c83fd8] px-7 py-2 font-bold">
              Follow
            </button>
          </div>

        </div>

      </div>

      <div className="px-10 py-6">

        <div className="flex gap-8 text-xl font-bold">

          <button
            onClick={() => setActiveTab("Popular")}
            className={
              activeTab === "Popular"
                ? "text-[#d13cff]"
                : "text-white"
            }
          >
            Popular
          </button>

          <button
            onClick={() => setActiveTab("Albums")}
            className={
              activeTab === "Albums"
                ? "text-[#d13cff]"
                : "text-white"
            }
          >
            Albums
          </button>

        </div>

        {activeTab === "Popular" && (
          <div className="mt-8 space-y-5">

            {popular.map((song) => (
              <div
                key={song.title}
                className="flex items-center gap-5"
              >

                <img
                  src={song.image}
                  alt={song.title}
                  className="h-20 w-24 rounded-xl object-cover"
                />

                <div>
                  <h2 className="text-lg font-bold">
                    {song.title}
                  </h2>

                  <p className="text-gray-400">
                    {song.number}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

        {activeTab === "Albums" && (
          <div className="mt-8 space-y-5">

            {albums.map((album) => (
              <div key={album.title}>

                {album.title === "Badlands" ? (
                  <Link
                    to="/album/badlands"
                    className="flex items-center gap-5"
                  >

                    <img
                      src={album.image}
                      alt={album.title}
                      className="h-20 w-24 rounded-xl object-cover"
                    />

                    <div>
                      <h2 className="text-lg font-bold">
                        {album.title}
                      </h2>

                      <p className="text-gray-400">
                        Album · {album.year}
                      </p>
                    </div>

                  </Link>
                ) : (
                  <div className="flex items-center gap-5">

                    <img
                      src={album.image}
                      alt={album.title}
                      className="h-20 w-24 rounded-xl object-cover"
                    />

                    <div>
                      <h2 className="text-lg font-bold">
                        {album.title}
                      </h2>

                      <p className="text-gray-400">
                        Album · {album.year}
                      </p>
                    </div>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Artist;