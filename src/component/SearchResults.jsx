import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

    // const url =
  //   "https://raktmitrabackend.onrender.com" || "http://localhost:8080";
  const url = "http://localhost:8080";

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
          `${url}/user/search?type=${type}&bloodGroup=${bloodGroup}`,
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
  }, [bloodGroup, token, type]);

  if (error)
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">{error}</h2>
      </div>
    );

  return (
    <div className="container py-5">
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

      {/* 🔥 SAME CSS FROM DONORLIST */}
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

export default SearchResults;
