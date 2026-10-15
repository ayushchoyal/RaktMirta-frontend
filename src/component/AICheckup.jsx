import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
    FaFileMedicalAlt,
    FaCloudUploadAlt,
    FaDownload,
    FaRobot,
    FaTrash,
    FaHeartbeat,
    FaExclamationTriangle,
    FaCalculator,
    FaWeight,
    FaRedo
} from "react-icons/fa";

// Use your actual backend URL.
const API_BASE_URL = "http://localhost:8080";

const AICheckup = () => {
    // Medical report states
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dragging, setDragging] = useState(false);

    // BMI calculator states
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [bmiError, setBmiError] = useState("");

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    // ----------------------------------
    // BMI CALCULATOR
    // ----------------------------------

    const calculateBMI = (event) => {
        event.preventDefault();

        setBmi(null);
        setBmiError("");

        const ageValue = Number(age);
        const heightValue = Number(height);
        const weightValue = Number(weight);

        if (
            !age ||
            !height ||
            !weight ||
            !Number.isFinite(ageValue) ||
            !Number.isFinite(heightValue) ||
            !Number.isFinite(weightValue)
        ) {
            setBmiError("Please enter valid values in all fields.");
            return;
        }

        if (
            ageValue < 2 ||
            ageValue > 120 ||
            heightValue < 50 ||
            heightValue > 250 ||
            weightValue <= 0 ||
            weightValue > 500
        ) {
            setBmiError("Please check your age, height, and weight.");
            return;
        }

        const heightInMeters = heightValue / 100;
        const bmiValue = weightValue / (heightInMeters * heightInMeters);

        setBmi({
            value: bmiValue.toFixed(1),
            age: ageValue
        });
    };

    const resetBMI = () => {
        setAge("");
        setHeight("");
        setWeight("");
        setBmi(null);
        setBmiError("");
    };

    const getBMIMessage = (ageValue) => {
        if (ageValue < 20) {
            return {
                title: "BMI result calculated",
                message:
                    "For children and teenagers, BMI must be interpreted using age- and sex-specific growth charts. This number alone cannot determine a healthy weight category. Please consult a qualified healthcare professional for an appropriate assessment.",
                color: "info"
            };
        }

        if (Number(bmi.value) < 18.5) {
            return {
                title: "Below the adult reference range",
                message:
                    "This result is below the usual adult BMI reference range. BMI alone cannot determine your health status. Consider discussing it with a healthcare professional.",
                color: "info"
            };
        }

        if (Number(bmi.value) < 25) {
            return {
                title: "Within the usual adult reference range",
                message:
                    "This result falls within the usual adult BMI reference range. BMI is only a screening measure and does not provide a complete assessment of health.",
                color: "success"
            };
        }

        if (Number(bmi.value) < 30) {
            return {
                title: "Above the usual adult reference range",
                message:
                    "This result is above the usual adult BMI reference range. BMI does not directly measure body fat or diagnose a medical condition. A healthcare professional can help interpret it in context.",
                color: "warning"
            };
        }

        return {
            title: "Above the usual adult reference range",
            message:
                "This result is above the usual adult BMI reference range. BMI is a screening measure, not a diagnosis. Consider discussing the result with a healthcare professional.",
            color: "warning"
        };
    };

    // ----------------------------------
    // MEDICAL REPORT VALIDATION
    // ----------------------------------

    const validateFile = (selectedFile) => {
        if (!selectedFile) {
            return "Please select a medical report.";
        }

        const extension = selectedFile.name
            .split(".")
            .pop()
            .toLowerCase();

        const allowedExtensions = [
            "pdf",
            "png",
            "jpg",
            "jpeg",
            "webp"
        ];

        const allowedTypes = [
            "application/pdf",
            "image/png",
            "image/jpeg",
            "image/webp"
        ];

        if (!allowedExtensions.includes(extension)) {
            return "Only PDF, PNG, JPG, JPEG and WEBP files are allowed.";
        }

        if (!allowedTypes.includes(selectedFile.type)) {
            return "Invalid file type. Please upload a valid PDF or image.";
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            return "File size must be less than 10 MB.";
        }

        if (selectedFile.size === 0) {
            return "The selected file is empty.";
        }

        return "";
    };

    const selectFile = (selectedFile) => {
        setError("");
        setSummary("");

        if (!selectedFile) {
            return;
        }

        const validationError = validateFile(selectedFile);

        if (validationError) {
            setFile(null);
            setError(validationError);
            return;
        }

        setFile(selectedFile);
    };

    const handleFileChange = (event) => {
        selectFile(event.target.files?.[0]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);

        selectFile(event.dataTransfer.files?.[0]);
    };

    // ----------------------------------
    // AI MEDICAL REPORT ANALYSIS
    // ----------------------------------

    const handleAnalyze = async () => {
        if (!file) {
            setError("Please upload your medical report first.");
            return;
        }

        setLoading(true);
        setError("");
        setSummary("");

        try {
            const formData = new FormData();

            formData.append("file", file);

            // Change this key if your login implementation
            // stores the authentication token under another name.
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Login required. Please log in again.");
            }

            const response = await fetch(
                `${API_BASE_URL}/user/analyze`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                }
            );

            const responseText = await response.text();

            let data;

            try {
                data = responseText
                    ? JSON.parse(responseText)
                    : {};
            } catch {
                data = {
                    message: responseText
                };
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    `Request failed: ${response.status}`
                );
            }

            const generatedSummary =
                typeof data === "string"
                    ? data
                    : data.summary || data.reportSummary;

            if (
                typeof generatedSummary !== "string" ||
                !generatedSummary.trim()
            ) {
                throw new Error(
                    "The server did not return a valid summary."
                );
            }

            setSummary(generatedSummary);
        } catch (err) {
            console.error("Medical report analysis error:", err);

            setError(
                err.message || "Unable to analyze the report."
            );
        } finally {
            setLoading(false);
        }
    };

    // ----------------------------------
    // DOWNLOAD SUMMARY
    // ----------------------------------

    const handleDownload = () => {
        if (!summary) {
            return;
        }

        const content = `
RAKTMITRA - AI MEDICAL REPORT SUMMARY
=====================================

Report File: ${file?.name || "Medical Report"}

Generated On: ${new Date().toLocaleString("en-IN")}

IMPORTANT DISCLAIMER:
This AI-generated summary is for informational purposes only.
It is not a medical diagnosis and does not replace consultation
with a qualified healthcare professional.

MEDICAL REPORT SUMMARY
----------------------

${summary}

=====================================
Please consult a qualified doctor for interpretation and treatment.
`;

        const blob = new Blob([content], {
            type: "text/plain;charset=utf-8"
        });

        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = downloadUrl;
        link.download = "RaktMitra_Medical_Report_Summary.txt";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(downloadUrl);
    };

    const handleRemoveFile = () => {
        setFile(null);
        setSummary("");
        setError("");

        const input = document.getElementById("medicalReport");

        if (input) {
            input.value = "";
        }
    };

    const bmiInfo = bmi ? getBMIMessage(bmi.age) : null;

    return (
        <div className="checkup-page py-5">
            <style>{`
                .checkup-page {
                    min-height: 100vh;
                    background: linear-gradient(
                        135deg,
                        #fff5f5,
                        #ffffff,
                        #fff0f1
                    );
                }

                .checkup-heading {
                    color: #c82333;
                }

                .checkup-card {
                    background: white;
                    border: none;
                    border-radius: 20px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
                }

                .upload-area {
                    border: 2px dashed #dc3545;
                    border-radius: 16px;
                    padding: 35px 20px;
                    text-align: center;
                    background: #fffafa;
                    cursor: pointer;
                    transition: 0.3s ease;
                }

                .upload-area:hover,
                .upload-area.dragging {
                    background: #ffe9ec;
                    border-color: #b02a37;
                }

                .upload-icon {
                    font-size: 52px;
                    color: #dc3545;
                }

                .checkup-btn {
                    background: #dc3545;
                    border: none;
                    color: white;
                    border-radius: 10px;
                    padding: 12px 24px;
                    transition: 0.3s;
                }

                .checkup-btn:hover {
                    background: #b02a37;
                    color: white;
                }

                .summary-box {
                    white-space: pre-wrap;
                    overflow-wrap: anywhere;
                    line-height: 1.8;
                    color: #343a40;
                }

                .feature-icon {
                    font-size: 30px;
                    color: #dc3545;
                }

                .checkup-page button:disabled {
                    cursor: not-allowed;
                    opacity: 0.65;
                }

                .bmi-result {
                    border-radius: 16px;
                    background: #fff5f5;
                    border: 1px solid #f5c2c7;
                }

                .bmi-number {
                    font-size: 48px;
                    font-weight: 800;
                    color: #c82333;
                }

                .bmi-input {
                    border-radius: 10px;
                    padding: 12px;
                }

                .section-title {
                    color: #343a40;
                }

                @media (max-width: 576px) {
                    .upload-area {
                        padding: 25px 12px;
                    }

                    .bmi-number {
                        font-size: 38px;
                    }
                }
            `}</style>

            <div className="container">
                {/* PAGE HEADING */}

                <div className="text-center mb-5">
                    <FaHeartbeat
                        className="checkup-heading mb-3"
                        size={48}
                    />

                    <h1 className="fw-bold checkup-heading">
                        RaktMitra Health Checkup
                    </h1>

                    <p className="text-muted mx-auto">
                        Check your BMI and understand your medical report
                        using our health tools.
                    </p>
                </div>

                {/* BMI CALCULATOR */}

                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8 col-xl-7">
                        <div className="card checkup-card p-3 p-md-4">
                            <h4 className="fw-bold mb-2 section-title">
                                <FaCalculator className="text-danger me-2" />
                                BMI Calculator
                            </h4>

                            <p className="text-muted mb-4">
                                Enter your age, height and weight to
                                calculate your Body Mass Index.
                            </p>

                            <form onSubmit={calculateBMI}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="bmiAge"
                                        className="form-label fw-semibold"
                                    >
                                        Age (years)
                                    </label>

                                    <input
                                        id="bmiAge"
                                        type="number"
                                        className="form-control bmi-input"
                                        placeholder="Enter your age"
                                        min="2"
                                        max="120"
                                        value={age}
                                        onChange={(event) =>
                                            setAge(event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="bmiHeight"
                                        className="form-label fw-semibold"
                                    >
                                        Height (cm)
                                    </label>

                                    <input
                                        id="bmiHeight"
                                        type="number"
                                        className="form-control bmi-input"
                                        placeholder="Example: 170"
                                        min="50"
                                        max="250"
                                        step="0.1"
                                        value={height}
                                        onChange={(event) =>
                                            setHeight(event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="bmiWeight"
                                        className="form-label fw-semibold"
                                    >
                                        Weight (kg)
                                    </label>

                                    <input
                                        id="bmiWeight"
                                        type="number"
                                        className="form-control bmi-input"
                                        placeholder="Enter weight in kg"
                                        min="0.1"
                                        max="500"
                                        step="0.1"
                                        value={weight}
                                        onChange={(event) =>
                                            setWeight(event.target.value)
                                        }
                                        required
                                    />
                                </div>

                                {bmiError && (
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        <FaExclamationTriangle className="me-2" />
                                        {bmiError}
                                    </div>
                                )}

                                <div className="d-flex flex-wrap gap-2">
                                    <button
                                        type="submit"
                                        className="btn checkup-btn flex-grow-1"
                                    >
                                        <FaCalculator className="me-2" />
                                        Calculate BMI
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={resetBMI}
                                    >
                                        <FaRedo className="me-2" />
                                        Reset
                                    </button>
                                </div>
                            </form>

                            {bmi && (
                                <div className="bmi-result p-4 mt-4">
                                    <div className="text-center mb-3">
                                        <FaWeight
                                            className="text-danger mb-2"
                                            size={32}
                                        />

                                        <h5 className="fw-bold">
                                            Your BMI Result
                                        </h5>

                                        <div className="bmi-number">
                                            {bmi.value}
                                        </div>

                                        <p className="text-muted mb-0">
                                            Body Mass Index
                                        </p>
                                    </div>

                                    <div
                                        className={`alert alert-${bmiInfo.color} mb-0`}
                                    >
                                        <h6 className="fw-bold">
                                            {bmiInfo.title}
                                        </h6>

                                        <p className="mb-0">
                                            {bmiInfo.message}
                                        </p>
                                    </div>

                                    <p className="small text-muted mt-3 mb-0">
                                        BMI is a screening measure, not a
                                        diagnosis. It does not assess your
                                        overall health on its own.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* MEDICAL REPORT UPLOAD */}

                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                        <div className="card checkup-card p-3 p-md-4">
                            <h4 className="fw-bold mb-4">
                                <FaFileMedicalAlt className="text-danger me-2" />
                                AI Medical Report Checkup
                            </h4>

                            <div
                                className={`upload-area ${
                                    dragging ? "dragging" : ""
                                }`}
                                onDragOver={(event) => {
                                    event.preventDefault();
                                    setDragging(true);
                                }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => {
                                    document
                                        .getElementById("medicalReport")
                                        ?.click();
                                }}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" ||
                                        event.key === " "
                                    ) {
                                        event.preventDefault();

                                        document
                                            .getElementById("medicalReport")
                                            ?.click();
                                    }
                                }}
                            >
                                <FaCloudUploadAlt className="upload-icon mb-3" />

                                <h5 className="fw-bold">
                                    Drag and drop your report
                                </h5>

                                <p className="text-muted mb-3">
                                    Or click here to select a file
                                </p>

                                <span className="badge bg-danger-subtle text-danger">
                                    PDF, JPG, JPEG, PNG, WEBP
                                </span>

                                <p className="small text-muted mt-3 mb-0">
                                    Maximum file size: 10 MB
                                </p>

                                <input
                                    type="file"
                                    id="medicalReport"
                                    className="d-none"
                                    accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {file && (
                                <div className="alert alert-light border mt-4 d-flex align-items-center justify-content-between gap-2">
                                    <div className="d-flex align-items-center gap-3 overflow-hidden">
                                        <FaFileMedicalAlt
                                            className="text-danger"
                                            size={25}
                                        />

                                        <div className="overflow-hidden">
                                            <div className="fw-bold text-break">
                                                {file.name}
                                            </div>

                                            <small className="text-muted">
                                                {(
                                                    file.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{" "}
                                                MB
                                            </small>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm flex-shrink-0"
                                        onClick={handleRemoveFile}
                                        disabled={loading}
                                        aria-label="Remove uploaded file"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            )}

                            {error && (
                                <div
                                    className="alert alert-danger mt-3"
                                    role="alert"
                                >
                                    <FaExclamationTriangle className="me-2" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="button"
                                className="btn checkup-btn w-100 mt-4"
                                onClick={handleAnalyze}
                                disabled={!file || loading}
                            >
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            aria-hidden="true"
                                        />
                                        Analyzing Report...
                                    </>
                                ) : (
                                    <>
                                        <FaRobot className="me-2" />
                                        Analyze Medical Report
                                    </>
                                )}
                            </button>

                            <p className="small text-muted mt-3 mb-0">
                                Medical reports contain sensitive information.
                                Upload only reports you are authorized to share.
                            </p>
                        </div>
                    </div>
                </div>

                {/* SUMMARY SECTION */}

                {summary && (
                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-10">
                            <div className="card checkup-card p-3 p-md-4">
                                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                                    <h4 className="fw-bold mb-0">
                                        <FaFileMedicalAlt className="text-danger me-2" />
                                        Medical Report Summary
                                    </h4>

                                    <button
                                        type="button"
                                        className="btn checkup-btn"
                                        onClick={handleDownload}
                                    >
                                        <FaDownload className="me-2" />
                                        Download Summary
                                    </button>
                                </div>

                                <div className="summary-box border rounded-3 p-3 p-md-4 bg-light">
                                    {summary}
                                </div>

                                <div className="alert alert-warning mt-4 mb-0">
                                    <strong>Medical Disclaimer:</strong>{" "}
                                    This summary is AI-generated and may contain
                                    errors. It is not a diagnosis. Consult a
                                    qualified healthcare professional before
                                    making healthcare decisions.
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FEATURE CARDS */}

                <div className="row g-4 mt-4">
                    <div className="col-md-4">
                        <div className="card checkup-card p-4 h-100 text-center">
                            <FaCalculator className="feature-icon mx-auto mb-3" />

                            <h5 className="fw-bold">BMI Calculator</h5>

                            <p className="text-muted mb-0">
                                Calculate BMI using height and weight.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card checkup-card p-4 h-100 text-center">
                            <FaRobot className="feature-icon mx-auto mb-3" />

                            <h5 className="fw-bold">AI Summary</h5>

                            <p className="text-muted mb-0">
                                Get a simple-language summary of your report.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card checkup-card p-4 h-100 text-center">
                            <FaDownload className="feature-icon mx-auto mb-3" />

                            <h5 className="fw-bold">Download Summary</h5>

                            <p className="text-muted mb-0">
                                Save your generated report summary as a text file.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="alert alert-warning mt-5">
                    <strong>Health information:</strong> These tools provide
                    general information only and cannot diagnose medical
                    conditions or determine blood donation eligibility.
                </div>
            </div>
        </div>
    );
};

export default AICheckup;