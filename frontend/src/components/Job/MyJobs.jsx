import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="w-full flex flex-col items-center">
       <div>
       <h1 className="p-2 font-bold text-3xl mt-3 font-serif bg-blue-950 text-slate-50 rounded-md ">Your Posted Jobs</h1>
       </div>
        <div className=" w-full flex flex-col items-center">
        {myJobs.length > 0 ? (
            <>
              <div className=" my-10 w-10/12 flex justify-center m-3 mt-0 p-3 ">
                <div className=" w-10/12 m-2 p-2  ">
                {myJobs.map((element) => (
                  <div className="my-10 bg-slate-100 border-2 border-slate-400 m-2 p-2 rounded-lg " key={element._id}>
                    <div className="flex-col flex md:flex-row w-full  rounded-md">
                      <div className=" w-full md:w-1/4 bg-slate-50 rounded-md">
                        <div>
                        <div className=" m-2 p-1 flex flex-col">
                          <span className="font-bold">Title:</span>
                          <input
                          className="text-slate-600 bg-slate-50 "
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="m-2 p-2">
                          {" "}
                          <span className="font-bold" >Country:</span>
                          <input
                          className="text-slate-600 bg-slate-50"
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="m-2 p-2">
                          <span className="font-bold">City:</span>
                          <input
                          
                          className="text-slate-600 bg-slate-50"
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="m-2 p-2">
                          <span className="font-bold">Category:</span>
                          <select
                          className="text-slate-600 bg-slate-50"
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </select>
                        </div>
                        <div className="m-2 p-2">
                          <span className="font-bold">
                            Salary:{" "}
                            {element.fixedSalary ? (
                              <input
                              className="text-slate-600 bg-slate-50"
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedSalary}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedSalary",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                className="text-slate-600 bg-slate-50"
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                className="text-slate-600 bg-slate-50"
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div className="m-2 p-2">
                          {" "}
                          <span className="font-bold">Expired:</span>
                          <select
                          className="text-slate-600 bg-slate-50"
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                        </div>
                      </div>
                      <div className="bg-slate-100 my-4 w-[2px]"></div>
                      <div className="w-full md:w-1/2 bg-slate-50 rounded-md flex flex-col justify-center">
                        <div className="flex flex-col m-3 p-3">
                          <span className="font-bold ">Description:</span>{" "}
                          <textarea
                          className="text-slate-600 bg-slate-50 p-3"
                            rows={3}
                            cols={40}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="flex flex-col m-3 p-3">
                          <span className="font-bold">Location: </span>
                          <textarea
                          className="text-slate-600 bg-slate-50 p-3"
                            value={element.location}
                            rows={5}
                            cols={40}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="bg-slate-100 my-4 w-[2px]"></div>
                    {/* Out Of Content Class */}
                    <div className="w-full md:w-1/4 bg-slate-50 rounded-md flex flex-col items-center justify-center">
                      <div className="">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className=" shadow-md shadow-blue-950 m-3 p-3 rounded-md border-[1px] border-blue-950 hover:text-slate-50 hover:bg-green-500 flex flex-col bg-slate-50 text-blue-950"
                          >
                            Update
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                       className=" shadow-md shadow-blue-950 m-3 p-3 rounded-md border-[1px] border-blue-950 hover:text-slate-50 hover:bg-red-500 flex flex-col bg-slate-50 text-blue-950"
                      >
                        Delete
                      </button>
                    </div>
                    </div>
                  </div>
                ))}
                </div>
                
              </div>
            </>
          ) : (
            <div className="h-[530px] flex justify-center items-center"> <p className="font-bold text-red-500 text-xl animate-bounce ">
            You've not posted any job or may be you deleted all of your jobs!
          </p></div>
           
          )}
        </div>
         
        </div>
      </div>
    </>
  );
};

export default MyJobs;
