import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DonorList = () => {
  const navigate = useNavigate();
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);
  const url = import.meta.env.url || "http://localhost:8080";

  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("token");

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!loggedIn || !token) {
      navigate("/login");
    }
  }, [loggedIn, token, navigate]);

  // ✅ Fetch donors
  useEffect(() => {
    if (!token) return;

    const fetchDonors = async () => {
      try {
        const response = await fetch(`${url}/user/donor`, {
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
          throw new Error("Failed to fetch donor data.");
        }

        const data = await response.json();
        setDonors(data);
      } catch (err) {
        console.error("Error fetching donors:", err);
        setError(err.message);
      }
    };

    fetchDonors();
  }, [token]);

  // ✅ Error display
  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">{error}</h2>
      </div>
    );
  }

  // ✅ Donor list UI
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-danger fw-bold">Registered Donors</h2>

      {donors.length === 0 ? (
        <p className="text-center text-muted">No donors available at the moment.</p>
      ) : (
        <div className="row g-4">
          {donors.map((donor) => (
            <div key={donor.id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card donor-card h-100 shadow-sm border-0">
                <div className="image-wrapper d-flex justify-content-center align-items-center">
                  {donor.imageUrl ? (
                    <img
                      src={donor.imageUrl}
                      alt={donor.name}
                      className="donor-image"
                    />
                  ) : (
                    <div className="placeholder">
                      {donor.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="card-body text-center">
                  <h5 className="card-title text-danger fw-bold mb-2">
                    {donor.name}
                  </h5>
                  <p className="card-text text-muted mb-2">
                    <strong>Blood Group:</strong> {donor.bloodGroup}
                  </p>
                  <p className="card-text text-muted mb-3">
                    <strong>Address:</strong> {donor.address}
                  </p>
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => navigate(`/donor/${donor.id}`)}
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
        .donor-card {
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          background-color: #fff;
        }

        .donor-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 180px;
          background-color: #f8f9fa;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .donor-image {
          width: 60%;
          height: 150px;
          object-fit: cover;
          border-radius: 6px;
        }

        .placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          font-weight: 700;
          color: #dc3545;
          background-color: #f8d7da;
          height: 150px;
          width: 60%;
          border-radius: 6px;
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

export default DonorList;
