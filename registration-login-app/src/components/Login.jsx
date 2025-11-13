import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (user) => user.email === form.email && user.password === form.password
    );
    if (foundUser) {
      toast.success(`Welcome back, ${foundUser.firstname}!`);
    } else {
      toast.error("Invalid email or password!");
    }
  };
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoComplete="off"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an accound? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
