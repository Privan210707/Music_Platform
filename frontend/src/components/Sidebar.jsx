import { NavLink } from "react-router-dom";

function Sidebar() {

  return (

    <aside className="fixed left-0 top-0 z-40 w-[180px] h-screen bg-[#202020] p-5">

      <div className="flex items-center gap-3 mb-10">

        <div className="text-3xl text-purple-500">
         
         <img
              src="/logo.png"
              alt="logo"
              className="flex items-center gap-2"
            />
        
        </div>

        <h1 className="text-2xl font-bold">
          Vibe
        </h1>

      </div>


      <nav className="space-y-3">

        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-full font-bold ${
              isActive
                ? "bg-[#444444] text-[#d143ff]"
                : "text-white hover:text-purple-400"
            }`
          }
        >
          <span>⌂</span>
          Home
        </NavLink>


        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-full font-bold ${
              isActive
                ? "bg-[#444444] text-[#d143ff]"
                : "text-white hover:text-purple-400"
            }`
          }
        >
          <span>⌕</span>
          Search
        </NavLink>


        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-full font-bold ${
              isActive
                ? "bg-[#444444] text-[#d143ff]"
                : "text-white hover:text-purple-400"
            }`
          }
        >
          <span>◉</span>
          Explore
        </NavLink>


        <NavLink
          to="/library"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-full font-bold ${
              isActive
                ? "bg-[#444444] text-[#d143ff]"
                : "text-white hover:text-purple-400"
            }`
          }
        >
          <span>♫</span>
          Library
        </NavLink>


        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-full font-bold ${
              isActive
                ? "bg-[#444444] text-[#d143ff]"
                : "text-white hover:text-purple-400"
            }`
          }
        >
          <span>○</span>
          Profile
        </NavLink>

      </nav>

    </aside>

  );
}

export default Sidebar;