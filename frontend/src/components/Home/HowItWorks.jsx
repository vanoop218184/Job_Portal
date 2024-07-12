import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="justify-center items-center  hidden md:flex md:flex-col  m-3 p-3">
      <h3 className="text-center font-bold text-3xl mb-4 border-b-2 border-b-blue-950">How JobPortal Works</h3>
        <div className=" flex flex-col items-center bg-slate-50 w-10/12 m-1 p-4 rounded-2xl">
          <div className="flex  m-5 p-3 ">
            <div className=" bg-white flex flex-col justify-center items-center mx-5  shadow-md shadow-blue-500 border-2 border-slate-500 rounded-xl p-1 m-3">
              <div className="m-3 p-3 flex justify-center items-center scale-105 w-auto shadow-md shadow-blue-500 border-2 border-slate-500 rounded-full hover:scale-110"><FaUserPlus /></div>
              
              <p className=" font-bold m-1 p-1 text-center border-b-[1px] border-b-blue-950 ">Create Account</p>
              <p className="w-full font-semibold text-center items-center m-2">
              Sign up quickly to access personalized content, connect with the community, and enhance your user experience. Join us today!
              </p>
            </div>
            <div className=" bg-white flex flex-col justify-center items-center mx-5  shadow-md shadow-blue-500 border-2 border-slate-500 rounded-xl p-1 m-3">
              <div className="m-3 p-3 flex justify-center items-center scale-105 w-auto shadow-md shadow-blue-500 border-2 border-slate-500 rounded-full hover:scale-110"> <MdFindInPage /></div>
             
              <p className=" font-bold m-1 p-1 text-center border-b-[1px] border-b-blue-950 ">Find a Job/Post a Job</p>
              <p className="w-full font-semibold text-center m-2">
              Easily discover new career opportunities or find top talent for your company. Explore job listings or post vacancies to connect with qualified candidates today!
              </p>
            </div>
            <div className=" bg-white flex flex-col justify-center items-center mx-5  shadow-md shadow-blue-500 border-2 border-slate-500 rounded-xl p-1 m-3">
              <div className="m-3 p-3 flex justify-center items-center scale-105 w-auto shadow-md shadow-blue-500 border-2 border-slate-500 rounded-full hover:scale-110"><IoMdSend /></div>
              <p className=" font-bold m-1 p-1 text-center border-b-[1px] border-b-blue-950 ">Apply For Job/Recruit Suitable Candidates</p>
              <p className="w-full font-semibold text-center m-2">
              Apply to exciting job openings or recruit ideal candidates for your team effortlessly. Start your journey to finding the perfect fit or building your dream team now!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
