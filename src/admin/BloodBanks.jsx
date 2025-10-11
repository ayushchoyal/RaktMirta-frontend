
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BloodBanks = () => {
  const [banks, setBanks] = useState([]);

  // Fetch all banks
  const fetchBanks = async () => {
    try {
      const token = localStorage.getItem("token");    
      const response = await fetch("http://localhost:8080/admin/banks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include JWT here
        },
      });
 
      if (response.ok) {
        const data = await response.json();
        setBanks(data);
      } else {
        alert("Failed to fetch banks!");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching banks!");
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  // Delete bank
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bank?")) return;

    try {
      const response = await fetch(`http://localhost:8080/admin/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Bank deleted successfully!");
        setBanks(banks.filter((bank) => bank.id !== id));
      } else {
        alert("Failed to delete bank!");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting bank!");
    }
  };

  // Edit bank (you can redirect to a form page)
  const handleEdit = (id) => {
    // Example: navigate to edit page
    window.location.href = `/admin/edit-bank/${id}`;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary text-center">All Blood Banks</h2>
      <div className="row">
        {banks.length === 0 ? (
          <p className="text-center">No banks found.</p>
        ) : (
          banks.map((bank) => (
            <div key={bank.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{bank.bankName}</h5>
                  <p className="card-text">
                    {bank.address}, {bank.city}, {bank.state} - {bank.pincode}
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(bank.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(bank.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BloodBanks;
