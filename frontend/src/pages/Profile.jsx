
import { useEffect, useState } from "react";
import {
  getProfile,
  getRecentlyPlayed,
  getPlaylists,
} from "../api";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Mayuri",
    username: "mayuri_music",
    bio: "late-night listener · K-pop & indie",
    image: "/profile.png",
    followers: 128,
    following: 84,
  });

  const [recentlyPlayed, setRecentlyPlayed] = useState([
    { name: "Khat", image: "/khat.png" },
    { name: "Chahu Main", image: "/chahu main.png" },
    { name: "Gul", image: "/gul.png" },
    { name: "Jhol", image: "/jhol.png" },
    { name: "Alag Aasmaan", image: "/alag aasman.png" },
  ]);

  const [playlists, setPlaylists] = useState([
    { name: "Normal", image: "/As it.png" },
    { name: "Die with Smile", image: "/die with.png" },
    { name: "Havana", image: "/havana.png" },
    { name: "Slim Shaddy", image: "/him.png" },
    { name: "Starboy", image: "/justin.png" },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError("");

      const results = await Promise.allSettled([
        getProfile(),
        getRecentlyPlayed(),
        getPlaylists(),
      ]);

      const [profileResult, recentResult, playlistResult] = results;

      if (profileResult.status === "fulfilled") {
        const response = profileResult.value;
        const user = response.profile || response.user || response;

        setProfile((previous) => ({
          name:
            user.username ||
            user.name ||
            user.first_name ||
            previous.name,
          username:
            user.username ||
            user.email?.split("@")[0] ||
            previous.username,
          bio: user.bio || user.description || previous.bio,
          image:
            user.profile_image ||
            user.avatar ||
            user.image ||
            previous.image,
          followers:
            user.followers_count ??
            user.followers?.length ??
            previous.followers,
          following:
            user.following_count ??
            user.following?.length ??
            previous.following,
        }));
      } else {
        setError("Could not load your profile. Showing example data.");
      }

      if (recentResult.status === "fulfilled") {
        const response = recentResult.value;
        const songs = Array.isArray(response)
          ? response
          : response.results ||
            response.recently_played ||
            response.songs ||
            response.data ||
            [];

        if (songs.length > 0) {
          setRecentlyPlayed(
            songs.map((item, index) => {
              const song = item.song || item;
              const title =
                song.title || song.name || song.song_name || "Unknown song";

              return {
                name: title,
                image:
                  song.image ||
                  song.image_url ||
                  song.cover_image ||
                  song.album_image ||
                  song.thumbnail ||
                  [
                    "/khat.png",
                    "/chahu main.png",
                    "/gul.png",
                    "/jhol.png",
                    "/alag aasman.png",
                  ][index % 5],
              };
            })
          );
        }
      }

      if (playlistResult.status === "fulfilled") {
        const response = playlistResult.value;
        const items = Array.isArray(response)
          ? response
          : response.results ||
            response.playlists ||
            response.data ||
            [];

        if (items.length > 0) {
          setPlaylists(
            items.map((playlist, index) => ({
              name: playlist.name || playlist.title || "My Playlist",
              image:
                playlist.image ||
                playlist.image_url ||
                playlist.cover_image ||
                [
                  "/As it.png",
                  "/die with.png",
                  "/havana.png",
                  "/him.png",
                  "/justin.png",
                ][index % 5],
            }))
          );
        }
      }

      setLoading(false);
    }

    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="flex justify-between items-center">
          <div className="w-full h-[45px] bg-[#202020] border border-[#444] rounded-2xl flex items-center px-4 gap-3">
            <span className="text-gray-300">⌕</span>
            <input
              type="text"
              placeholder="Search songs, artists, albums"
              className="bg-transparent outline-none w-full text-white text-sm font-semibold placeholder:text-white"
            />
          </div>
        </div>

        {error && (
          <p className="text-yellow-400 text-sm mt-4">{error}</p>
        )}

        <div className="mt-6 w-full bg-[#202020] border border-[#444] rounded-[30px] p-5 sm:p-6 md:px-10 flex flex-col sm:flex-row items-center gap-5 md:gap-8">
          <img
            src={profile.image}
            alt={profile.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/profile.png";
            }}
            className="w-[120px] h-[120px] sm:w-[135px] sm:h-[135px] rounded-full object-cover border-2 border-black flex-shrink-0"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold italic">
              {profile.name}
            </h1>

            <p className="text-gray-300 font-semibold">
              @{profile.username}
            </p>

            <p className="text-gray-300 font-semibold mt-1">
              {profile.bio}
            </p>

            <div className="flex justify-center sm:justify-start gap-6 mt-1">
              <p className="font-bold text-sm">
                {profile.followers} Followers
              </p>

              <p className="font-bold text-sm">
                {profile.following} Following
              </p>
            </div>

            <button
              type="button"
              className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-2 rounded-xl font-bold"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-xl sm:text-2xl font-bold italic mb-5">
            Recently played
          </h2>

          {loading && (
            <p className="text-gray-400 text-sm mb-4">
              Loading your profile data...
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 lg:gap-8">
            {recentlyPlayed.map((song, index) => (
              <div
                key={`${song.name}-${index}`}
                className="w-full max-w-[150px]"
              >
                <img
                  src={song.image}
                  alt={song.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/khat.png";
                  }}
                  className="w-full aspect-square object-cover rounded-2xl"
                />

                <p className="text-center mt-2 text-sm sm:text-base font-bold italic">
                  {song.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 pb-8">
          <h2 className="text-xl sm:text-2xl font-bold italic mb-5">
            Your Playlists
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 lg:gap-8">
            {playlists.map((playlist, index) => (
              <div
                key={`${playlist.name}-${index}`}
                className="w-full max-w-[150px]"
              >
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/As it.png";
                  }}
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