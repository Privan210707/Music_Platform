import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function GlobalLayout() {

  return (

    <div className="min-h-screen bg-black text-white">

      <Sidebar />

      <main className="ml-[180px] mr-0 min-h-screen">

        <Outlet />

      </main>

    </div>

  );
}

export default GlobalLayout;