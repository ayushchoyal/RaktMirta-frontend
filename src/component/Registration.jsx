<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Password validation before API call
    if (formData.password.length < 8 || formData.password.length > 12) {
      setMessage(" Password must be between 8 and 12 characters.");
      return;
    }

    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) return res.text().then((text) => Promise.reject(text));
        return res.json();
      })
      .then((data) => {
        setMessage(" Registration successful!");
        setFormData({ username: "", email: "", password: "", phone: "" });
        navigate("/login")
      })
      .catch((err) => {
        setMessage(" Error: " + err);
      });
  };

  return (
    <div className="container">
      <div className="card shadow p-4 rounded-3 w-50 mx-auto">
        <h2 className="text-center mb-4 text-danger fw-bold">
          RaktMitra Registration
        </h2>
        <p className="text-center text-muted">
          वो दोस्ती जो ज़िंदगी बचाए 
        </p>

        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            
            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              maxLength={12}
            />
            <small className="text-muted">
              Password must be 8–12 characters long.
            </small>
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Register
          </button>
        </form>
      </div>
      <div className="text-center mt-3">
        <small>
          Already have an account?{" "}
          <a href="/login" className="text-danger fw-bold">
            Login
          </a>
        </small>
      </div>
    </div>
  );
};

export default Registration;
=======
import React, { useState } from "react";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Password validation before API call
    if (formData.password.length < 8 || formData.password.length > 12) {
      setMessage(" Password must be between 8 and 12 characters.");
      return;
    }

    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) return res.text().then((text) => Promise.reject(text));
        return res.json();
      })
      .then((data) => {
        setMessage(" Registration successful!");
        setFormData({ username: "", email: "", password: "", phone: "" });
      })
      .catch((err) => {
        setMessage(" Error: " + err);
      });
  };

  return (
    <div className="container">
      <div className="card shadow p-4 rounded-3 w-50 mx-auto">
        <h2 className="text-center mb-4 text-danger fw-bold">
          RaktMitra Registration
        </h2>
        <p className="text-center text-muted">
          वो दोस्ती जो ज़िंदगी बचाए 
        </p>

        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            
            <input
              type="tel"
              className="form-control"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">

            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              maxLength={12}
            />
            <small className="text-muted">
              Password must be 8–12 characters long.
            </small>
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Register
          </button>
        </form>
      </div>
      <div className="text-center mt-3">
        <small>
          Already have an account?{" "}
          <a href="/login" className="text-danger fw-bold">
            Login
          </a>
        </small>
      </div>
    </div>
  );
};

export default Registration;
>>>>>>> d525fcdd36cd8a7323e9b74a1c01810550824fb8
