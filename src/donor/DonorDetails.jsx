import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DonorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const token = localStorage.getItem("token");

    if (!loggedIn || !token) {
      navigate("/login");
      return;
    }

    const fetchDonor = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/donor/${id}`, {
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
          throw new Error("Failed to fetch donor details.");
        }

        const data = await response.json();
        setDonor(data);
      } catch (err) {
        console.error("Error fetching donor:", err);
        setError(err.message);
      }
    };

    fetchDonor();
  }, [navigate, id]);

  if (error) {
    return (
      <div className="container py-5">
        <h2 className="text-center text-danger">{error}</h2>
      </div>
    );
  }

  if (!donor) return <p className="text-center mt-5">Loading donor info...</p>;

  return (
    <div className="container py-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="card shadow border-0 p-4">
        <h2 className="text-danger fw-bold text-center mb-4">
          {donor.name}'s Profile
        </h2>

        <div className="row align-items-center">
          {/* ✅ Donor Image or Initial */}
          <div className="col-md-5 text-center mb-4">
            {donor.imageUrl ? (
              <img
                src={donor.imageUrl}
                alt={donor.name}
                className="card-img-top"
                style={{
                  height: "300px",
                  width: "70%",
                  borderRadius: "8px",
                  margin: "10px auto 0",
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
                  borderRadius: "8px",
                }}
              >
                {donor.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* ✅ Donor Info */}
          <div className="col-md-6">
            <p className="d-flex justify-content-between mb-2">
              <span>
                <strong>Gender:</strong> {donor.gender}
              </span>
              <span>
                <strong>Blood Group:</strong> {donor.bloodGroup}
              </span>
            </p>

            <p className="d-flex justify-content-between mb-2">
              <span>
                <strong>Food Preference:</strong> {donor.foodPreference}
                <strong>Contact:</strong> {donor.phone || "N/A"}
              </span>
              <span>
                <strong>Date of Birth:</strong>{" "}
                {donor.dob ? new Date(donor.dob).toLocaleDateString() : "N/A"}
              </span>
            </p>

            <p>
              <strong>Address:</strong> {donor.address}
            </p>

            <p>
              <strong>Food Preference:</strong> {donor.foodPreference}
            </p>

            {donor.alcoholConsumption !== undefined && (
              <p>
                <strong>Alcohol Consumption:</strong>{" "}
                {donor.alcoholConsumption === "yes" ||
                donor.alcoholConsumption === true
                  ? "Yes"
                  : "No"}
              </p>
            )}

            {donor.smokingStatus !== undefined && (
              <p>
                <strong>Smoking Status:</strong>{" "}
                {donor.smokingStatus === "yes" || donor.smokingStatus === true
                  ? "Yes"
                  : "No"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDetails;
