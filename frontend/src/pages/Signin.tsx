import { Link } from "react-router-dom";

function Signin() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-8 bg-white rounded-lg mx-auto">
          <div className="font-bold text-3xl mb-4 flex items-center justify-center">Sign In</div>
          <div className="text-xl text-gray-500 mb-8 flex items-center justify-center">
            Don't have an account?  <Link to = {"/signup"}>Signup</Link>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="font-bold text-lg block">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="example@example.com"
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
              placeholder="Password"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div>
            <button className="bg-black text-white font-bold py-2 px-4 rounded w-full">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Signin;
  