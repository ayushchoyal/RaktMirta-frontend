<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", data.user.role);
          if (data.user.role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          setMessage(data.message || "Login failed");
        }
      })
      .catch((err) => setMessage(err.message));
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh" }}
    >
      {" "}
      <div className="card shadow p-4 login-card">
        {" "}
        <h2 className="text-center text-danger fw-bold mb-3">
          RaktMitra Login
        </h2>{" "}
        <p className="text-center text-muted">वो दोस्ती जो ज़िंदगी बचाए</p>{" "}
        {message && <p className="text-center text-danger mt-2">{message}</p>}{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Email"
            required
          />{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Password"
            required
          />{" "}
          <button type="submit" className="btn btn-danger w-100">
            {" "}
            Login{" "}
          </button>{" "}
        </form>{" "}
        <div className="text-center mt-3">
          {" "}
          <small>
            {" "}
            Don’t have an account?{" "}
            <a href="/register" className="text-danger fw-bold">
              {" "}
              Register{" "}
            </a>{" "}
          </small>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Login;
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", "true");
          navigate("/"); // redirect
        } else {
          setMessage(data.message);
        }
      })
      .catch((err) => setMessage(err.message));
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "50vh" }}
    >
      <div className="card shadow p-4 login-card">
        <h2 className="text-center text-danger fw-bold mb-3">
          RaktMitra Login
        </h2>
        <p className="text-center text-muted">वो दोस्ती जो ज़िंदगी बचाए</p>
         {message && <p className="text-center mt-3">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control mb-3"
            placeholder="Password"
            required
          />
          <button type="submit" className="btn btn-danger w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <a href="/register" className="text-danger fw-bold">
              Register
            </a>
          </small>
        </div>
       
      </div>
    </div>
  );
};

export default Login;
>>>>>>> d525fcdd36cd8a7323e9b74a1c01810550824fb8
