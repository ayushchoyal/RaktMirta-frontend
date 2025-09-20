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


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      {/* Navbar fixed on top */}
      <div className="fixed-top">
        <Navbar />
      </div>

      {/* Sidebar + Main Content */}
      <div style={{ display: "flex", marginTop: "80px" }}>
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div
          className="flex-grow-1 p-3"
          style={{
            marginLeft: isSidebarOpen ? "220px" : "60px", // <-- KEY FIX
            transition: "margin-left 0.3s ease",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/blood_donar" element={<Donar />} />
            <Route path="/donor/:id" element={<DonorDetails />} />
            <Route path="/info" element={<Information />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
