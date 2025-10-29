import React, { useEffect, useState } from "react";
import {
  Card,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { FaPhoneAlt, FaTint, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";


const ViewDonor = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/donors");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Unable to fetch donors`);
        }

        const data = await response.json();
        setDonors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="danger" />
        <p className="mt-2">Loading donors...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="danger" className="m-3 text-center">
        {error}
      </Alert>
    );
  }

  // Main UI
  return (
    <Container className="mt-4">
      <h2 className="text-center text-danger fw-bold mb-4">
        🩸 RaktMitra Donor Directory
      </h2>

      {donors.length === 0 ? (
        <Alert variant="info" className="text-center">
          No donors found in the system.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {donors.map((donor) => (
            <Col key={donor.id}>
              <Card className="donor-card shadow-lg h-100 border-0 rounded-4">
                {/* === Donor Image === */}
                <div className="image-container">
                  <img
                    src={donor.imageUrl || "/donor.png"}
                    alt="donor"
                    className="donor-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/donor.png";
                    }}
                  />
                </div>

                {/* === Donor Details === */}
                <Card.Body className="p-4">
                  <Card.Title className="text-danger fw-bold text-center mb-3">
                    <FaUserAlt className="me-2 text-secondary" />
                    {donor.name || "Anonymous Donor"}
                  </Card.Title>

                  <Card.Text className="text-secondary">
                    <div className="d-flex align-items-center mb-2">
                      <FaTint className="text-danger me-2" />
                      <strong>Blood Group:</strong>{" "}
                      <Badge bg="danger" className="ms-2">
                        {donor.bloodGroup || "N/A"}
                      </Badge>
                    </div>

                    <div className="d-flex align-items-start mb-2">
                      <FaMapMarkerAlt className="text-danger me-2 mt-1" />
                      <div>
                        <strong>City:</strong> {donor.city || "Unknown"}
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <FaPhoneAlt className="text-danger me-2" />
                      <div>
                        <strong>Contact:</strong>{" "}
                        {donor.phone || "Not Provided"}
                      </div>
                    </div>

                    <div className="mt-3 text-center">
                      <Badge
                        bg={donor.status ? "success" : "secondary"}
                        className="p-2"
                      >
                        {donor.status ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* === Styling === */}
      <style>
        {`
          .donor-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .donor-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 8px 20px rgba(220, 53, 69, 0.3);
          }

          .image-container {
            height: 150px;
            background-color: #fff5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            overflow: hidden;
          }

          .donor-image {
            width: 60%;
            height: 100%;
            object-fit: contain;
          }

          .card-title {
            font-size: 1.1rem;
            text-transform: capitalize;
          }

          p, div {
            font-size: 0.95rem;
          }
        `}
      </style>
    </Container>
  );
};

export default ViewDonor;
