import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("token");

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!loggedIn || !token) {
      navigate("/login");
    }
  }, [loggedIn, token, navigate]);

  // ✅ Fetch patients
  useEffect(() => {
    if (!token) return;

    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/patients", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          throw new Error("Forbidden. You do not have access.");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch patient data.");
        }

        const data = await response.json();
        setPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError(err.message);
      }
    };

    fetchPatients();
  }, [token]);

  // ✅ Error display
  if (error) {
    return (
      <div className="container py-5">
        <h2 className="text-center text-danger">{error}</h2>
      </div>
    );
  }

  // ✅ Patient list UI
  return (
    <div className="container py-4">
      {patients.length === 0 ? (
        <p className="text-center">No patients registered yet.</p>
      ) : (
        <div className="row g-4">
          {patients.map((patient) => (
            <div key={patient.id} className="col-md-4 col-sm-6">
              <div className="card shadow border-0 h-100">
                <div
                  className="d-flex align-items-center justify-content-center bg-light text-danger"
                  style={{
                    height: "250px",
                    fontSize: "80px",
                    fontWeight: "bold",
                    borderRadius: "4px",
                  }}
                >
                  {patient.name?.charAt(0).toUpperCase()}
                </div>

                <div className="card-body text-center">
                  <h5 className="card-title text-danger fw-bold">{patient.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Blood Group:</strong> {patient.bloodGroup}
                  </p>

                  <button
                    className="btn btn-danger w-100 mt-2"
                    onClick={() => navigate(`/patient/${patient.id}`)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
