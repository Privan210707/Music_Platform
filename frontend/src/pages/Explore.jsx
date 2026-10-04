
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenres, getArtists } from "../api";

function Explore() {
  const navigate = useNavigate();

  const sampleGenres = [
    { name: "Pop", image: "/pop.png", color: "#2db1bd" },
    { name: "Hip-Hop", image: "/hip-hop.png", color: "#ed873c" },
    { name: "Mood", image: "/mood.png", color: "#e84c89" },
    { name: "Soul", image: "/soul.png", color: "#7856c9" },
    { name: "K-pop", image: "/k-pop.png", color: "#db4777" },
    { name: "Rain & Monsoon", image: "/rain.png", color: "#4285b4" },
    { name: "Classical", image: "/classical.png", color: "#b58a43" },
    { name: "Summer", image: "/summer.png", color: "#4ba66a" },
  ];

  const sampleArtists = [
    { name: "K.K", image: "/kk.png" },
    { name: "Arijit Singh", image: "/arijit.png" },
    { name: "Rose", image: "/rose.png" },
    { name: "Jungkook", image: "/jungkook.png" },
    { name: "Halsey", image: "/halsey.png" },
    { name: "Justin Bieber", image: "/justin.png" },
  ];

  const colors = [
    "#2db1bd",
    "#ed873c",
    "#e84c89",
    "#7856c9",
    "#db4777",
    "#4285b4",
    "#b58a43",
    "#4ba66a",
  ];

  const [genres, setGenres] = useState(sampleGenres);
  const [artists, setArtists] = useState(sampleArtists);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExploreData() {
      try {
        setError("");

        const [genreResponse, artistResponse] =
          await Promise.allSettled([
            getGenres(),
            getArtists(),
          ]);

        if (genreResponse.status === "fulfilled") {
          const data = genreResponse.value;

          const list = Array.isArray(data)
            ? data
            : data.results ||
              data.genres ||
              data.data?.results ||
              data.data?.genres ||
              data.data ||
              [];

          if (Array.isArray(list) && list.length > 0) {
            const updatedGenres = list.map((genre, index) => {
              const name =
                genre.name ||
                genre.title ||
                genre.genre_name ||
                "Genre";

              const sample = sampleGenres.find(
                (item) =>
                  item.name.toLowerCase() === name.toLowerCase()
              );

              return {
                ...genre,
                name,
                image:
                  genre.image_url ||
                  genre.image ||
                  genre.cover_image ||
                  sample?.image ||
                  "/music.png",
                color:
                  genre.color ||
                  sample?.color ||
                  colors[index % colors.length],
              };
            });

            setGenres(updatedGenres);
          }
        }

        if (artistResponse.status === "fulfilled") {
          const data = artistResponse.value;

          const list = Array.isArray(data)
            ? data
            : data.results ||
              data.artists ||
              data.data?.results ||
              data.data?.artists ||
              data.data ||
              [];

          if (Array.isArray(list) && list.length > 0) {
            const updatedArtists = list.map((artist) => {
              const name =
                artist.name ||
                artist.artist_name ||
                artist.title ||
                "Unknown Artist";

              const sample = sampleArtists.find(
                (item) =>
                  item.name.toLowerCase() === name.toLowerCase()
              );

              return {
                ...artist,
                name,
                image:
                  artist.image_url ||
                  artist.image ||
                  artist.profile_image ||
                  artist.picture ||
                  sample?.image ||
                  "/music.png",
              };
            });

            setArtists(updatedArtists);
          }
        }

        if (
          genreResponse.status === "rejected" &&
          artistResponse.status === "rejected"
        ) {
          setError("Could not connect to the backend. Showing sample content.");
        }
      } catch {
        setError("Could not load Explore data. Showing sample content.");
      } finally {
        setLoading(false);
      }
    }

    loadExploreData();
  }, []);

  function openArtist(artist) {
    const name = artist.name || artist.artist_name;

    if (name && name.toLowerCase() === "halsey") {
      navigate("/artist/Halsey");
    }
  }

  return (
    <div className="min-h-screen w-full bg-black p-4 text-white sm:p-6 lg:p-10">
      <h1 className="mb-2 text-3xl font-bold">
        Explore
      </h1>

      <p className="mb-8 text-gray-400">
        Explore music, genres and artists
      </p>

      {loading && (
        <p className="mb-4 text-sm text-gray-400">
          Updating Explore with backend data...
        </p>
      )}

      {error && (
        <p className="mb-4 text-sm text-yellow-400">
          {error}
        </p>
      )}

      <h2 className="mb-5 text-2xl font-bold">
        Browse All
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {genres.map((genre, index) => {
          const name = genre.name || genre.title || "Genre";

          return (
            <div
              key={genre.id || name + index}
              style={{
                backgroundColor: genre.color || colors[index % colors.length],
              }}
              className="relative h-36 overflow-hidden rounded-xl p-5"
            >
              <h3 className="relative z-10 max-w-[65%] text-xl font-bold">
                {name}
              </h3>

              <img
                src={genre.image || genre.image_url || "/music.png"}
                alt={name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/music.png";
                }}
                className="absolute -bottom-3 -right-2 h-28 w-28 rotate-12 rounded-lg object-cover"
              />
            </div>
          );
        })}
      </div>

      <h2 className="mb-5 mt-10 text-2xl font-bold">
        Popular Artists
      </h2>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {artists.map((artist, index) => {
          const name =
            artist.name ||
            artist.artist_name ||
            "Unknown Artist";

          const image =
            artist.image ||
            artist.image_url ||
            "/music.png";

          const isHalsey = name.toLowerCase() === "halsey";

          return (
            <div
              key={artist.id || name + index}
              onClick={() => openArtist(artist)}
              onKeyDown={(e) => {
                if (isHalsey && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  openArtist(artist);
                }
              }}
              role={isHalsey ? "button" : undefined}
              tabIndex={isHalsey ? 0 : undefined}
              className={`text-center ${
                isHalsey ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <img
                src={image}
                alt={name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/music.png";
                }}
                className={`mx-auto h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32 ${
                  isHalsey
                    ? "transition duration-300 hover:scale-105"
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

