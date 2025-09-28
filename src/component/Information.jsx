import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Information = () => {
  return (
   <>
    <div>
         <Container className="mt-4">
      <h2 className="text-center text-danger fw-bold mb-4">
        Blood Donation Guidelines
      </h2>
      <p className="text-center text-muted mb-5">
        The following information is based on standard medical guidelines and is
        reviewed by certified doctors. Please consult a physician for personal
        advice before donating blood.
      </p>

      <Row className="g-4">
        {/* Eligibility */}
        <Col md={6}>
          <Card className="shadow border-0 h-100">
            <Card.Body>
              <Card.Title className="text-success fw-bold">
                ✅ Eligibility to Donate
              </Card.Title>
              <Card.Text as="div" className="mt-3">
                <ul>
                  <li>Age: <strong>18 to 65 years</strong></li>
                  <li>Weight: Minimum <strong>50 kg</strong></li>
                  <li>Hemoglobin: Minimum <strong>12.5 g/dl</strong></li>
                  <li>Pulse: Normal (60–100 beats/min)</li>
                  <li>Blood Pressure: Systolic 100–140 mm Hg, Diastolic 60–90 mm Hg</li>
                  <li>Gap after last donation: At least <strong>3 months (men)</strong> / <strong>4 months (women)</strong></li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Ineligibility */}
        <Col md={6}>
          <Card className="shadow border-0 h-100">
            <Card.Body>
              <Card.Title className="text-danger fw-bold">
                ❌ Who Cannot Donate
              </Card.Title>
              <Card.Text as="div" className="mt-3">
                <ul>
                  <li>History of <strong>HIV, Hepatitis B/C, Syphilis, Malaria</strong></li>
                  <li>Chronic diseases: <strong>heart, kidney, liver disorders, uncontrolled diabetes</strong></li>
                  <li>Pregnant, breastfeeding, or menstruating women</li>
                  <li>Recent major surgery or serious illness (within 6 months)</li>
                  <li>Active infections, fever, or recent vaccination</li>
                  <li>History of drug abuse or high-risk behavior</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Precautions */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow border-0">
            <Card.Body>
              <Card.Title className="fw-bold text-primary">
                🩸 Precautions Before and After Donation
              </Card.Title>
              <Card.Text as="div" className="mt-3">
                <ul>
                  <li>Have a light meal and drink plenty of water before donating.</li>
                  <li>Avoid alcohol or smoking 24 hours before and after donation.</li>
                  <li>Take rest for 10–15 minutes after donation.</li>
                  <li>Do not lift heavy weights for 24 hours.</li>
                  <li>If you feel dizzy, lie down and raise your legs slightly.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Doctor’s Note */}
      <Row className="mt-4">
        <Col>
          <Card className="shadow border-0 bg-light">
            <Card.Body>
              <blockquote className="blockquote mb-0 text-center">
                <p>
                  “Blood donation is a safe procedure when done under proper
                  medical supervision. Every healthy person should consider
                  donating regularly — one donation can save up to three lives.”
                </p>
                <footer className="blockquote-footer mt-2">
                  Dr. Anjali Mehta, MD (Pathology) | Senior Blood Bank Officer
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
    </Container>
    <footer
        className="text-dark pt-5 pb-3 mt-5"
        style={{
          background: "linear-gradient(90deg, #f5f7fa, #c3cfe2)", // same as navbar
        }}
      >
        <div className="container">
          <div className="row">
            {/* Brand & Tagline */}
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold text-danger">🩸 RaktMitra</h4>
              <p className="small text-muted">
                A platform that connects blood donors with those in need. Donate
                blood, save lives, and spread hope.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold text-danger">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="text-dark text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/donate" className="text-dark text-decoration-none">
                    Donate Blood
                  </a>
                </li>
                <li>
                  <a href="/request" className="text-dark text-decoration-none">
                    Request Blood
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-dark text-decoration-none">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold text-danger">Contact Us</h5>
              <p className="small mb-1">📍 Indore, Madhya Pradesh, India</p>
              <p className="small mb-1">📧 support@raktmitra.org</p>
              <p className="small">📞 +91 87876 87556</p>
              {/* Social Icons */}
              <div className="d-flex gap-3 mt-2">
                <a href="#" className="text-danger fs-5">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-danger fs-5">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-danger fs-5">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <hr />
          <div className="text-center small text-muted">
            © {new Date().getFullYear()} RaktMitra. All rights reserved.
          </div>
        </div>
      </footer>
   
    </div>
   </> 
  );
};

export default Information;
