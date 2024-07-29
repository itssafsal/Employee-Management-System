import React, { useState } from "react";
import "./createpage.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Createpage() {
  // State variables for form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("HR"); // Default designation
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]); // Changed to array for multiple selections
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("designation", designation);
    formData.append("gender", gender);
    formData.append("course", course.join(",")); // Join array to send as a string
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const data = await axios.post("/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token in the request header
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);
      if (data.data.success) {
        console.log("ok");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form");
    }
  };

  // Function to handle course checkbox changes
  const handleCourseChange = (e) => {
    const { value } = e.target;
    setCourse(
      (prevCourses) =>
        prevCourses.includes(value)
          ? prevCourses.filter((course) => course !== value) // Remove if already selected
          : [...prevCourses, value] // Add if not selected
    );
  };

  return (
    <div className="create">
      <div className="form-card">
        <h5>Add Employee</h5>
        <div className="create-form">
          <form onSubmit={handleSubmit}>
            <div className="create-input-box">
              <label className="col-sm-1 form-label">Name</label>
              <input
                name="name"
                id="name"
                type="text"
                className="cf-ib form-control text-white"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="create-input-box">
              <label className="col-sm-1 ">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                className="cf-ib form-control text-white"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="create-input-box">
              <label className="col-sm-1">Phone</label>
              <input
                name="phone"
                id="number"
                type="number"
                className="cf-ib form-control text-white"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="create-input-box">
              <label className="col-sm-1">Designation</label>
              <select
                className="cf-ib form-control"
                style={{
                  background: "transparent",
                  color: "#70737a",
                  border: "solid 1px #70737a",
                }}
                name="designation"
                id="designation"
                onChange={(e) => setDesignation(e.target.value)}
                required
              >
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <div className="create-input-box">
              <label className="col-sm-1">Gender</label>

              <input
                onClick={(e) => setGender(e.target.value)}
                type="radio"
                name="gender"
                value={"Male"}
                id="male"
              />
              <label style={{ float: "none" }} className="col-sm-1">
                Male
              </label>

              <input
                onClick={(e) => setGender(e.target.value)}
                type="radio"
                name="gender"
                value={"Female"}
                id="female"
              />
              <label style={{ float: "none" }} htmlFor="female">
                Female
              </label>
            </div>

            <div className="create-input-box">
              <label className="col-sm-1">Course</label>

              <input
                onChange={handleCourseChange}
                type="checkbox"
                name="course"
                id="BCA"
                value={"BCA"}
              />
              <label style={{ float: "none" }} className="col-sm-1">
                BCA
              </label>

              <input
                onChange={handleCourseChange}
                type="checkbox"
                name="course"
                id="MCA"
                value={"MCA"}
              />
              <label style={{ float: "none" }} className="col-sm-1">
                MCA
              </label>

              <input
                onChange={handleCourseChange}
                type="checkbox"
                name="course"
                id="BSC"
                value={"BSC"}
              />
              <label style={{ float: "none" }} className="col-sm-1">
                BSC
              </label>
            </div>

            <div className="create-input-box">
              <label className="col-sm-1 form-label">Image</label>
              <input
                className="cf-ib form-control text-white"
                type="file"
                accept="image/*"
                name="image"
                id=""
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="ps-5">
              <button type="submit" className="btn btn-outline-info opacity-75">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Createpage;
