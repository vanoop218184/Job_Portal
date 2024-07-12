import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className=" m-5 mb-10 flex flex-col justify-center ">
        <div className="w-full mb-12 flex  justify-center">
          <form className=" mb-1 w-1/2 border-[1px] border-slate-300 rounded-lg p-3 m-3 bg-slate-50 shadow-md shadow-slate-400" onSubmit={handleJobPost}>
           <div className="flex justify-center">
            <h3 className="p-2 font-bold text-3xl m-2 font-serif bg-blue-950 text-slate-50 rounded-md ">POST NEW JOB</h3></div>
          
            <div className="flex justify-between">
              <input
              className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job Title"
              />
              <select
              className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <div className="flex justify-between">
              <input
               className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />
              <input
               className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
             className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <div className="flex justify-between">
              <select
              className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div className="flex flex-col">
              <div className="flex flex-col">
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <div className="flex flex-col"><input
                  className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                   type="number"
                   placeholder="Enter Fixed Salary"
                   value={fixedSalary}
                   onChange={(e) => setFixedSalary(e.target.value)}
                 /></div>
                  
                ) : (
                  <div className="flex flex-col">
                    <input
                     className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                     className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
              </div>
             
            </div>
            <textarea
            className=" my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
            <div className="flex justify-center">
            <button className=" shadow-md shadow-blue-950 m-3 p-3 rounded-md border-[1px] border-blue-950 hover:text-slate-50 hover:bg-blue-950 flex flex-col bg-slate-50 text-blue-950" type="submit">Create Job</button>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
