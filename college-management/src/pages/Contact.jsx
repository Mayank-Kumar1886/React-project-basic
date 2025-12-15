import React, { useState } from "react";
import "./UI_Pages/contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted:", formData);

    alert("Thank you for contacting us!");

    setFormData({ name: "", email: "", message: "" });
  };
  return (
    <section className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name{" "}
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Email{" "}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </label>
        <label>
          Message{" "}
          <input
            type="text"
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Contact;
