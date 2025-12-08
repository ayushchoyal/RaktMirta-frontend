import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");

  const url =
    "https://raktmitrabackend.onrender.com" || "http://localhost:8080";

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

  // Fetch results with filters
  useEffect(() => {
    if (!bloodGroup || !token) return;

    const fetchResults = async () => {
      try {
        const query = new URLSearchParams({
          type,
          bloodGroup,
          city,
          state,
          gender,
        });

        const response = await fetch(`${url}/user/search?${query.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch results");
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchResults();
  }, [bloodGroup, type, city, state, gender, token]);

  if (error)
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">{error}</h2>
      </div>
    );

  return (
    <div className="container py-5">

      {/* ---------------- FILTER BAR ---------------- */}
      <div className="filter-bar mb-4">
        <div className="filter-row">

          <input
            type="text"
            className="form-control"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            className="form-control"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

        </div>
      </div>

      {/* ---------------- RESULT CARDS ---------------- */}
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

      {/* ---------------- CSS ---------------- */}
      <style>{`
        /* FILTER BAR */
        .filter-bar {
          margin-bottom: 20px;
        }

        .filter-bar .filter-row {
          display: flex;
          gap: 10px;
          flex-wrap: nowrap;
        }

        .filter-bar .form-control,
        .filter-bar .form-select {
          flex: 1;
          min-width: 0;
        }

        /* FORCE SINGLE ROW ON MOBILE */
        @media (max-width: 576px) {
          .filter-bar .form-control,
          .filter-bar .form-select {
            flex-basis: 30%;
            font-size: 14px;
            padding: 6px;
          }

          .filter-bar {
            overflow-x: auto;
            white-space: nowrap;
          }
        }

        /* CARD CSS (same as DonorList) */
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
      `}</style>
      <br />
    </div>
  );
};

export default SearchResults;
