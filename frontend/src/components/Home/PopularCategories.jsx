import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center m-5">
      <h3 className="font-bold text-2xl m-3 p-3 border-b-2 border-b-blue-950">POPULAR CATEGORIES</h3>
      <div className=" rounded-2xl bg-slate-50 m-3 p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-x-6">
        {categories.map((element) => {
          return (
            <div className=" flex flex-col items-center  shadow-md shadow-blue-600 bg-slate-50 border-[1px] border-slate-400 m-3 p-3 rounded-lg" key={element.id}>
              <div className="m-3 p-3 flex justify-center items-center scale-105 w-auto shadow-md shadow-blue-500 border-2 border-slate-500 rounded-full hover:scale-110">{element.icon}</div>
              <div className="font-bold text-center">
                <p >{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
