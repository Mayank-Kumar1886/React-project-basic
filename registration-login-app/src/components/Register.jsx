import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      phone,
    } = form;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmPassword ||
      !phone
    ) {
      toast.error("All fields are required");
      return;
    }
    if (firstname.trim().length < 2 || lastname.trim().length < 2) {
      toast.error("First and Last names must be at least 2 characters long");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format!");
      return;
    }
    if (!validatePhone(phone)) {
      toast.error("Phone number must be exactly 10 digits!");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be 8+ chars, with uppercase, lowercase, number & special char!"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error(
        "Password must be 8+ chars, with uppercase, lowercase, number & special char!"
      );
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExits = users.some((user) => user.email === email);
    if (emailExits) {
      toast.error("This email is already registered!");
      return;
    }
    users.push({ firstname, lastname, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registration successful!");
    setTimeout(() => navigate("/login"), 1500);
  };
  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          required
          value={form.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          required
          value={form.lastname}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <div className="password-container">
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
