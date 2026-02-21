import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const handleCheckEmail = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(u => u.email === email);

    if (!foundUser) {
      setError("Email not found.");
      return;
    }

    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError("");

    if (newPass !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map(u =>
      u.email === email ? { ...u, password: newPass } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Password updated successfully!");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Forgot Password?
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <form onSubmit={handleCheckEmail} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Verify Email
            </button>
          </form>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New Password"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Update Password
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
