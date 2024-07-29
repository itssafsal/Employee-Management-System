import React, { useEffect, useState } from "react";
import "./listpage.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Listpage() {
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  const getFetchData = async () => {
    const token = localStorage.getItem("token"); 
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };

    try {
      const data = await axios.get("/", config); 
      console.log(data);
      if (data.data.success) {
        setDataList(data.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching employee data. Please check your login status.");
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };

    try {
      const data = await axios.delete("/delete/" + id, config);
      if (data.data.success) {
        getFetchData();
        alert(data.data.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("There was an error deleting the employee");
    }
  };

  return (
    <div className="listbody">
      <div className="list-card">
        <h5>Employee List</h5>
        <button
          className="btn btn-outline-success"
          onClick={() => navigate("/empcreate")}
          style={{ marginLeft: "10vh" }}
        >
          Create
        </button>
        <button className="search-btn btn btn-primary opacity-75" type="submit">
          Search
        </button>
        <Form.Control className="search-box" type="text" placeholder="Search" />
        <table className="container">
          <thead>
            <tr>
              <th className="text-secondary">Id</th>
              <th className="text-secondary">Image</th>
              <th className="text-secondary">Name</th>
              <th className="text-secondary">Email</th>
              <th className="text-secondary">Mobile No</th>
              <th className="text-secondary">Designation</th>
              <th className="text-secondary">Gender</th>
              <th className="text-secondary">Course</th>
              <th className="text-secondary">Create date</th>
              <th className="text-secondary">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList[0] ? (
              dataList.map((data) => {
                return (
                  <tr>
                    <th className="text-secondary" scope="row">
                      {data.phone}
                    </th>
                    <td className="text-secondary">
                      <img
                        style={{ height: "50px" }}
                        src={`empImages/${data.image}`}
                        alt="pic"
                      />
                    </td>
                    <td className="text-secondary">{data.name}</td>
                    <td className="text-secondary">{data.email}</td>
                    <td className="text-secondary">{data.phone}</td>
                    <td className="text-secondary">{data.designation}</td>
                    <td className="text-secondary">{data.gender}</td>
                    <td className="text-secondary">{data.course}</td>
                    <td className="text-secondary">{data.createdAt}</td>
                    <td className="text-secondary">
                      <button
                        className="btn btn-edit btn-outline-info px-3"
                        onClick={() => navigate("/empedit", { state: data })}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-secondary">
                      <button
                        onClick={() => handleDelete(data._id)}
                        className="btn btn-dlt btn-outline-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p className="text-center text-danger mt-5">No Employee found!</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listpage;
