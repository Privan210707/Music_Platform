import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(
          data.detail ||
          data.message ||
          "Signup failed"
        );
      }
    } catch (error) {
      setMessage("Cannot connect to backend");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 text-white">

      <div className="absolute inset-0 flex items-center justify-center opacity-30">

        <div className="flex items-center gap-2">

          <span className="h-20 w-2 rounded bg-purple-500"></span>
          <span className="h-32 w-2 rounded bg-pink-500"></span>
          <span className="h-48 w-2 rounded bg-purple-500"></span>
          <span className="h-28 w-2 rounded bg-pink-500"></span>
          <span className="h-56 w-2 rounded bg-purple-500"></span>
          <span className="h-36 w-2 rounded bg-pink-500"></span>
          <span className="h-24 w-2 rounded bg-purple-500"></span>
          <span className="h-44 w-2 rounded bg-pink-500"></span>
          <span className="h-28 w-2 rounded bg-purple-500"></span>
          <span className="h-52 w-2 rounded bg-pink-500"></span>
          <span className="h-32 w-2 rounded bg-purple-500"></span>

        </div>

      </div>


      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#181818] p-8 shadow-2xl">

        <div className="mb-5 flex justify-center">

          <div className="flex items-center gap-1">

            <span className="h-3 w-1 rounded bg-purple-500"></span>
            <span className="h-5 w-1 rounded bg-purple-500"></span>
            <span className="h-8 w-1 rounded bg-pink-500"></span>
            <span className="h-5 w-1 rounded bg-purple-500"></span>
            <span className="h-3 w-1 rounded bg-pink-500"></span>

          </div>

        </div>


        <h1 className="text-center text-2xl font-bold">
          Sign up to start listening
        </h1>


        <form
          onSubmit={handleSignup}
          className="mt-8"
        >

          <label className="text-sm font-bold">
            Email address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="mt-2 w-full rounded-lg border border-gray-600 bg-[#242424] px-4 py-3 text-white outline-none focus:border-purple-500"
          />


          <label className="mt-5 block text-sm font-bold">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mt-2 w-full rounded-lg border border-gray-600 bg-[#242424] px-4 py-3 text-white outline-none focus:border-purple-500"
          />


          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 font-bold hover:opacity-90"
          >
            Sign Up
          </button>

        </form>


        {message && (
          <p className="mt-4 text-center text-sm text-purple-300">
            {message}
          </p>
        )}


        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-700"></div>
          <span className="text-sm text-gray-400">or</span>
          <div className="h-px flex-1 bg-gray-700"></div>
        </div>


        <button className="mb-3 flex w-full items-center justify-center gap-3 rounded-full bg-[#242424] py-3 font-bold hover:bg-[#303030]">
          <span className="text-lg">G</span>
          Continue with Google
        </button>


        <button className="flex w-full items-center justify-center gap-3 rounded-full bg-[#242424] py-3 font-bold hover:bg-[#303030]">
          <span className="text-lg">●</span>
          Continue with Apple
        </button>


        <p className="mt-7 text-center text-sm text-gray-400">
          Already have an account?{" "}

          <Link
            to="/login"
            className="font-bold text-white underline hover:text-purple-400"
          >
            Log In
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;