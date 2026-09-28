function Searchbar() {

  return (

    <div className="flex items-center gap-3 bg-[#222832] border border-gray-700 rounded-2xl px-5 py-3 w-full">

      <span className="text-lg">
        ⌕
      </span>

      <input
        type="text"
        placeholder="Search songs, artists, albums"
        className="bg-transparent outline-none w-full text-sm"
      />

    </div>

  );
}

export default Searchbar;