import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    searchType: "Donor",
    bloodGroup: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.bloodGroup.trim()) {
      alert("Please enter a blood group to search.");
      return;
    }
    navigate(
  `/search?type=${formData.searchType}&bloodGroup=${encodeURIComponent(formData.bloodGroup.trim())}`
);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm"
      style={{
        background: "linear-gradient(90deg, #f5f7fa, #c3cfe2)",
      }}
    >
      <div className="container-fluid px-3">
        {/* Brand */}
        <div className="d-flex flex-column">
          <p className="navbar-brand fw-bold text-danger fs-4 mb-0 ml-2">
            RaktMitra
          </p>
          <small className="text-danger" style={{ marginTop: "-5px" }}>
            वो दोस्ती जो ज़िंदगी बचाए
          </small>
        </div>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-3 mt-lg-0">
            {/* Search Form */}
            <form
              className="d-flex align-items-center w-100 w-lg-auto"
              onSubmit={handleSubmit}
            >
              <select
                className="form-select form-select-sm me-2"
                style={{ width: "110px" }}
                name="searchType"
                value={formData.searchType}
                onChange={handleChange}
              >
                <option value="Donor">Donor</option>
                <option value="Patient">Patient</option>
              </select>

              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Enter blood group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              />

              <button
                className="btn btn-outline-danger btn-sm ms-2"
                type="submit"
              >
                <FaSearch />
              </button>
            </form>

            {/* User / Login */}
            {user ? (
              <div className="dropdown ms-lg-3 mt-2 mt-lg-0">
                <button
                  className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    width: "40px",
                    height: "40px",
                    fontWeight: "bold",
                  }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userMenu"
                >
                  <li>
                    <span className="dropdown-item-text fw-semibold">
                      {user.name}
                    </span>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <a
                className="btn btn-outline-danger btn-sm ms-lg-3 mt-2 mt-lg-0"
                href="/login"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
