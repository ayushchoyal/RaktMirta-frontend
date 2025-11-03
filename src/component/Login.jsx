import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login Response:", data);

        if (data.success) {
          // store user data
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", data.user.role);

          setMessage("✅ Login successful! ");
          setLoading(false);

          // Wait 0.5 seconds, then reload to make App.js re-read localStorage
          setTimeout(() => {
            if (data.user.role === "ADMIN") {
              window.location.href = "/admin";
            } else {
              window.location.href = "/user/home";
            }
          }, 500);
        } else {
          setLoading(false);
          setMessage(data.message || "❌ Invalid email or password");
        }
      })
      .catch((err) => {
        console.error("Login Error:", err);
        setMessage("⚠️ Server error, please try again later.");
        setLoading(false);
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="card shadow p-4 login-card" style={{ width: "350px" }}>
        <h2 className="text-center text-danger fw-bold mb-3">RaktMitra Login</h2>
        <p className="text-center text-muted">वो दोस्ती जो ज़िंदगी बचाए</p>

        {message && (
          <p className="text-center mt-2" style={{ color: message.includes("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}

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
          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
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
