import { useNavigate, useParams } from "react-router-dom";

function Album() {
  const navigate = useNavigate();
  const { albumId } = useParams();

  const albums = {
    "great-impersonator": {
      name: "The Great Impersonator",
      year: "2025",
      image: "/the great.png",
      songs: [
        "Only Living Girl in LA",
        "Ego",
        "Panic Attack",
        "Lucky",
        "The End",
      ],
    },

    manic: {
      name: "Manic",
      year: "2020",
      image: "/manic.png",
      songs: [
        "You Should Be Sad",
        "Graveyard",
        "Without Me",
        "Finally // Beautiful Stranger",
        "3am",
      ],
    },

    badlands: {
      name: "Badlands",
      year: "2018",
      image: "/badland.png",
      songs: [
        "Castle",
        "Hold Me Down",
        "New Americana",
        "Colors",
        "Ghost",
      ],
    },

    "hopeless-fountain-kingdom": {
      name: "Hopeless fountain kingdom",
      year: "2017",
      image: "/hopeless.png",
      songs: [
        "The Prologue",
        "100 Letters",
        "Eyes Closed",
        "Alone",
        "Now or Never",
      ],
    },
  };

  const album = albums[albumId];

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-5 py-2 rounded-full bg-[#222] hover:bg-[#333]"
      >
        ← Back
      </button>

      <div className="flex items-end gap-7">

        <img
          src={album.image}
          alt={album.name}
          className="w-52 h-52 rounded-2xl object-cover"
        />

        <div>

          <p className="text-gray-400">
            Album
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {album.name}
          </h1>

          <p className="text-gray-400 mt-3">
            Halsey · {album.year}
          </p>

        </div>

      </div>

      <div className="mt-10">

        {album.songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-4 rounded-xl hover:bg-[#171717]"
          >

            <span className="text-gray-500 w-5">
              {index + 1}
            </span>

            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
              ♪
            </div>

            <div>

              <h3 className="font-semibold">
                {song}
              </h3>

              <p className="text-gray-500 text-sm">
                Halsey
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Album;