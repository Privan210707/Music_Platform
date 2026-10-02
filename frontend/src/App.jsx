import { Routes, Route, Navigate } from "react-router-dom";

import GlobalLayout from "./components/GlobalLayout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Artist from "./pages/Artist";
import Album from "./pages/Album";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/home" />} />

      <Route element={<GlobalLayout />}>

        <Route path="/home" element={<Home />} />

        <Route path="/search" element={<Search />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/library" element={<Library />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/artist/halsey" element={<Artist />} />

        <Route path="/album/badlands" element={<Album />} />

      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

    </Routes>
  );
}

export default App;