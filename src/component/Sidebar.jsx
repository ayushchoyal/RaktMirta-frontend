import React from "react";
import { Nav } from "react-bootstrap";
import { FaHome, FaHandHoldingHeart, FaUserFriends, FaHospital, FaInfoCircle, FaBars, FaUserPlus } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className="bg-danger text-white p-3 vh-100 position-fixed transition-all"
      style={{ width: isOpen ? "220px" : "60px" }}
    >
      {/* Toggle Button */}
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ cursor: "pointer" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="fw-bold">{isOpen ? "RaktMitra" : "RM"}</span>
        <FaBars />
      </div>

      {/* Navigation Items */}
      <Nav className="flex-column">
        <Nav.Link href="/" className="text-white d-flex align-items-center mb-3">
          <FaHome className="me-2" />
          {isOpen && "Home"}
        </Nav.Link>

        <Nav.Link href="/blood_donar" className="text-white d-flex align-items-center mb-3">
          <FaHandHoldingHeart className="me-2" />
          {isOpen && "Donors"}
        </Nav.Link>

       

        <Nav.Link href="/patients" className="text-white d-flex align-items-center mb-3">
          <FaUserFriends className="me-2" />
          {isOpen && "Patients"}
        </Nav.Link>

        <Nav.Link href="/blood_banks" className="text-white d-flex align-items-center mb-3">
          <FaHospital className="me-2" />
          {isOpen && "Blood Banks"}
        </Nav.Link>

        <Nav.Link href="/info" className="text-white d-flex align-items-center mb-3">
          <FaInfoCircle className="me-2" />
          {isOpen && "Information"}
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
