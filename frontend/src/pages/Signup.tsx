import { Link } from "react-router-dom";
import Quote from "../components/Quote";

function Signup() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex justify-center items-center ">
        <div className="w-96 p-8">
          <div className="font-bold text-3xl mb-4">Create an account</div>
          <div className="text-xl text-gray-500 mb-8">
            Already have an account? 
            <Link to = {"/signin"}>Login</Link>
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="font-bold text-lg block">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="font-bold text-lg block">
              Email
            </label>
            <input
              id="username"
              type="text"
              placeholder="m@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="font-bold text-lg block">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div>
            <button className="bg-black text-white font-bold py-2 px-4 rounded w-full">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div>
        <Quote />
      </div>
    </div>
  );
}

export default Signup;
