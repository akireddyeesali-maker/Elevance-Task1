import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgotPassword",
        {
          email,
          phone,
        }
      );

      alert(res.data.message);
      setGeneratedPassword(res.data.newPassword);
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Cannot connect to backend.");
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "80px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
        }}
      />

      <h3 style={{ textAlign: "center" }}>OR</h3>

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={handleReset}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Generate New Password
      </button>

      {generatedPassword && (
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            background: "#f3f4f6",
            borderRadius: "8px",
          }}
        >
          <h3>Your New Password</h3>
          <h2>{generatedPassword}</h2>
        </div>
      )}
    </div>
  );
}