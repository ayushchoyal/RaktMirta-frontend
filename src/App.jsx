import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./component/Navbar.jsx";
import Home from "./component/Home.jsx";
import Donor from "./component/Donor.jsx";
import DonorDetails from "./component/DonorDetails.jsx";
import Login from "./component/Login.jsx";
import Registration from "./component/Registration.jsx";
import Sidebar from "./component/Sidebar.jsx";
import Information from "./component/Information.jsx";
import AdminPage from "./admin/AdminPage.jsx";
import DonorRegistration from "./component/DonorRegistration.jsx";
import DonorProfile from "./component/DonorProfile.jsx";
import BankForm from "./admin/BankForm.jsx";
import BloodBanks from "./admin/BloodBanks.jsx";
import BloodBanksList from "./component/BloodBanksList.jsx";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const role = localStorage.getItem("role"); // "ADMIN" or "USER"
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Sidebar shows only for users or guests
  const showSidebar = !isLoggedIn || role === "USER";

  return (
    <Router>
      {/* Navbar */}
      <div className="fixed-top w-100">
        <Navbar />
      </div>

      {/* Space for fixed navbar */}
      <br />
      <br />
      <br />

      <div style={{ display: "flex" }}>
        {/* Sidebar for guests and users */}
        {showSidebar && (
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        )}

        {/* Main content area */}
        <div
          className="flex-grow-1 p-3"
          style={{
            marginLeft: showSidebar
              ? isSidebarOpen
                ? "220px"
                : "60px"
              : "0px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            {isLoggedIn && role === "ADMIN" && (
              <>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/bankform" element={<BankForm />} />
                <Route path="/admin/bloodbank" element={<BloodBanks />} />
                {/* Optional: redirect / to /admin for admins */}
                <Route path="/" element={<Navigate to="/admin" replace />} />
              </>
            )}

            {/* 🌍 Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/info" element={<Information />} />
            <Route path="/bloodbanks" element={<BloodBanksList />} />

            {/* 👤 User Pages */}
            <Route
              path="/blood_donor"
              element={
                isLoggedIn && role === "USER" ? (
                  <Donor />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/donor/:id"
              element={
                isLoggedIn && role === "USER" ? (
                  <DonorDetails />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/donor-registration"
              element={
                isLoggedIn && role === "USER" ? (
                  <DonorRegistration />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/donor/profile"
              element={
                isLoggedIn && role === "USER" ? (
                  <DonorProfile />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

           

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
