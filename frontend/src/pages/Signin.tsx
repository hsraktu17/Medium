import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Quote from "../components/Quote";

interface SignIn {
  email: string;
  password: string;
}

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validUser, setValidUser] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const requestData: SignIn = {
        email,
        password,
      };
  
      const response = await axios.post(
        "https://backend.utkarsh172002srivastava.workers.dev/api/v1/user/signin",
        requestData
      );
      
      console.log("Sign-in response:", response); // Log the response from the backend
  
      const token = response.data.jwtSignin;
  
      if (token) {
        try {
          localStorage.setItem("token", token);
          console.log("Token:", token); 
          navigate("/blogs");
          setValidUser(true);
        } catch (error) {
          console.error("LocalStorage Error:", error);
        }
      } else {
        setValidUser(false);
      }
    } catch (error) {
      console.error("Sign-in Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-8 bg-white rounded-lg mx-auto">
          <div className="font-bold text-3xl mb-4 flex items-center justify-center">
            Sign In
          </div>
          <div className="text-xl text-gray-500 mb-8 flex items-center justify-center">
            Don't have an account? <Link to={"/signup"}>Signup</Link>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded w-full"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
          {validUser ? (
            <div className="text-green-500 mt-4">User is valid!</div>
          ) : (
            <div className="text-red-500 mt-4">User is not valid!</div>
          )}
        </div>
      </div>
      <Quote />
    </div>
  );
}

export default Signin;
