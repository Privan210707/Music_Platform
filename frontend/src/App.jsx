import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalLayout from "./components/GlobalLayout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import Library from "./pages/Library";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<GlobalLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;