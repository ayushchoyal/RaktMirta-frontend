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

        // ✅ Show all donors (you can filter active ones later)
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
      <div className="container py-5">
        <h2 className="text-center text-danger">{error}</h2>
      </div>
    );
  }

  // ✅ Donor list UI
  return (
    <div className="container py-4">
      {donors.length === 0 ? (
        <p className="text-center">No donors available at the moment.</p>
      ) : (
        <div className="row g-4">
          {donors.map((donor) => (
            <div key={donor.id} className="col-md-4 col-sm-6">
              <div className="card shadow border-0 h-100">
                {donor.imageUrl ? (
                  <img
                    src={donor.imageUrl}
                    alt={donor.name}
                    className="card-img-top"
                    style={{
                      height: "240px",
                      width: "70%",
                      borderRadius: "4px",
                      margin: "10px auto 0 auto",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center bg-light text-danger"
                    style={{
                      height: "250px",
                      fontSize: "80px",
                      fontWeight: "bold",
                      borderRadius: "4px",
                    }}
                  >
                    {donor.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="card-body text-center">
                  <h5 className="card-title text-danger fw-bold">{donor.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Blood Group:</strong> {donor.bloodGroup}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Address:</strong> {donor.address}
                  </p>
                  <button
                    className="btn btn-danger w-100 mt-2"
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
    </div>
  );
};

export default DonorList;
