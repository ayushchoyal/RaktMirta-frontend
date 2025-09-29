<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DonorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);

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
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Forbidden. You do not have access.");
        }

        const data = await response.json();
        setDonor(data); // ✅ corrected here
      } catch (err) {
        console.error("Error fetching donor:", err);
      }
    };

    fetchDonor();
  }, [navigate, id]);

  if (!donor) return <p className="text-center mt-5">Loading donor info...</p>;

  return (
    <div className="container py-2">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="card shadow border-0 p-4">
        <h2 className="text-danger fw-bold text-center mb-4">
          {donor.name}'s Profile
        </h2>

        <div className="row align-items-center">
          <div className="col-md-5 text-center mb-4">
            {donor.imageUrl ? (
              <img
                src={`/${donor.imageUrl}`}
                alt={donor.name}
                className="card-img-top"
                style={{ height: "300px", width: "70%", borderRadius: "4px", margin: "10px auto 0" }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light text-danger"
                style={{ height: "250px", fontSize: "80px", fontWeight: "bold", borderRadius: "4px" }}
              >
                {donor.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <p className="d-flex justify-content-between align-items-center mb-2">
              <span><strong>Gender:</strong> {donor.gender}</span>
              <span><strong>Blood Group:</strong> {donor.bloodGroup}</span>
            </p>

            <p className="d-flex justify-content-between align-items-center mb-2">
              <span><strong>Food Preference:</strong> {donor.food}</span>
              <span><strong>Age:</strong> {donor.age}</span>
            </p>

            <p><strong>City:</strong> {donor.city} ({donor.state})</p>
            <p><strong>Contact:</strong> {donor.phone || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDetails;
=======
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DonorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);

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
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Forbidden. You do not have access.");
        }

        const data = await response.json();
        setDonor(data); // ✅ corrected here
      } catch (err) {
        console.error("Error fetching donor:", err);
      }
    };

    fetchDonor();
  }, [navigate, id]);

  if (!donor) return <p className="text-center mt-5">Loading donor info...</p>;

  return (
    <div className="container py-2">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="card shadow border-0 p-4">
        <h2 className="text-danger fw-bold text-center mb-4">
          {donor.name}'s Profile
        </h2>

        <div className="row align-items-center">
          <div className="col-md-5 text-center mb-4">
            {donor.imageUrl ? (
              <img
                src={`/${donor.imageUrl}`}
                alt={donor.name}
                className="card-img-top"
                style={{ height: "300px", width: "70%", borderRadius: "4px", margin: "10px auto 0" }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center bg-light text-danger"
                style={{ height: "250px", fontSize: "80px", fontWeight: "bold", borderRadius: "4px" }}
              >
                {donor.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <p className="d-flex justify-content-between align-items-center mb-2">
              <span><strong>Gender:</strong> {donor.gender}</span>
              <span><strong>Blood Group:</strong> {donor.bloodGroup}</span>
            </p>

            <p className="d-flex justify-content-between align-items-center mb-2">
              <span><strong>Food Preference:</strong> {donor.food}</span>
              <span><strong>Age:</strong> {donor.age}</span>
            </p>

            <p><strong>City:</strong> {donor.city} ({donor.state})</p>
            <p><strong>Contact:</strong> {donor.phone || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDetails;
>>>>>>> d525fcdd36cd8a7323e9b74a1c01810550824fb8
