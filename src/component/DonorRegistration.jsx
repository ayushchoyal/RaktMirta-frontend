import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const DonorRegistration = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [formData, setFormData] = useState({
    // Personal Details
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",

    // Address
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Physical Details
    weight: "",
    height: "",

    // Dietary Preference
    food: "vegetarian",

    // Medical History
    chronicDiseases: [],
    currentMedications: "",
    allergies: "",
    previousSurgeries: "",
    lastDonationDate: "",

    // Health Status
    recentIllness: "",
    pregnancyStatus: "no",
    smokingStatus: "no",
    alcoholConsumption: "no",

    // Emergency Contact
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",

    // Profile Image
    profileImage: null, // ✅ added

    // Consent
    consentToContact: false,
    consentToShare: false,
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  const chronicDiseaseOptions = [
    "Diabetes", "Hypertension", "Heart Disease", "Kidney Disease", 
    "Liver Disease", "Asthma", "Epilepsy", "Cancer", "HIV/AIDS", 
    "Hepatitis B", "Hepatitis C", "Tuberculosis", "None"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      if (name === "chronicDiseases") {
        setFormData((prev) => ({
          ...prev,
          chronicDiseases: checked
            ? [...prev.chronicDiseases, value]
            : prev.chronicDiseases.filter((disease) => disease !== value),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!formData.consentToContact || !formData.consentToShare) {
      setMessage("Please provide consent to proceed with registration.");
      setMessageType("danger");
      return;
    }
    if (formData.age < 18 || formData.age > 65) {
      setMessage("Donor age must be between 18 and 65 years.");
      setMessageType("danger");
      return;
    }
    if (formData.weight < 50) {
      setMessage("Minimum weight requirement is 50 kg for blood donation.");
      setMessageType("danger");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // ✅ Create FormData with two parts
      const formDataToSend = new FormData();

      // Donor JSON (without file)
      const donorData = { ...formData };
      delete donorData.profileImage;

      formDataToSend.append(
        "donor",
        new Blob([JSON.stringify(donorData)], { type: "application/json" })
      );

      // File
      if (formData.profileImage) {
        formDataToSend.append("image", formData.profileImage);
      }

      // Send to backend
      const response = await fetch("http://localhost:8080/user/donor/register", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // don’t set Content-Type manually
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Donor registration successful! Thank you for joining our community.");
        setMessageType("success");
        setTimeout(() => navigate("/blood_donar"), 2000);
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
        setMessageType("danger");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
      setMessageType("danger");
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow border-0">
        <Card.Header className="bg-danger text-white text-center">
          <h2 className="mb-0">🩸 Donor Registration Form</h2>
          <p className="mb-0 mt-2">Join our life-saving community</p>
        </Card.Header>

        <Card.Body className="p-4">
          {message && (
            <Alert variant={messageType} className="mb-4">
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            
            {/* Profile Image Upload */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0 text-danger">Profile Image</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  {formData.profileImage && (
                    <div className="mt-3">
                      <img
                        src={URL.createObjectURL(formData.profileImage)}
                        alt="Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #dc3545",
                        }}
                      />
                    </div>
                  )}
                </Form.Group>
              </Card.Body>
            </Card>
            <Card.Body>
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
              <Row>
                <Col md={4}>
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
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Age *</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      min="18"
                      max="65"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
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
              <Row>
                <Col md={4}>
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
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Weight (kg) *</Form.Label>
                    <Form.Control
                      type="number"
                      name="weight"
                      min="50"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                    <Form.Text className="text-muted">
                      Minimum 50 kg required
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Height (cm)</Form.Label>
                    <Form.Control
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          

            <Card.Body>
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
                
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State *</Form.Label>
                      <Form.Select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select State</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode *</Form.Label>
                      <Form.Control
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
          

            {/* Dietary Preference */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0 text-danger">Dietary Preference</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label>Food Preference *</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      name="food"
                      value="vegetarian"
                      label="Vegetarian"
                      checked={formData.food === "vegetarian"}
                      onChange={handleChange}
                      inline
                    />
                    <Form.Check
                      type="radio"
                      name="food"
                      value="non-vegetarian"
                      label="Non-Vegetarian"
                      checked={formData.food === "non-vegetarian"}
                      onChange={handleChange}
                      inline
                    />
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Medical History Section */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0 text-danger">Medical History</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Chronic Diseases (Select all that apply)</Form.Label>
                  <Row>
                    {chronicDiseaseOptions.map(disease => (
                      <Col md={4} key={disease}>
                        <Form.Check
                          type="checkbox"
                          name="chronicDiseases"
                          value={disease}
                          label={disease}
                          checked={formData.chronicDiseases.includes(disease)}
                          onChange={handleChange}
                        />
                      </Col>
                    ))}
                  </Row>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Medications</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="currentMedications"
                        value={formData.currentMedications}
                        onChange={handleChange}
                        placeholder="List any medications you're currently taking"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Allergies</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="List any known allergies"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Previous Surgeries</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="previousSurgeries"
                        value={formData.previousSurgeries}
                        onChange={handleChange}
                        placeholder="List any previous surgeries with dates"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Blood Donation Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="lastDonationDate"
                        value={formData.lastDonationDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Health Status Section */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0 text-danger">Current Health Status</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Recent Illness (within last 3 months)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="recentIllness"
                    value={formData.recentIllness}
                    onChange={handleChange}
                    placeholder="Describe any recent illness or health issues"
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Smoking Status</Form.Label>
                      <Form.Select
                        name="smokingStatus"
                        value={formData.smokingStatus}
                        onChange={handleChange}
                      >
                        <option value="no">No</option>
                        <option value="occasional">Occasional</option>
                        <option value="regular">Regular</option>
                        <option value="former">Former Smoker</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Alcohol Consumption</Form.Label>
                      <Form.Select
                        name="alcholConsumption"
                        value={formData.alcholConsumption}
                        onChange={handleChange}
                      >
                        <option value="no">No</option>
                        <option value="occasional">Occasional</option>
                        <option value="regular">Regular</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {formData.gender === "female" && (
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Pregnancy Status</Form.Label>
                        <Form.Select
                          name="pregnancyStatus"
                          value={formData.pregnancyStatus}
                          onChange={handleChange}
                        >
                          <option value="no">Not Pregnant</option>
                          <option value="pregnant">Pregnant</option>
                          <option value="breastfeeding">Breastfeeding</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Card>


            {/* Consent Section */}
            <Card className="mb-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0 text-danger">Consent & Agreement</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="consentToContact"
                    checked={formData.consentToContact}
                    onChange={handleChange}
                    label="I consent to be contacted by blood banks and patients in need of blood donation."
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="consentToShare"
                    checked={formData.consentToShare}
                    onChange={handleChange}
                    label="I consent to share my contact information with verified blood banks and medical institutions."
                    required
                  />
                </Form.Group>
                
                <Alert variant="info" className="mt-3">
                  <small>
                    <strong>Note:</strong> All information provided will be kept confidential and used only for blood donation purposes. 
                    You can update or remove your information at any time by contacting us.
                  </small>
                </Alert>
              </Card.Body>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                variant="danger" 
                size="lg" 
                className="px-5"
              >
                Register as Donor
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DonorRegistration;
