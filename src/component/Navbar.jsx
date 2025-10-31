import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{ background: "linear-gradient(90deg, #f5f7fa, #c3cfe2)" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Brand */}
        <div className="d-flex flex-column">
          <p className="navbar-brand fw-bold text-danger fs-4 mb-0">
              RaktMitra
          </p>
          <small
            className="text-danger"
            style={{ marginTop: "-5px", marginLeft: "-10px" }}
          >
            वो दोस्ती जो ज़िंदगी बचाए
          </small>
        </div>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto d-flex align-items-center gap-3">
            {/* Search */}
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search..."
              />
              <button className="btn btn-light ms-2" type="submit">
                <FaSearch />
              </button>
            </form>

            {/* User/Login */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-danger rounded-circle"
                  type="button"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ width: "40px", height: "40px", fontWeight: "bold" }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text">
                      <span className="user">{user.name}</span>
                    </span>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <a className="btn btn-light ms-2" href="/login">
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
