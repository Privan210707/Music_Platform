
import { Link } from "react-router-dom";

function Landing() {

  return (

    <div className="bg-white text-black min-h-screen">

     

      <header className="bg-black text-white">

        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

          <h1 className="text-2xl font-bold">

            <span className="text-purple-500">
              〽
            </span>

            Vibe

          </h1>


          <nav className="flex gap-6 text-sm">

            <a href="#features">
              Features
            </a>

            <Link to="/signup">
              Sign Up
            </Link>

            <Link to="/login">
              Log In
            </Link>

          </nav>

        </div>

      </header>


    

      <section className="relative bg-black text-white">

        <img
          src="/banner.png"
          className="w-full h-[420px] object-cover opacity-60"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5">

          <h1 className="text-4xl md:text-6xl font-bold">
            Play millions of songs
          </h1>

          <p className="mt-5 text-gray-300">
            Music for every mood, every moment.
          </p>


          <Link
            to="/signup"
            className="mt-7 bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Sign Up Free
          </Link>

        </div>

      </section>


      

      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-16"
      >

        <h2 className="text-3xl font-bold text-center">
          Why Vibe?
        </h2>


        <div className="grid md:grid-cols-3 gap-10 mt-12">

          <div className="text-center">

            <div className="text-4xl text-purple-500">
              ♫
            </div>

            <h3 className="font-bold text-xl mt-4">
              Play your favorites
            </h3>

            <p className="text-gray-500 mt-3">
              Listen to music you love anytime.
            </p>

          </div>


          <div className="text-center">

            <div className="text-4xl text-purple-500">
              ♥
            </div>

            <h3 className="font-bold text-xl mt-4">
              Make it yours
            </h3>

            <p className="text-gray-500 mt-3">
              Create playlists and save music.
            </p>

          </div>


          <div className="text-center">

            <div className="text-4xl text-purple-500">
              ◉
            </div>

            <h3 className="font-bold text-xl mt-4">
              Discover music
            </h3>

            <p className="text-gray-500 mt-3">
              Find something new every day.
            </p>

          </div>

        </div>

      </section>


     

      <section className="bg-[#f36b83] text-white text-center py-16">

        <h2 className="text-4xl font-bold">
          Ready? Let's play.
        </h2>

        <Link
          to="/signup"
          className="inline-block mt-7 bg-white text-black px-8 py-3 rounded-full font-bold"
        >
          Get Started
        </Link>

      </section>


     

      <footer className="bg-black text-white py-12">

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">

          <div>

            <h2 className="text-xl font-bold">
              <span className="text-purple-500">
                〽
              </span>

              Vibe
            </h2>

          </div>


          <div>

            <h3 className="font-bold mb-3">
              Company
            </h3>

            <p className="text-gray-400">
              About
            </p>

            <p className="text-gray-400">
              Jobs
            </p>

          </div>


          <div>

            <h3 className="font-bold mb-3">
              Communities
            </h3>

            <p className="text-gray-400">
              For Artists
            </p>

            <p className="text-gray-400">
              Developers
            </p>

          </div>


          <div>

            <h3 className="font-bold mb-3">
              Useful Links
            </h3>

            <p className="text-gray-400">
              Support
            </p>

            <p className="text-gray-400">
              Web Player
            </p>

          </div>

        </div>

      </footer>

    </div>

  );
}

export default Landing;

