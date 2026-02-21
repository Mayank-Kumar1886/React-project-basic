import React, { useState } from "react";
import { FiMail, FiUser, FiMessageSquare, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, email, subject, message } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error("Please fill all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    const newContact = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    contacts.push(newContact);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    toast.success("Message sent successfully 🚀");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        
        
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">
            Contact Our Team
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Have questions about buying, selling, or renting a home?
            Our expert team is here to help you every step of the way.
            Send us a message and we’ll get back to you quickly.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
              <FiMail className="text-2xl text-blue-600" />
              <p className="text-gray-700">support@estate.com</p>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
              <FiUser className="text-2xl text-blue-600" />
              <p className="text-gray-700">24/7 Customer Support</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-10 rounded-2xl shadow-lg space-y-5
                     transition-all duration-300 hover:shadow-2xl"
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Send Message
          </h3>

          <div className="relative">
            <FiUser className="absolute top-4 left-3 text-gray-400" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute top-4 left-3 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="text"
            id="subject"
            value={subject}
            onChange={handleChange}
            placeholder="Subject (Optional)"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <FiMessageSquare className="absolute top-4 left-3 text-gray-400" />
            <textarea
              id="message"
              value={message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your message..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2
                       bg-blue-600 text-white py-3 rounded-lg
                       hover:bg-blue-700 transition-all duration-300
                       hover:scale-[1.02]"
          >
            Send Message <FiSend />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
