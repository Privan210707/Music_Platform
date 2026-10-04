import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">

      <nav className="flex h-[48px] items-center justify-between border-b border-gray-700 px-4 md:px-8">

        <div className="flex items-center gap-2">

         <img
            src="/logo.png"
            alt="Logo"
            className="h-6 w-6 md:h-8 md:w-8"
          />
          <span className="text-sm font-extrabold italic">
            Vibe
          </span>

        </div>

        <div className="flex items-center gap-4 text-xs font-extrabold md:gap-7 md:text-sm">

          <a href="#why" className="hover:text-purple-400">
            Support
          </a>

          <a href="#footer" className="hover:text-purple-400">
            Download
          </a>

          <span>|</span>

          <button
            onClick={() => navigate("/signup")}
            className="hover:text-purple-400"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="hover:text-purple-400"
          >
            Log In
          </button>

        </div>

      </nav>


      <section className="flex h-[125px] bg-black md:h-[160px]">

        <div className="flex w-[52%] flex-col justify-center px-4 md:px-8">

          <h1 className="text-lg font-extrabold leading-tight md:text-3xl">
            Play millions of songs for free
          </h1>

          <button
            onClick={() => navigate("/signup")}
            className="mt-5 w-fit rounded-lg bg-gray-200 px-7 py-3 text-xs font-extrabold text-black hover:bg-white"
          >
            Sign Up Free
          </button>

        </div>

        <div className="w-[48%] overflow-hidden">

          <img
            src="/lnding camera.png"
            alt="Camera"
            className="h-full w-full object-cover"
          />

        </div>

      </section>


      <section
        id="why"
        className="bg-white px-3 py-3 text-center text-black md:py-5"
      >

        <h2 className="text-2xl font-extrabold md:text-3xl">
          Why Vibe?
        </h2>

        <div className="mx-auto mt-4 grid max-w-4xl grid-cols-3 gap-3 md:mt-5">

          <div>

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-3xl text-white md:h-24 md:w-24">
              ♫
            </div>

            <h3 className="mt-3 text-xs font-extrabold md:text-sm">
              Play your favorites
            </h3>

            <p className="mt-2 text-[8px] font-bold leading-tight md:text-[10px]">
              Listen to the songs you love,
              <br />
              and discover new music
            </p>

          </div>


          <div>

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-3xl text-white md:h-24 md:w-24">
              ♥
            </div>

            <h3 className="mt-3 text-xs font-extrabold md:text-sm">
              Make it yours
            </h3>

            <p className="mt-2 text-[8px] font-bold leading-tight md:text-[10px]">
              Tell us what you like, and we'll
              <br />
              recommend music for you.
            </p>

          </div>


          <div>

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-3xl text-white md:h-24 md:w-24">
              ●
            </div>

            <h3 className="mt-3 text-xs font-extrabold md:text-sm">
              Playlists made easy
            </h3>

            <p className="mt-2 text-[8px] font-bold leading-tight md:text-[10px]">
              We'll help you make playlists,
              <br />
              Or enjoy playlists.
            </p>

          </div>

        </div>

      </section>


      <section className="relative h-[200px] overflow-hidden md:h-[230px]">

        <img
          src="/landing girl.png"
          alt="Girl listening to music"
          className="h-full w-full object-cover"
        />

        <h2 className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-extrabold italic md:left-8 md:text-4xl">
          Ready? Let's play.
        </h2>

      </section>


      <footer
        id="footer"
        className="grid min-h-[190px] grid-cols-4 gap-3 bg-black px-4 py-7 md:min-h-[200px] md:px-8"
      >

        <div className="flex items-start gap-2 text-sm font-extrabold">

        <img
            src="/logo.png"
            alt="Logo"
            className="h-6 w-6 md:h-8 md:w-8"
          />

          Vibe

        </div>


        <div className="text-[10px] font-bold leading-tight md:text-xs">

          <h3 className="mb-2">
            Company
          </h3>

          <p className="underline">About</p>
          <p className="underline">Jobs</p>
          <p className="underline">For the Record</p>

        </div>


        <div className="text-[10px] font-bold leading-tight md:text-xs">

          <h3 className="mb-2">
            Communities
          </h3>

          <p className="underline">For Artists</p>
          <p className="underline">For Creators</p>
          <p className="underline">For Authors</p>
          <p className="underline">Developers</p>
          <p className="underline">Advertising</p>
          <p className="underline">Investors</p>
          <p className="underline">Vendors</p>

        </div>


        <div className="text-[10px] font-bold leading-tight md:text-xs">

          <h3 className="mb-2">
            Useful Links
          </h3>

          <p className="underline">Support</p>
          <p className="underline">Web Player</p>
          <p className="underline">Free Mobile App</p>
          <p className="underline">Import your music</p>

        </div>

      </footer>

    </div>
  );
}

export default Landing;