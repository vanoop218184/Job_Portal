import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="flex  justify-center m-3 p-3">
      <div className="w-10/12 flex  flex-col items-center p-3 m-3">
        <h1 className="p-2 font-bold text-lg md:text-2xl m-2 font-serif bg-blue-950 text-slate-50 rounded-md">ALL AVAILABLE JOBS</h1>
        <div className=" border-2  border-slate-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className=" m-5 p-5 rounded-md bg-slate-50 shadow-md shadow-slate-300 border-2 border-slate-100" key={element._id}>
                  <p className=" text-sm sm:text-base md:text-lg font-bold text-center m-2">{element.title}</p>
                  <p className="text-sm sm:text-base md:text-lg font-semilight text-center">{element.category}</p>
                  <p className="text-sm sm:text-base md:text-lg font-semilight text-center">{element.country}</p>
                  <Link className=" text-sm sm:text-base md:text-lg font-bold text-center shadow-md shadow-blue-950 m-3 p-3 rounded-md border-[1px] border-blue-950 hover:text-slate-50 hover:bg-green-500 flex flex-col bg-slate-50 text-blue-950" to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
