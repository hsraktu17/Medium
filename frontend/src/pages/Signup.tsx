import { Link, useNavigate } from "react-router-dom";
import Quote from "../components/Quote";
import { useState } from "react";
import axios, { AxiosError } from "axios";

interface SignUpData{
  email : string,
  name : string,
  password : string
}

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validUser, setValidUser] = useState(false)
  const navigate = useNavigate()

  const handleSignUP = async () =>{
    try{
      const requestData : SignUpData ={
        name,
        email,
        password
      }

      const response = await axios.post('https://backend.utkarsh172002srivastava.workers.dev/api/v1/user/signup',requestData)
      const token = response.data.token
      if(token){
        localStorage.setItem("token" ,token)
        navigate('/blog')
        setValidUser(true)
      }else{
        setValidUser(false)
      }
    }catch(error){
      console.error("Signup error:", error);
      if ((error as AxiosError).response?.status === 400) {
          console.error("error found", error)
      } else {
          console.error("error found", error)
      } 
    }
  }

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
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="font-bold text-lg block">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="m@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2"
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="bg-black text-white font-bold py-2 px-4 rounded w-full" onClick={handleSignUP}>
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
