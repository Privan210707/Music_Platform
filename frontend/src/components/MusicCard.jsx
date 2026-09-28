function MusicCard({ image, title, artist }) {

  return (

    <div className="group cursor-pointer">

      <div className="relative overflow-hidden rounded-xl">

        <img
          src={image}
          alt={title}
          className="w-full h-[130px] object-cover group-hover:scale-105 transition duration-300"
        />

        <button className="absolute bottom-2 right-2 bg-white text-black w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 transition">

          ▶

        </button>

      </div>


      <h3 className="mt-2 text-sm font-bold truncate">
        {title}
      </h3>

      <p className="text-xs text-gray-400 truncate">
        {artist}
      </p>

    </div>

  );
}

export default MusicCard;