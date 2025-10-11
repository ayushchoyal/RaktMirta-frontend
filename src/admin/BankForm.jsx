import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BankForm = ({ onSubmit }) => {
  const token = localStorage.getItem("token");
  const [bank, setBank] = useState({
    bankName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    imageUrl: "",
  });

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBank({ ...bank, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include JWT here
        },
        body: JSON.stringify(bank),
      });

      if (response.ok) {
        alert("✅ Bank added successfully!");
        setBank({
          bankName: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          imageUrl: "",
        });
        if (onSubmit) onSubmit();
      } else {
        alert("❌ Failed to add bank!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Something went wrong while adding the bank.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h3 className="text-center mb-4 text-primary">
          Bank Registration Form
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Bank Name</label>
            <input
              type="text"
              className="form-control"
              name="bankName"
              value={bank.bankName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={bank.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={bank.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={bank.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={bank.pincode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankForm;
