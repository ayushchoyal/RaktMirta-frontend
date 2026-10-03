import React, { useState } from "react";

const url = "http://localhost:8080";

const ForgotPassword = () => {

    const [phone, setPhone] = useState("");

    const [otp, setOtp] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [otpSent, setOtpSent] = useState(false);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);


    // SEND OTP
    const handleSendOtp = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const response = await fetch(
                `${url}/forgot-password/send-otp`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        phone: phone
                    })
                }
            );

            const data = await response.json();

            console.log("OTP Response:", data);

            if (data.success) {

                // OTP screen par alert me dikhega
                alert("Your OTP is: " + data.otp);

                // OTP form show karo
                setOtpSent(true);

                setMessage("OTP sent successfully!");

            } else {

                alert(data.message || "Phone number not found");

                setMessage(
                    data.message || "Phone number not found"
                );
            }

        } catch (error) {

            console.error("OTP Error:", error);

            alert("Server error. Please try again.");

            setMessage(
                "Server error. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };

    // RESET PASSWORD
    const handleResetPassword = async (e) => {

        e.preventDefault();

        setMessage("");

        if (newPassword !== confirmPassword) {

            setMessage("Passwords do not match");

            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                `${url}/forgot-password/reset`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        phone: phone,
                        otp: otp,
                        newPassword: newPassword
                    })
                }
            );

            const data = await response.json();

            console.log("Reset Response:", data);

            if (data.success) {

                setMessage(
                    "Password reset successfully!"
                );

                setPhone("");
                setOtp("");
                setNewPassword("");
                setConfirmPassword("");

                setOtpSent(false);
                setTimeout(() => {
                    window.location.href = "/login";
                }, 500);

            } else {

                setMessage(
                    data.message || "Invalid OTP"
                );
            }

        } catch (error) {

            console.error(error);

            setMessage(
                "Server error. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div
            className="d-flex align-items-center justify-content-center"
            style={{
                minHeight: "80vh",
                backgroundColor: "#f8f9fa"
            }}
        >

            <div
                className="card shadow p-4"
                style={{ width: "380px" }}
            >

                <h2 className="text-center text-danger fw-bold mb-3">
                    Forgot Password
                </h2>

                <p className="text-center text-muted">
                    Reset your RaktMitra password
                </p>


                {message && (

                    <p
                        className="text-center mt-2"
                        style={{
                            color: message.includes("✅")
                                ? "green"
                                : "red"
                        }}
                    >
                        {message}
                    </p>

                )}


                {!otpSent ? (

                    // PHONE FORM

                    <form onSubmit={handleSendOtp}>

                        <input
                            type="tel"
                            className="form-control mb-3"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            required
                        />


                        <button
                            type="submit"
                            className="btn btn-danger w-100"
                            disabled={loading}
                        >

                            {loading
                                ? "Sending OTP..."
                                : "Send OTP"}

                        </button>

                    </form>

                ) : (

                    // OTP + PASSWORD FORM

                    <form onSubmit={handleResetPassword}>

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value)
                            }
                            maxLength="6"
                            required
                        />


                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            required
                        />


                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                        />


                        <button
                            type="submit"
                            className="btn btn-danger w-100"
                            disabled={loading}
                        >

                            {loading
                                ? "Resetting..."
                                : "Reset Password"}

                        </button>

                    </form>

                )}


                <div className="text-center mt-3">

                    <a
                        href="/login"
                        className="text-danger fw-bold"
                    >
                        Back to Login
                    </a>

                </div>

            </div>

        </div>
    );
};

export default ForgotPassword;