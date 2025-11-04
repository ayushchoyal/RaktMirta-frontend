import React, { useEffect, useState } from "react";
import { Card, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const BloodBanks = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

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
    <Container className="my-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {banks.map((bank, index) => (
          <Col key={bank.id} data-aos="zoom-in" data-aos-delay={index * 100}>
            <Card className="bloodbank-card shadow-sm border-0 rounded-4 overflow-hidden">
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
              <Card.Body className="p-3 bg-light">
                <Card.Title className="text-danger fw-bold text-center mb-2">
                  {bank.bankName || "Unnamed Blood Bank"}
                </Card.Title>

                <Card.Text className="text-secondary">
                  {/* ✅ Only City + State */}
                  <div className="d-flex align-items-start mb-2">
                    <FaMapMarkerAlt className="text-danger me-2 mt-1" />
                    <div>
                      <strong>Location:</strong>{" "}
                      {`${bank.city || "Unknown"}, ${bank.state || ""}`}
                    </div>
                  </div>

                  {/* ✅ Contact */}
                  <div className="d-flex align-items-center">
                    <FaPhoneAlt className="text-danger me-2" />
                    <div>
                      <strong>Contact:</strong> {bank.phone || "N/A"}
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <style>{`
        .bloodbank-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: #fff;
          height: 270px; /* compact height */
        }

        .bloodbank-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 18px rgba(220, 53, 69, 0.25);
        }

        .image-container {
          height: 110px;
          background: linear-gradient(135deg, #fff0f0, #ffe5e5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bank-image {
          width: 60%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .bloodbank-card:hover .bank-image {
          transform: scale(1.05);
        }

        .card-title {
          font-size: 1.05rem;
        }

        p, div {
          font-size: 0.9rem;
        }
      `}</style>
    </Container>
  );
};

export default BloodBanks;
