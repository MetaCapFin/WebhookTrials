import React, { useState } from 'react';
import styles from '../styles/FreeCourseGuide.module.css';

const FreeCourseGuide = () => {
  const [formData, setFormData] = useState({
    company: '',
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    phone: '',
    acceptedPrivacy: false,
  });

  const [showPolicy, setShowPolicy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isFormValid = Object.values(formData).every((value) =>
    typeof value === 'boolean' ? value : value.trim() !== ''
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch(
        'https://hook.us2.make.com/mkmbcvitg1dlpbkr8akdio3gb6qs2ayh',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error('Webhook failed');

      setSubmitted(true);
    } catch (error) {
      alert('Submission failed. Please try again later.');
      console.error('Webhook error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Free Course Guide</h2>
      {submitted ? (
        <p className={styles.thankYou}>Thanks! We'll be in touch soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
          />
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            name="role"
            placeholder="Role/Title"
            value={formData.role}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <div className={styles.privacy}>
            <input
              type="checkbox"
              name="acceptedPrivacy"
              checked={formData.acceptedPrivacy}
              onChange={handleChange}
            />
            <label>
              I agree to the{' '}
              <span
                onClick={() => setShowPolicy(!showPolicy)}
                className={styles.policyLink}
              >
                Privacy & Data Management Policy
              </span>
            </label>
          </div>

          {showPolicy && (
            <div className={styles.policyBox}>
              <p>
                This is a mock Privacy & Data Management Policy. We value your
                privacy and will not share your information.
              </p>
            </div>
          )}

          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
        </form>
      
      <section className={styles.blogSection}>
        <h3 className={styles.blogTitle}>Latest Blog Post</h3>
        <article className={styles.blogPost}>
          <h4 className={styles.postTitle}>The Florida HOA Financing Crisis</h4>
          <p className={styles.postExcerpt}>
            Many Florida HOAs are facing unprecedented repair and insurance costs. Discover how innovative financing options are helping communities thrive.
          </p>
          <a className={styles.readMore} href="/blog/florida-hoa-financing-crisis">
            Read More →
          </a>
        </article>
      </section>

      )}
    </div>
  );
};

export default FreeCourseGuide;

