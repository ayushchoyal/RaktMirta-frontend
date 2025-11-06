import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const url = import.meta.env.url || "http://localhost:8080";

  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("token");

  // Redirect if not logged in
  useEffect(() => {
    if (!loggedIn || !token) {
      navigate("/login");
    }
  }, [loggedIn, token, navigate]);

  // Fetch patients
  useEffect(() => {
    if (!token) return;

    const fetchPatients = async () => {
      try {
        const response = await fetch(`${url}/user/patients`, {
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

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">{error}</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-danger fw-bold">Registered Patients</h2>

      {patients.length === 0 ? (
        <p className="text-center text-muted">No patients registered yet.</p>
      ) : (
        <div className="row g-4">
          {patients.map((patient) => (
            <div key={patient.id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card patient-card h-100 shadow-sm border-0">
                <div className="image-wrapper">
                  {patient.imageUrl ? (
                    <img
                      src={patient.imageUrl}
                      alt={patient.name}
                      className="patient-image"
                    />
                  ) : (
                    <div className="placeholder">
                      {patient.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="card-body text-center">
                  <h5 className="card-title text-danger fw-bold mb-2">
                    {patient.name}
                  </h5>
                  <p className="card-text text-muted mb-3">
                    <strong>Blood Group:</strong> {patient.bloodGroup}
                  </p>

                  <button
                    className="btn btn-outline-danger w-100"
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

      {/* ✅ Inline CSS */}
      <style>{`
        .patient-card {
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          background-color: #fff;
        }

        .patient-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 220px;
          background-color: #f8f9fa;
          overflow: hidden;
        }

        .patient-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          font-weight: 700;
          color: #dc3545;
          background-color: #f8d7da;
          height: 100%;
          width: 100%;
        }

        .btn-outline-danger {
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default PatientList;
