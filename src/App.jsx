import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import Donar from "./component/Donar.jsx";
import DonorDetails from "./component/DonorDetails.jsx";
import Login from "./component/Login.jsx";
import Registration from "./component/Registration.jsx";
import Sidebar from "./component/Sidebar.jsx";
import Information from "./component/Information.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import DonorRegistration from "./component/DonorRegistration.jsx";
import DonorProfile from "./component/DonorProfile.jsx";
import BankForm from "./admin/BankForm.jsx";
import BloodBanks from "./admin/BloodBanks.jsx";
import BloodBanksList from "./component/BloodBanksList.jsx";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const role = localStorage.getItem("role"); // "ADMIN" or "USER"
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      {/* Navbar */}
       <div className="fixed-top w-100">
        <Navbar />
      </div>
      <br /><br /><br />

      <div style={{ display: "flex" }}>
        {/* Sidebar only for users */}
        {isLoggedIn && role !== "ADMIN" && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}

        {/* Main content */}
        <div
          className="flex-grow-1 p-3"
          style={{
            marginLeft: isLoggedIn && role !== "ADMIN" ? (isSidebarOpen ? "220px" : "60px") : "0px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/info" element={<Information />} />
            <Route path="/bloodbanks" element={<BloodBanksList />} />

            {/* User Routes */}
            {isLoggedIn && role !== "ADMIN" && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/blood_donar" element={<Donar />} />
                <Route path="/donor/:id" element={<DonorDetails />} />
                <Route path="/donor-registration" element={<DonorRegistration />} />
                <Route path="/donor/profile" element={<DonorProfile />} />
                <Route path="/info" element={<Information />} />
              </>
            )}

            {/* Admin Routes */}
            {isLoggedIn && role === "ADMIN" && (
              <>
                <Route path="/" element={<AdminPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/bankform" element={<BankForm />} />
                <Route path="/admin/bloodbanks" element={<BloodBanks />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
