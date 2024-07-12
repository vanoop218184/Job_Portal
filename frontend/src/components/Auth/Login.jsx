import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import logo from './logo.png'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  return (
    <>
      <section className=" flex justify-center m-6"> 
        <div className="w-10/12 flex   flex-col items-center ">
          <div className="flex flex-col items-center">
            <img className=" rounded-full w-[324px] h-[224px] p-2 m-2 shadow-lg shadow-slate-300" src={logo} alt="logo" />
            <h3 className="p-2 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl m-2 font-serif bg-blue-950 text-slate-50 rounded-md ">Login to your account</h3>
          </div >
          <div className="flex justify-center space-x-4 border-[1px] border-slate-300 shadow-xl shadow-slate-500 rounded-lg">
          <form className=" flex justify-center lg:w-1/2 m-2 p-3 border-2 border-slate-200 rounded-md shadow-md shadow-slate-400 ">
            <div className="w-full m-2 p-2">
            <div className=" m-2 p-1 flex flex-col">
              <label className=" m-1 p-1 text-lg font-bold">Login As</label>
              <div className="flex justify-between">
                <select className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <div className="flex justify-center items-center m-3"><FaRegUser /></div>
                
              </div>
            </div>
            <div className=" m-2 p-1 flex flex-col">
              <label className=" font-bold">Email Address</label>
              <div className="flex justify-between">
                <input
                className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="  font-bold flex justify-center items-center m-3" ><MdOutlineMailOutline /></div>
                
              </div>
            </div>
            <div className=" m-2 p-1 flex flex-col">
              <label className="font-bold">Password</label>
              <div className="flex justify-between">
                <input
                className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="  flex justify-center items-center m-3" ><RiLock2Fill /></div>
                
              </div>
            </div>
            <div className="flex  justify-center ">
            <button className=" shadow-md shadow-blue-950 text-center  m-2 p-3 rounded-md border-[1px] border-blue-950 hover:text-blue-950 hover:bg-slate-50 flex flex-col bg-blue-950 text-slate-50" type="submit" onClick={handleLogin}>
              Login
            </button>
            </div>
            <div className=" flex justify-center">
            <button className=" shadow-md shadow-blue-950 m-3 p-3 rounded-md border-[1px] border-blue-950 hover:text-slate-50 hover:bg-blue-950 flex flex-col bg-slate-50 text-blue-950"> <Link  to={"/register"}>Register Now</Link></button>
           
            </div>
            </div>
          </form>
          <div className=" w-1/2 m-2 h-full p-1 hidden md:flex md:justify-center md:items-end">
          <img className=" w-[380px] h-[380px] flex items-end mb-5 animate-bounce" src="https://img.freepik.com/premium-vector/sign-page-abstract-concept-vector-illustration_107173-25670.jpg?w=740" alt="login" />
        </div>
          </div>
          
       </div> 
      </section>
    </>
  );
};

export default Login;
