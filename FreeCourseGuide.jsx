import React, { useState } from 'react';
import './FreeCourseGuide.css';

const FreeCourseGuide = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://hook.us2.make.com/mkmbcvitg1dlpbkr8akdio3gb6qs2ayh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '' });
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="free-course-container">
      <h2>Get Your FREE Guide to Automation with n8n and Make.com</h2>
      <p>Learn how to use automation tools to streamline your business – completely free.</p>
      <form className="free-course-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">Send Me the Guide</button>
        {success && <p className="success-message">Thank you! Your guide is on the way.</p>}
      </form>
    </section>
  );
};

export default FreeCourseGuide;
