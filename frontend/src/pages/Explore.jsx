import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenres, getArtists } from "../api";

function Explore() {
  const navigate = useNavigate();

  const [genres, setGenres] = useState([
    { name: "Pop", image: "/pop.png", color: "#2db1bd" },
    { name: "Hip-Hop", image: "/hip-hop.png", color: "#ed873c" },
    { name: "Mood", image: "/mood.png", color: "#e84c89" },
    { name: "Soul", image: "/soul.png", color: "#7856c9" },
    { name: "K-pop", image: "/k-pop.png", color: "#db4777" },
    { name: "Rain & Monsoon", image: "/rain.png", color: "#4285b4" },
    { name: "Classical", image: "/classical.png", color: "#b58a43" },
    { name: "Summer", image: "/summer.png", color: "#4ba66a" },
  ]);

  const [artists, setArtists] = useState([
    { name: "K.K", image: "/kk.png" },
    { name: "Arijit Singh", image: "/arijit.png" },
    { name: "Rose", image: "/rose.png" },
    { name: "Jungkook", image: "/jungkook.png" },
    { name: "Halsey", image: "/halsey.png" },
    { name: "Justin Bieber", image: "/justin.png" },
  ]);

  useEffect(() => {
    getGenres()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGenres(data);
        }
      })
      .catch(() => {});

    getArtists()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setArtists(data);
        }
      })
      .catch(() => {});
  }, []);

  function openArtist(artist) {
    const name = artist.name || artist.artist_name;

    if (name && name.toLowerCase() === "halsey") {
      navigate("/artist/Halsey");
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white p-6 sm:p-10">

      <h1 className="text-3xl font-bold mb-2">
        Explore
      </h1>

      <p className="text-gray-400 mb-8">
        Explore music, genres and artists
      </p>

      <h2 className="text-2xl font-bold mb-5">
        Browse All
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {genres.map((genre, index) => (
          <div
            key={genre.id || genre.name || index}
            style={{
              backgroundColor:
                genre.color ||
                [
                  "#2db1bd",
                  "#ed873c",
                  "#e84c89",
                  "#7856c9",
                  "#db4777",
                  "#4285b4",
                  "#b58a43",
                  "#4ba66a",
                ][index % 8],
            }}
            className="relative h-36 rounded-xl overflow-hidden p-5"
          >
            <h3 className="text-xl font-bold">
              {genre.name || genre.title}
            </h3>

            <img
              src={genre.image_url || genre.image}
              alt={genre.name || genre.title}
              className="absolute w-28 h-28 object-cover rotate-12 -right-2 -bottom-3 rounded-lg"
            />
          </div>
        ))}

      </div>

      <h2 className="text-2xl font-bold mt-10 mb-5">
        Popular Artists
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

        {artists.map((artist, index) => {
          const name = artist.name || artist.artist_name;
          const image = artist.image_url || artist.image;

          const isHalsey =
            name && name.toLowerCase() === "halsey";

          return (
            <div
              key={artist.id || name || index}
              onClick={() => openArtist(artist)}
              className={`text-center ${
                isHalsey
                  ? "cursor-pointer"
                  : "cursor-default"
              }`}
            >

              <img
                src={image}
                alt={name}
                className={`w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full object-cover ${
                  isHalsey
                    ? "hover:scale-105 transition duration-300"
                    : ""
                }`}
              />

              <p className="mt-3 font-semibold">
                {name}
              </p>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Explore;