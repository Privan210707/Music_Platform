import React, { useState } from "react";
import {
  Play,
  Heart,
} from "lucide-react";

import {
  likeSong,
  unlikeSong,
} from "../api";

const MusicCard = ({
  song,
  onPlay,
  initiallyLiked = false,
}) => {

  const [liked, setLiked] =
    useState(initiallyLiked);

  const [likeLoading, setLikeLoading] =
    useState(false);

  const title =
    song?.title ||
    song?.song_name ||
    song?.name ||
    "Unknown Song";

  const artist =
    song?.artist_name ||
    song?.artist?.name ||
    song?.artist ||
    "Unknown Artist";

  const image =
    song?.image_url ||
    song?.image ||
    song?.cover_image ||
    song?.album_image ||
    song?.thumbnail ||
    "/music-placeholder.jpg";

  const handleLike = async () => {

    if (!song?.id || likeLoading) {
      return;
    }

    setLikeLoading(true);

    try {

      if (liked) {

        await unlikeSong(song.id);

        setLiked(false);

      } else {

        await likeSong(song.id);

        setLiked(true);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLikeLoading(false);

    }
  };

  return (
    <div className="bg-[#181818] rounded-2xl p-4 hover:bg-[#242424] transition duration-300 group">

      <div className="relative">

        <img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover rounded-xl"
          onError={(e) => {
            e.currentTarget.src =
              "/music-placeholder.jpg";
          }}
        />

        <button
          onClick={onPlay}
          className="absolute bottom-3 right-3 bg-[#FF8DC7] text-white p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition"
        >

          <Play
            size={19}
            fill="white"
          />

        </button>

      </div>

      <div className="flex items-center justify-between mt-3">

        <div className="min-w-0">

          <h3 className="font-semibold text-white truncate">
            {title}
          </h3>

          <p className="text-gray-400 text-sm truncate">
            {artist}
          </p>

        </div>

        <button
          onClick={handleLike}
          className="ml-2 flex-shrink-0"
        >

          <Heart
            size={19}
            className={
              liked
                ? "text-[#FF8DC7] fill-[#FF8DC7]"
                : "text-gray-500"
            }
          />

        </button>

      </div>

    </div>
  );
};

export default MusicCard;