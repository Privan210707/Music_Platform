import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(query)}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl"
    >

      <Search
        size={20}
        className="absolute left-4 top-3.5 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search for songs, artists..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full bg-[#242424] border border-[#333333] text-white rounded-full py-3 pl-12 pr-5 outline-none focus:border-[#FF8DC7]"
      />

    </form>
  );
};

export default Searchbar;