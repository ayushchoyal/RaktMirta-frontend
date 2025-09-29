import React, { useState } from "react";
<<<<<<< HEAD
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> d525fcdd36cd8a7323e9b74a1c01810550824fb8
import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import Donar from "./component/Donar.jsx";
import DonorDetails from "./component/DonorDetails.jsx";
import Login from "./component/Login.jsx";
import Registration from "./component/Registration.jsx";
<<<<<<< HEAD
import Sidebar from "./component/Sidebar.jsx";
import Information from "./component/Information.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const role = localStorage.getItem("role"); // "ADMIN" or "USER"
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      {/* Navbar */}
=======
import DonorRegistration from "./component/DonorRegistration.jsx";
import Sidebar from "./component/Sidebar.jsx";
import Information from "./component/Information.jsx";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      {/* Navbar fixed on top */}
>>>>>>> d525fcdd36cd8a7323e9b74a1c01810550824fb8
      <div className="fixed-top">
        <Navbar />
      </div>

      {/* Sidebar + Main Content */}
      <div style={{ display: "flex", marginTop: "80px" }}>
<<<<<<< HEAD
        {/* Show sidebar only if NOT admin */}
        {role !== "ADMIN" && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}

        <div
          className="flex-grow-1 p-3"
          style={{
            marginLeft:
              role !== "ADMIN" ? (isSidebarOpen ? "220px" : "60px") : "0px",
=======
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div
          className="flex-grow-1 p-3"
          style={{
            marginLeft: isSidebarOpen ? "220px" : "60px", // <-- KEY FIX
>>>>>>> d525fcdd36cd8a7323e9b74a1c01810550824fb8
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
<<<<<<< HEAD
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />

            {/* User Routes */}
            {role !== "ADMIN" && isLoggedIn && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/blood_donar" element={<Donar />} />
                <Route path="/donor/:id" element={<DonorDetails />} />
                <Route path="/info" element={<Information />} />
              </>
            )}

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute
                  isAllowed={isLoggedIn && role === "ADMIN"}
                  redirectTo="/login"
                >
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect admin from "/" to "/admin" */}
            {role === "ADMIN" && (
              <Route path="/" element={<Navigate to="/admin" replace />} />
            )}

            {/* If not logged in → go to login */}
            {!isLoggedIn && (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
=======
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/blood_donar" element={<Donar />} />
            <Route path="/donor/:id" element={<DonorDetails />} />
            <Route path="/donor-registration" element={<DonorRegistration />} />
            <Route path="/info" element={<Information />} />
>>>>>>> d525fcdd36cd8a7323e9b74a1c01810550824fb8
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
