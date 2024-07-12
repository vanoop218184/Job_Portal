import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="flex justify-center m-6">
      <div className="w-10/12 justify-center">
        <div className="flex flex-col items-center">
          <h3 className="p-2 font-bold text-3xl m-2 font-serif bg-blue-950 text-slate-50 rounded-md">
            Application Form
          </h3>
        </div>
        <div className="flex justify-center space-x-4">
          <form
            className="w-1/2 m-2 p-3 border-2 border-slate-200 rounded-md shadow-md shadow-slate-400"
            onSubmit={handleApplication}
          >
            <div className="m-2 p-2">
              <div className="m-2 p-1 flex flex-col">
                <label className="m-1 p-1 text-lg font-bold">Name</label>
                <input
                  className="my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="m-2 p-1 flex flex-col">
                <label className="m-1 p-1 text-lg font-bold">Email Address</label>
                <input
                  className="my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="m-2 p-1 flex flex-col">
                <label className="m-1 p-1 text-lg font-bold">Phone Number</label>
                <input
                  className="my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                  type="number"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="m-2 p-1 flex flex-col">
                <label className="m-1 p-1 text-lg font-bold">Address</label>
                <input
                  className="my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                  type="text"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="m-2 p-1 flex flex-col">
                <label className="m-1 p-1 text-lg font-bold">Cover Letter</label>
                <textarea
                  className="my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                  placeholder="Cover Letter..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>
              <div className="m-2 p-1 flex flex-col">
                <label className="m-1 p-1 text-lg font-bold">Select Resume</label>
                <input
                  className="my-2 p-2 w-full border-[1px] border-slate-200 rounded-md"
                  type="file"
                  accept=".pdf, .jpg, .png"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className="shadow-md shadow-blue-950 text-center m-2 p-3 rounded-md border-[1px] border-blue-950 hover:text-blue-950 hover:bg-slate-50 flex flex-col bg-blue-950 text-slate-50"
                  type="submit"
                >
                  Send Application
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Application;
