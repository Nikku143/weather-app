import React, { useState } from "react";

function EasyOtpWithPaste() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  // When typing or changing
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4); // Digits only, max 4
    setOtp(value);
  };

  // When pasting
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 4);
    setOtp(digits);
    e.preventDefault(); // Prevent default paste behavior
  };

  const handleSubmit = () => {
    setMessage(`✅ Submitted OTP: ${otp}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={handleChange}
        onPaste={handlePaste}
        maxLength="4"
        placeholder="Enter OTP"
        style={{
          width: "120px",
          fontSize: "22px",
          textAlign: "center",
          padding: "10px",
        }}
      />
      <br />
      <br />
      <button onClick={handleSubmit}>Submit OTP</button>
      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold", color: "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default EasyOtpWithPaste;
