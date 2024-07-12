import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Banglore ,India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Hyderabad ,India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Noida ,India",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];
  return (
    <div className=" w-auto flex-col justify-center items-center m-5 hidden md:flex">
      <div className=" flex flex-col items-centre  justify-center">
        <div className=" flex justify-center"> <h3 className="font-bold text-2xl m-3 p-3 border-b-2 border-b-blue-950" >TOP COMPANIES</h3></div>
       
        <div className="flex justify-center rounded-2xl bg-slate-50 m-3 p-3 ">
          {companies.map((element) => {
            return (
              <div className=" flex flex-col items-center space-y-2 shadow-md shadow-blue-600 bg-slate-50 border-[1px] border-slate-400 m-3 p-3 rounded-lg" key={element.id}>
                <div className="flex flex-col items-center">
                  <div className="m-3 p-3 flex justify-center items-center scale-105 w-auto shadow-md shadow-blue-500 border-2 border-slate-500 rounded-full hover:scale-110">{element.icon}</div>
                  <div className="font-bold text-center">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
