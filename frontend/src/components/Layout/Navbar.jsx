import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import img from './logo.png'

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://job-portal-xtav.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className="bg-blue-950 flex w-full mb-0 relative text-base sm:text-sm  ">
      <div className="w-full mx-5 py-1 flex justify-between items-center">
        <img className="w-[50px] h-[50px] rounded-full" src={img} alt="logo" />
        <div className="hidden lg:flex justify-end w-full items-center">
          <ul className="flex justify-end items-center text-slate-50 space-x-3">
            <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-slate-50">
              <Link to={"/"}>HOME</Link>
            </li>
            <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-slate-50">
              <Link to={"/job/getall"}>ALL JOBS</Link>
            </li>
            <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-slate-50">
              <Link to={"/applications/me"}>
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-slate-50">
                  <Link to={"/job/post"}>POST NEW JOB</Link>
                </li>
                <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-slate-50">
                  <Link to={"/job/me"}>VIEW YOUR JOBS</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="flex items-center space-x-2 text-white">
          <div className="lg:hidden">
            <GiHamburgerMenu
              className="text-white cursor-pointer"
              size={30}
              onClick={() => setShow(!show)}
            />
          </div>
          <button
            className="bg-slate-50 rounded-md text-blue-950 hover:bg-red-600 hover:text-white m-1 p-2"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>
      </div>
      {show && (
        <div className="absolute top-full flex rounded-md right-0  bg-white z-50 lg:hidden">
          <ul className="flex flex-col w-full items-center text-slate-50 space-y-3 mt-3 p-3">
            <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-blue-950">
              <Link to={"/"} onClick={() => setShow(false)}>
                HOME
              </Link>
            </li>
            <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-blue-950">
              <Link to={"/job/getall"} onClick={() => setShow(false)}>
                ALL JOBS
              </Link>
            </li>
            <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-blue-950">
              <Link to={"/applications/me"} onClick={() => setShow(false)}>
                {user && user.role === "Employer"
                  ? "APPLICATIONS"
                  : "APPLICATIONS"}
              </Link>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-blue-950">
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li className="font-semibold m-1 p-1 hover:bg-slate-50 hover:text-blue-950 rounded-md bg-blue-950 text-slate-50 border-[1px] border-blue-950">
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
