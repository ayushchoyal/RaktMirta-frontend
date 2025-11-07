import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
    const url = "https://raktmitrabackend.onrender.com" || "http://localhost:8080";

  const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("token");

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") || "Donor";
  const bloodGroup = queryParams.get("bloodGroup") || "";

  useEffect(() => {
    if (!loggedIn || !token) {
      navigate("/login");
    }
  }, [loggedIn, token, navigate]);

  useEffect(() => {
    if (!bloodGroup || !token) return;

    const fetchResults = async () => {
      try {
        const response = await fetch(
          `${url}/api/search?type=${type}&bloodGroup=${encodeURIComponent(
            bloodGroup
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch results");
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResults();
  }, [bloodGroup, token, type, url]);

  if (error)
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">{error}</h2>
      </div>
    );

  return (
    <div className="container py-5">
      <h3 className="text-center text-danger fw-bold mb-4">
        Search Results for {type} ({bloodGroup})
      </h3>

      {results.length === 0 ? (
        <p className="text-center text-muted">No {type.toLowerCase()} found.</p>
      ) : (
        <div className="row g-4">
          {results.map((item) => (
            <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card donor-card h-100 shadow-sm border-0">
                <div className="image-wrapper d-flex justify-content-center align-items-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="donor-image"
                    />
                  ) : (
                    <div className="placeholder">
                      {item.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="card-body text-center">
                  <h5 className="card-title text-danger fw-bold mb-2">
                    {item.name}
                  </h5>
                  <p className="card-text text-muted mb-2">
                    <strong>Blood Group:</strong> {item.bloodGroup}
                  </p>
                  {type === "Donor" ? (
                    <p className="card-text text-muted mb-3">
                      <strong>Address:</strong> {item.address}
                    </p>
                  ) : (
                    <p className="card-text text-muted mb-3">
                      <strong>Hospital:</strong> {item.hospital}
                    </p>
                  )}
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() =>
                      navigate(
                        type === "Donor"
                          ? `/donor/${item.id}`
                          : `/patient/${item.id}`
                      )
                    }
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

export default SearchResults;
