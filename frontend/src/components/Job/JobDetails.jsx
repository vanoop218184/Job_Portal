import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="flex justify-center mb-[48px]">
      <div className="w-10/12 flex flex-col items-center ">
        <h3 className=" my-10 p-2 font-bold text-3xl  font-serif bg-blue-950 text-slate-100 rounded-md ">Job Details</h3>
        <div className=" shadow-lg shadow-slate-100 rounded-md text-wrap   bg-slate-50 border-2 border-slate-200 m-3 p-3">
          <p className="  font-bold flex m-3 p-1 text-wrap ">
            Title: <span className="font-extralight mx-2 px-2 "> {job.title}</span>
          </p>
          <p className="font-bold flex m-3 p-1 text-wrap">
            Category: <span className="font-extralight mx-2 px-2 ">{job.category}</span>
          </p>
          <p className="font-bold flex m-3 p-1 text-wrap">
            Country: <span className="font-extralight mx-2 px-2 ">{job.country}</span>
          </p>
          <p className="font-bold flex m-3 p-1 text-wrap">
            City: <span className="font-extralight mx-2 px-2 ">{job.city}</span>
          </p>
          <p className="font-bold flex m-3 p-1 text-wrap">
            Location: <span className="font-extralight mx-2 px-2 ">{job.location}</span>
          </p>
          <p className="font-bold flex m-3 p-1 text-wrap">
            Description: <span className="font-extralight mx-2 px-2 ">{job.description}</span>
          </p>
          <p className="font-bold flex m-3 p-1 text-wrap">
            Job Posted On: <span className="font-extralight mx-2 px-2">{job.jobPostedOn}</span>
          </p>
          <p className="font-bold flex m-3 p-1 text-wrap">
            Salary:{" "}
            {job.fixedSalary ? (
              <span className="font-extralight mx-2 px-2">{job.fixedSalary}</span>
            ) : (
              <span className="font-extralight mx-2 px-2">
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <div className="flex justify-center"><Link className=" shadow-md shadow-blue-950 m-3 p-3 rounded-md border-[1px] border-blue-950 hover:text-slate-50 hover:bg-green-500 flex flex-col bg-slate-50 text-blue-950" to={`/application/${job._id}`}>Apply Now</Link></div>
            
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
