import React, { useEffect, useState } from "react";
import {
  Card,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const BloodBanks = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("http://localhost:8080/banks");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Unable to fetch banks`);
        }

        const data = await response.json();
        setBanks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="danger" />
        <p className="mt-2">Loading blood banks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3 text-center">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="mt-4">
      

      <Row xs={1} md={2} lg={3} className="g-4">
        {banks.map((bank) => (
          <Col key={bank.id}>
            <Card className="bloodbank-card shadow-lg h-100 border-0 rounded-4">
              
              {/* === Image Section === */}
              <div className="image-container">
                <img
                  src={bank.imageUrl || "/bank.png"}
                  alt={bank.bankName}
                  className="bank-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/bank.png";
                  }}
                />
              </div>

              {/* === Card Body === */}
              <Card.Body className="p-4">
                <Card.Title className="text-danger fw-bold text-center mb-3">
                  {bank.bankName || "Unnamed Blood Bank"}
                </Card.Title>

                <Card.Text className="text-secondary">
                  {/* Address */}
                  <div className="d-flex align-items-start mb-2">
                    <FaMapMarkerAlt className="text-danger me-2 mt-1" />
                    <div>
                      <strong>Address:</strong> {bank.address}
                    </div>
                  </div>

                  {/* City & State in one row */}
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <FaCity className="text-danger me-2" />
                      <strong>City:</strong> {bank.city}
                    </div>
                    <div>
                      <strong>State:</strong> {bank.state}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="d-flex align-items-center">
                    <FaPhoneAlt className="text-danger me-2" />
                    <div>
                      <strong>Contact:</strong> {bank.phone}
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <style>
        {`
          .bloodbank-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .bloodbank-card:hover {
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

          .bank-image {
            width: 50%;
            height: 100%;

          }

          .card-title {
            font-size: 1.2rem;
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

export default BloodBanks;
