import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(
    location.state?.message || ""
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await loginUser({
        email: email.trim(),
        password,
      });

      navigate("/home", { replace: true });
    } catch (err) {
      setError(
        err.message || "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[404px] bg-[#202020] border border-[#454545] rounded-[40px] sm:rounded-[55px] px-[30px] py-7">
        <div className="flex items-start justify-center gap-5 mb-12">
          <div className="w-[55px] h-[55px] flex items-center justify-center gap-[7px] pt-2">
            <span className="w-[5px] h-[15px] rounded-full bg-purple-500"></span>
            <span className="w-[5px] h-[29px] rounded-full bg-purple-500"></span>
            <span className="w-[5px] h-[38px] rounded-full bg-gradient-to-b from-purple-500 to-red-500"></span>
            <span className="w-[5px] h-[29px] rounded-full bg-purple-500"></span>
            <span className="w-[5px] h-[16px] rounded-full bg-purple-500"></span>
          </div>

          <h1 className="text-white text-[29px] leading-[1.28] font-extrabold italic text-center">
            Log in to
            <br />
            start listening
          </h1>
        </div>

        {message && (
          <p className="text-green-400 text-sm text-center mb-5">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-white text-[17px] font-extrabold italic mb-3">
            Email address
          </label>

          <input
            type="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full h-11 rounded-full bg-[#303030] border border-[#414141] outline-none px-4 text-white text-sm placeholder:text-gray-300 focus:border-purple-500 mb-7"
          />

          <label className="block text-white text-[17px] font-extrabold italic mb-3">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full h-11 rounded-full bg-[#303030] border border-[#414141] outline-none px-4 text-white text-sm placeholder:text-gray-300 focus:border-purple-500 mb-5"
          />

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center break-words">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-full text-white text-sm font-extrabold italic bg-gradient-to-r from-[#b83cff] to-[#d946a4] hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="text-white text-center text-[25px] font-bold my-11">
          or
        </div>

        <button
          type="button"
          className="w-full h-11 rounded-full border border-[#474747] bg-[#2c2c2c] text-white text-[13px] font-bold italic flex items-center justify-center relative hover:bg-[#353535] transition mb-7"
        >
          <span className="absolute left-[72px] text-[#4285F4] text-[19px] font-black not-italic">
            G
          </span>
          Continue with Google
        </button>

        <button
          type="button"
          className="w-full h-11 rounded-full border border-[#474747] bg-[#2c2c2c] text-white text-[13px] font-bold italic flex items-center justify-center relative hover:bg-[#353535] transition"
        >
          <span className="absolute left-[74px] text-white text-[17px] not-italic">
            ●
          </span>
          Continue with Apple
        </button>

        <p className="text-white text-center text-sm font-bold italic mt-12">
          Don't have an account?
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-[#d442ff] font-extrabold italic ml-1"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}