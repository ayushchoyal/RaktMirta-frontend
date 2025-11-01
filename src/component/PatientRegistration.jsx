import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Row, Col, Alert } from "react-bootstrap";

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    bloodGroup: "",
    gender: "",
    emergencyContact: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // ✅ Fetch logged-in user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:8080/user/details", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const userData = await response.json();
          setFormData((prev) => ({
            ...prev,
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.dob ||
      !formData.bloodGroup ||
      !formData.gender
    ) {
      setMessage("Please fill in all required fields.");
      setMessageType("danger");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:8080/user/patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Patient registration successful!");
        setMessageType("success");

        setTimeout(() => {
          navigate("/patient/profile", { state: { patient: data } });
        }, 1000);
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
        setMessageType("danger");
      }
    } catch (error) {
      console.error("Error submitting patient data:", error);
      setMessage("Network error. Please try again.");
      setMessageType("danger");
    }
  };

  // ✅ JSX Layout
  return (
    <Container className="py-4">
      <Card className="shadow border-0">
        <Card.Header className="bg-danger text-white text-center">
          <h2 className="mb-0"> Patient Registration</h2>
        </Card.Header>

        <Card.Body className="p-4">
          {message && (
            <Alert variant={messageType} className="mb-4 text-center">
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Row 1: Name, Email */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 2: Phone, DOB */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth *</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Row 3: Blood Group, Gender */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Blood Group *</Form.Label>
                  <Form.Select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender *</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

           

            {/* Row 5: Address */}
            <Form.Group className="mb-3">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="text-center mt-4">
              <Button type="submit" variant="danger" size="lg" className="px-5">
                Register
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientRegistration;
