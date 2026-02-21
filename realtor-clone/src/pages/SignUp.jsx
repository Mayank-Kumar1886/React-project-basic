import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPasswords, setGeneratedPasswords] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const { username, email, phone, password } = formData;

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleGeneratePasswords = () => {
    const passwords = [
      generatePassword(),
      generatePassword(),
      generatePassword(),
    ];
    setGeneratedPasswords(passwords);
  };
  const selectPassword = (pwd) => {
    setFormData((prev) => ({
      ...prev,
      password: pwd,
    }));
  };
 const handleSubmit = (event) => {
  event.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!username || !email || !password) {
    toast.error("All fields are required");
    return;
  }

  if (!emailRegex.test(email)) {
    toast.error("Invalid email format");
    return;
  }

  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
    );
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    toast.error("Email already registered");
    return;
  }

  const newUser = {
    id: crypto.randomUUID(),
    username,
    email,
    phone,
    password: password, 
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  toast.success("Account created successfully");
  navigate("/signin");
};

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>

      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleChange}
              placeholder="User Name"
              className="mb-6 w-full px-4 py-2 text-xl border rounded"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="mb-4 w-full px-4 py-2 text-lg border rounded"
            />
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Phone number (Optional)"
              className="mb-4 w-full px-4 py-2 text-lg border rounded"
            />
            <div className="relative mb-3 ">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-2 text-lg border rounded"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <button
              type="button"
              onClick={handleGeneratePasswords}
              className="mb-4 text-m text-blue-600 hover:underline cursor-pointer"
            >
              Generate strong passwords
            </button>
            {generatedPasswords.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-3">
                {generatedPasswords.map((pwd, index) => (
                  <div
                    key={index}
                    onClick={() => selectPassword(pwd)}
                    className="cursor-pointer bg-gray-100 px-3 py-2 rounded text-sm hover:bg-blue-100"
                  >
                    {pwd}
                  </div>
                ))}
                <p className="text-xs text-gray-500">
                  Click a password to use it
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
            <p className="text-center mt-5">
              Already have an account?
              <Link to="/signin" className="text-red-600 ml-1">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
