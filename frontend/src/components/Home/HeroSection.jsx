import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import im from './profile.png'
const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="w-auto flex flex-col justify-center items-center m-5 p-5">
        <div className=" bg-slate-50 rounded-md space-x-5 w-auto flex h-2/3 justify-center m-4">
          <div className="w-1/2 flex justify-center items-center">
             <div className=" flex flex-col items-center  m-3 p-1">
            <h1 className="w-3/4 text-lg md:text-xl lg:text-3xl font-semibold text-blue-950 m-3 font-serif">"Go <span className="text-orange-400">confidently </span>in the direction of your dreams!"
            </h1>
            <h1 className=" animate-bounce pr-3 mr-3 text-sm sm:text-lg md:text-xl  font-semibold text-right w-full"> - Henry David Thoreau</h1>
            
            <p className="w-3/4 text-sm sm:text-lg md:text-lg font-semibold mt-9">
            Starting a new job can be nerve-racking, but it's also exciting. You're embarking on a new future, positioning yourself to write a fresh story on a clean slate.
            </p>
          </div></div>
          <div className="w-1/2 p-8 hidden items-center justify-center md:flex">
            <img className="rounded-3xl animate-pulse w-3/4 h-3/4 " src={im} alt="hero" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:flex justify-around w-full mt-10 pt-3">
          {details.map((element) => {
            return (
              <div className=" bg-slate-50 m-2 p-2 border-[1px] border-slate-400 rounded-md flex justify-center items-center space-x-4 shadow-lg shadow-blue-950" key={element.id}>
                <div className="text-blue-950 hover:animate-spin ">{element.icon}</div>
                <div className="">
                  <p className="font-bold">{element.title}</p>
                  <p className="font-bold">{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
