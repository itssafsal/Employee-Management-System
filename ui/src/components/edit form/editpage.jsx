import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Editpage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    gender: "",
    course: [],
    file: null,
  });

  useEffect(() => {
    if (location.state) {
      setEmployeeData(location.state);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setEmployeeData((prevData) => {
        const courses = prevData.course.includes(value)
          ? prevData.course.filter((course) => course !== value)
          : [...prevData.course, value];
        return { ...prevData, course: courses };
      });
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRadioChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(employeeData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, value.join(',')); // Append array values as comma-separated string
      } else {
        formData.append(key, value);
      }
    });

    // Log formData contents
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.put(`/update/${employeeData._id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Set the token in the request header
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        
        navigate('/emplist');
      }
    } catch (error) {
      console.error('Error updating employee data:', error.response ? error.response.data : error);
      alert('Failed to update employee data: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="create">
      <div className="form-card">
        <h5 className="add-produch-head">Edit Employee</h5>
        <div className="create-form">
          <form onSubmit={handleSubmit}>
            <div className="create-input-box">
              <label className="col-sm-1 form-label">Name</label>
              <input
                type="text"
                name="name"
                className="cf-ib form-control"
                value={employeeData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="create-input-box">
              <label className="col-sm-1">Email</label>
              <input
                type="email"
                name="email"
                className="cf-ib form-control"
                value={employeeData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="create-input-box">
              <label className="col-sm-1">Phone</label>
              <input
                type="number"
                name="phone"
                className="cf-ib form-control"
                value={employeeData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="create-input-box">
              <label className="col-sm-1">Designation</label>
              <select
                name="designation"
                className="cf-ib form-control"
                value={employeeData.designation}
                onChange={handleChange}
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
                type="radio"
                name="gender"
                value="Male"
                checked={employeeData.gender === "Male"}
                onChange={handleRadioChange}
              />
              <label style={{ float: "none" }} className="col-sm-1">Male</label>

              <input
                type="radio"
                name="gender"
                value="Female"
                checked={employeeData.gender === "Female"}
                onChange={handleRadioChange}
              />
              <label style={{ float: "none" }} className="col-sm-1">Female</label>
            </div>

            <div className="create-input-box">
              <label className="col-sm-1">Course</label>
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={employeeData.course.includes("BCA")}
                onChange={handleChange}
              />
              <label style={{ float: "none" }} className="col-sm-1">BCA</label>

              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={employeeData.course.includes("MCA")}
                onChange={handleChange}
              />
              <label style={{ float: "none" }} className="col-sm-1">MCA</label>

              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={employeeData.course.includes("BSC")}
                onChange={handleChange}
              />
              <label style={{ float: "none" }} className="col-sm-1">BSC</label>
            </div>

            <div className="create-input-box">
              <label className="col-sm-1 form-label">Image</label>
              <input
                className="cf-ib form-control"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="ps-5">
              <button type="submit" className="btn btn-outline-success opacity-75">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editpage;


