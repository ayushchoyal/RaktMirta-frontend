import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaHeartbeat,
  FaUserCheck,
  FaBan,
  FaNotesMedical,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Information = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 150,
      easing: "ease-in-out",
      mirror: true, // animate in reverse when scrolling out
    });
  }, []);

  return (
    <>
      <div>
        <Container className="mt-5 mb-5">
          {/* ===== Heading Section ===== */}
          <div data-aos="zoom-in-down">
            <h2 className="text-center text-danger fw-bold mb-3">
              <FaHeartbeat className="me-2" />
              Blood Donation Guidelines
            </h2>
            <p className="text-center text-secondary mb-5">
              A simple act of kindness can save a life. Learn when and how you can safely donate blood.
            </p>
          </div>

          {/* ===== Eligibility & Restrictions ===== */}
          <Row className="g-4">
            <Col md={6} data-aos="fade-right" data-aos-delay="100">
              <Card className="shadow-lg border-0 h-100 rounded-4 info-card">
                <Card.Body>
                  <Card.Title className="text-success fw-bold">
                    <FaUserCheck className="me-2" /> Who Can Donate
                  </Card.Title>
                  <ul className="mt-3">
                    <li>Age: <strong>18–65 years</strong></li>
                    <li>Weight: <strong>Above 50 kg</strong></li>
                    <li>Hemoglobin: <strong>12.5 g/dl or more</strong></li>
                    <li>Pulse: Normal (60–100 bpm)</li>
                    <li>Blood Pressure: <strong>100–140 / 60–90 mm Hg</strong></li>
                    <li>Donation gap: <strong>3 months (men)</strong>, <strong>4 months (women)</strong></li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} data-aos="fade-left" data-aos-delay="200">
              <Card className="shadow-lg border-0 h-100 rounded-4 info-card">
                <Card.Body>
                  <Card.Title className="text-danger fw-bold">
                    <FaBan className="me-2" /> Who Should Avoid Donating
                  </Card.Title>
                  <ul className="mt-3">
                    <li>People with <strong>HIV, Hepatitis B/C, or Malaria</strong></li>
                    <li>Those with <strong>heart, kidney, or liver diseases</strong></li>
                    <li>Pregnant, breastfeeding, or menstruating women</li>
                    <li>Recent surgery or major illness (within 6 months)</li>
                    <li>Active infections or fever</li>
                    <li>Drug abuse or unsafe high-risk behavior</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* ===== Precautions Section ===== */}
          <Row className="mt-5">
            <Col data-aos="flip-up" data-aos-delay="300">
              <Card className="shadow-lg border-0 rounded-4 info-card">
                <Card.Body>
                  <Card.Title className="fw-bold text-primary">
                    <FaNotesMedical className="me-2" /> Before & After Donation Tips
                  </Card.Title>
                  <ul className="mt-3">
                    <li>Eat a light, healthy meal before donating.</li>
                    <li>Drink plenty of water before and after donation.</li>
                    <li>Avoid alcohol or smoking for 24 hours.</li>
                    <li>Rest 10–15 minutes after donation.</li>
                    <li>Do not lift heavy weights for 24 hours.</li>
                    <li>If dizzy, lie down and elevate your legs slightly.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* ===== Doctor’s Note ===== */}
          <Row className="mt-5">
            <Col data-aos="zoom-in-up" data-aos-delay="400">
              <Card className="border-0 shadow bg-light rounded-4 info-card">
                <Card.Body>
                  <blockquote className="blockquote text-center mb-0">
                    <p className="mb-2 fst-italic text-secondary">
                      “Every drop counts. A simple donation from you today could save someone’s tomorrow.”
                    </p>
                    <footer className="blockquote-footer mt-2">
                      Dr. Anjali Mehta, MD (Pathology) — Senior Blood Bank Officer
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* ===== Footer Section ===== */}
        <footer
          className="text-dark pt-5 pb-3 mt-5"
          style={{
            background: "linear-gradient(90deg, #f8f9fa, #e3eeff)",
          }}
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
        >
          <Container>
            <Row>
              <Col md={4} className="mb-4" data-aos="fade-right">
                <h4 className="fw-bold text-danger">RaktMitra</h4>
                <p className="small text-muted">
                  RaktMitra connects donors and recipients through a secure and compassionate platform. Together, we save lives.
                </p>
              </Col>

              <Col md={4} className="mb-4" data-aos="zoom-in">
                <h5 className="fw-bold text-danger">Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="/" className="text-dark text-decoration-none">Home</a></li>
                  <li><a href="/donor-registration" className="text-dark text-decoration-none">Donate Blood</a></li>
                  <li><a href="/request" className="text-dark text-decoration-none">Request Blood</a></li>
                  <li><a href="/about" className="text-dark text-decoration-none">About Us</a></li>
                </ul>
              </Col>

              <Col md={4} className="mb-4" data-aos="fade-left">
                <h5 className="fw-bold text-danger">Contact Us</h5>
                <p className="small mb-1">Indore, Madhya Pradesh, India</p>
                <p className="small mb-1">support@raktmitra.org</p>
                <p className="small">+91 9755926645</p>
                <div className="d-flex gap-3 mt-2">
                  <a href="#" className="text-danger fs-5"><FaFacebook /></a>
                  <a href="#" className="text-danger fs-5"><FaTwitter /></a>
                  <a href="#" className="text-danger fs-5"><FaInstagram /></a>
                </div>
              </Col>
            </Row>

            <hr />
            <div className="text-center small text-muted">
              © {new Date().getFullYear()} <strong>RaktMitra</strong>. All rights reserved.
            </div>
          </Container>
        </footer>
      </div>

      {/* === Custom CSS === */}
      <style>{`
        .info-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .info-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 10px 25px rgba(220, 53, 69, 0.25);
        }

        li {
          font-size: 0.95rem;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
};

export default Information;
