import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className=" w-full text-center bg-blue-950 flex p-3 pt-1 flex-col">
      <div className="font-bold text-slate-50 text-lg m-5">&copy; All Rights Reserved By <span className="text-orange-400">Anoop Verma</span>.</div>
      <div className="flex justify-around pb-6 ">
        <Link className="animate-bounce text-slate-50" to={"https://www.facebook.com/profile.php?id=100051747251716"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link className="animate-bounce text-slate-50" to={"https://www.linkedin.com/in/%F0%9D%90%80%F0%9D%90%A7%F0%9D%90%A8%F0%9D%90%A8%F0%9D%90%A9-%F0%9D%98%83%F0%9D%97%B2%F0%9D%97%BF%F0%9D%97%BA%F0%9D%97%AE-352b47241/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link className="animate-bounce text-slate-50" to={"https://www.instagram.com/anoop_8745/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
