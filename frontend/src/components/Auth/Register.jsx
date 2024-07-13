import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import logo from './logo.png'

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://job-portal-xtav.onrender.com/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
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
      <section className="flex h-auto justify-center m-6 ">
        <div className="w-10/12 justify-center">
          <div className="flex flex-col items-center">
            <img  className=" rounded-full w-[324px] h-[224px] p-2 m-2 my-0" src={logo} alt="logo" />
            <h3 className="p-2 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl m-1 font-serif bg-blue-950 text-slate-50 rounded-md ">Create a new account</h3>
          </div>
          <div className="flex h-auto justify-center space-x-4 border-[1px] border-slate-300 shadow-md shadow-slate-400">
          <form className="w-full md:w-1/2 h-auto m-1 p-1 border-2 border-slate-200 rounded-md shadow-md shadow-slate-400 ">
          <div className="m-2 my-0 p-2">
          <div className=" m-2 my-0 p-1 flex flex-col">
              <label className=" m-1 p-1 text-lg font-bold">Register As</label>
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
              <label className=" m-1 p-1 text-lg font-bold">Name</label>
              <div className="flex justify-between">
                <input
                className=" my-2 p-1 w-full border-[1px] border-slate-200 rounded-md"
                  type="text"
                  placeholder="Anoop Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="flex justify-center items-center m-3">
                <FaPencilAlt /></div>
              </div>
            </div>
            <div className=" m-2 p-1 flex flex-col">
              <label className=" m-1 p-1 text-lg font-bold">Email Address</label>
              <div className="flex justify-between">
                <input
                className=" my-2 p-1 w-full border-[1px] border-slate-200 rounded-md"
                  type="email"
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex justify-center items-center m-3">
                <MdOutlineMailOutline /></div>
              </div>
            </div>
            <div className=" m-2 p-1 flex flex-col">
              <label className=" m-1 p-1 text-lg font-bold">Phone Number</label>
              <div className="flex justify-between">
                <input
                className=" my-2 p-1 w-full border-[1px] border-slate-200 rounded-md"
                  type="number"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div className="flex justify-center items-center m-3">
                <FaPhoneFlip /></div>
              </div>
            </div>
            <div className=" m-2 p-1 flex flex-col">
              <label className=" m-1 p-1 text-lg font-bold">Password</label>
              <div className="flex justify-between">
                <input
                className=" my-2 p-1 w-full border-[1px] border-slate-200 rounded-md"
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-center items-center m-3">
                <RiLock2Fill /></div>
              </div>
            </div>
            <div className="flex  justify-center ">
            <button className=" shadow-md shadow-blue-950 text-center  m-2 p-3 rounded-md border-[1px] border-blue-950 hover:text-blue-950 hover:bg-slate-50 flex flex-col bg-blue-950 text-slate-50" type="submit" onClick={handleRegister}>
              Register
            </button>
            </div>
            <div className=" flex justify-center">
            <button className=" shadow-md shadow-blue-950 m-3 p-3 rounded-md border-[1px] border-blue-950 hover:text-slate-50 hover:bg-blue-950 flex flex-col bg-slate-50 text-blue-950">  <Link to={"/login"}>Login Now</Link></button>
           
            </div>
           
          </div>
           
          </form>
          <div className=" w-1/2 m-2 h-auto mb-48 size-6 p-1 hidden md:flex md:justify-center md:items-end">
          <img className=" w-[380px] h-[380px] flex items-end mb-0 animate-bounce" src="https://img.freepik.com/free-vector/smart-id-card-with-photo-users-identification-microchip-electronic-identity-card-plastic-smartcard-personal-information-chipcard-concept-vector-isolated-illustration_335657-2220.jpg?t=st=1720436427~exp=1720440027~hmac=974b41ef147b506338a02f0b7c5ca390c68ae3f3dd7baf33771e747bfcd34241&w=996" alt="login" />
        </div>
        
          </div>
          
       </div>
       
      </section>
    </>
  );
};

export default Register;
