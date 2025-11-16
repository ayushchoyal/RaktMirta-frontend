import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DonorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  const [error, setError] = useState(null);

    // const url = "https://raktmitrabackend.onrender.com" || "http://localhost:8080";
    const url = "http://localhost:8080" ;

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const token = localStorage.getItem("token");

    if (!loggedIn || !token) {
      navigate("/login");
      return;
    }

    const fetchDonor = async () => {
      try {
        const response = await fetch(`${url}/user/donor/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) throw new Error("Forbidden access");
        if (!response.ok) throw new Error("Failed to fetch donor details");

        const data = await response.json();
        setDonor(data);
      } catch (err) {
        console.error("Error fetching donor:", err);
        setError(err.message);
      }
    };

    fetchDonor();
  }, [navigate, id]);

  if (error)
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">{error}</h2>
      </div>
    );

  if (!donor) return <p className="text-center mt-5">Loading donor info...</p>;

  // ✅ Function to open WhatsApp with message
  const handleWhatsApp = () => {
    if (!donor.phone) {
      alert("Phone number not available for this donor.");
      return;
    }

    const message = `Hello ${donor.name}, I found your profile on RaktMitra. I need blood of your group (${donor.bloodGroup}). Can we connect? 🙏`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = donor.phone.startsWith("+")
      ? donor.phone
      : `+91${donor.phone}`; // Add +91 if not present

    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

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
          {/* ✅ Donor Image */}
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
          <div className="col-md-7">
            <div className="mb-3">
              <p className="mb-2">
                <strong>Gender:</strong> {donor.gender}
              </p>
              <p className="mb-2">
                <strong>Blood Group:</strong> {donor.bloodGroup}
              </p>
              <p className="mb-2">
                <strong>Contact:</strong> {donor.phone || "N/A"}
              </p>
              <p className="mb-2">
                <strong>Date of Birth:</strong>{" "}
                {donor.dob ? new Date(donor.dob).toLocaleDateString() : "N/A"}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {donor.address}
              </p>
              <p className="mb-2">
                <strong>Food Preference:</strong> {donor.foodPreference}
              </p>
              {donor.alcoholConsumption !== undefined && (
                <p className="mb-2">
                  <strong>Alcohol Consumption:</strong>{" "}
                  {donor.alcoholConsumption === "yes" ||
                  donor.alcoholConsumption === true
                    ? "Yes"
                    : "No"}
                </p>
              )}
              {donor.smokingStatus !== undefined && (
                <p className="mb-2">
                  <strong>Smoking Status:</strong>{" "}
                  {donor.smokingStatus === "yes" ||
                  donor.smokingStatus === true
                    ? "Yes"
                    : "No"}
                </p>
              )}
            </div>

            {/* ✅ WhatsApp Contact Button */}
            <button
              className="btn btn-success d-flex align-items-center gap-2 px-4"
              onClick={handleWhatsApp}
            >
              <i className="bi bi-whatsapp fs-5"></i>
              Contact via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDetails;
