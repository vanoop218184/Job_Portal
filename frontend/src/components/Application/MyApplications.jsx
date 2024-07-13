import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("https://job-portal-xtav.onrender.com/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("https://job-portal-xtav.onrender.com/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`https://job-portal-xtav.onrender.com/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="flex flex-col md:flex-row items-center md:justify-center m-6">
      {user && user.role === "Job Seeker" ? (
        <div className="w-10/12 ">
          <div className="flex flex-col  items-center" ><h1 className="p-2 font-bold text-3xl m-2 text-center font-serif bg-blue-950 text-slate-50 rounded-md">My Applications</h1></div>
          
          {applications.length <= 0 ? (
            <div className="h-60 w-full flex justify-center items-center"><h4 className="text-xl text-red-500">No Applications Found</h4></div>
          ) : (
            applications.map((element) => (
              <div className=" w-full flex flex-col md:justify-center items-center md:flex-row">  <JobSeekerCard
              element={element}
              key={element._id}
              deleteApplication={deleteApplication}
              openModal={openModal}
            /></div>
            
            ))
          )}
        </div>
      ) : (
        <div className="w-10/12">
          <div className="flex flex-col  items-center" ><h1 className="p-2 font-bold text-3xl m-2 text-center font-serif bg-blue-950 text-slate-50 rounded-md">Applications From Job Seekers</h1></div>
          {applications.length <= 0 ? (
           <div className="h-60 w-full flex justify-center items-center"><h4 className="text-xl text-red-500">No Applications Found</h4></div>
          ) : (
            applications.map((element) => (
              <div className=" w-full flex flex-col md:justify-center items-center md:flex-row"><EmployerCard
              element={element}
              key={element._id}
              openModal={openModal}
            /></div>
            
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="flex flex-col items-center md:justify-center md:flex-row m-4  p-4 border-2 border-gray-200 rounded-md shadow-md">
      <div className="w-full md:w-1/3 flex p-2 ">
        <div className="flex flex-col justify-center ml-5 m-3 p-1 w-full  mb-2">
          <p><span className="font-bold">Name:</span> {element.name}</p>
          <p><span className="font-bold">Email:</span> {element.email}</p>
          <p><span className="font-bold">Phone:</span> {element.phone}</p>
          <p><span className="font-bold">Address:</span> {element.address}</p>
          <p><span className="font-bold">CoverLetter:</span> {element.coverLetter}</p>
        </div>
      </div>
      <div className="w-full md:w-1/3 flex-1 p-2 flex justify-center items-center">
        <img
          src={element.resume.url}
          alt="resume"
          className="w-3/4 h-full object-contain cursor-pointer"
        />
      </div>
      <div className="w-full md:w-1/3 flex-1 p-2 flex flex-col justify-center items-center">
        <button
          className="shadow-md shadow-blue-950 text-center m-2 p-3 rounded-md border-[1px] border-blue-950 font-bold hover:bg-red-500 bg-blue-950 text-slate-50"
          onClick={() => deleteApplication(element._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="flex flex-col items-center md:justify-center md:flex-row m-4  p-4 border-2 border-gray-200 rounded-md shadow-md">
      <div className="w-full md:w-1/2 flex-1 p-2 flex justify-center items-center">
        <div className="mb-2">
          <p><span className="font-bold">Name:</span> {element.name}</p>
          <p><span className="font-bold">Email:</span> {element.email}</p>
          <p><span className="font-bold">Phone:</span> {element.phone}</p>
          <p><span className="font-bold">Address:</span> {element.address}</p>
          <p><span className="font-bold">CoverLetter:</span> {element.coverLetter}</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex-1 p-2 flex justify-center items-center">
        <img
          src={element.resume.url}
          alt="resume"
          className="w-48 h-64 object-contain cursor-pointer"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};
