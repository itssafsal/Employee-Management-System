import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Dashboard from "./pages/dashboard";
import CreateEmp from "./pages/createEmp";
import EditEmp from "./pages/editEmp";
import Login from "./pages/login";
import EmpList from "./pages/empList";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emplist"
          element={
            <ProtectedRoute>
              <EmpList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/empedit"
          element={
            <ProtectedRoute>
              <EditEmp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/empcreate"
          element={
            <ProtectedRoute>
              <CreateEmp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
