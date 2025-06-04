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
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isFormValid = Object.values(formData).every(value =>
    typeof value === 'boolean' ? value : value.trim() !== ''
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    await fetch('https://hook.us2.make.com/mkmbcvitg1dlpbkr8akdio3gb6qs2ayh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <h2>Free Course Guide</h2>
      {submitted ? (
        <p className={styles.thankYou}>Thanks! We'll be in touch soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input name="company" placeholder="Company" onChange={handleChange} />
          <input name="firstName" placeholder="First Name" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} />
          <input name="role" placeholder="Role/Title" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />

          <div className={styles.privacy}>
            <input
              type="checkbox"
              name="acceptedPrivacy"
              checked={formData.acceptedPrivacy}
              onChange={handleChange}
            />
            <label>
              I agree to the{' '}
              <span onClick={() => setShowPolicy(!showPolicy)} className={styles.policyLink}>
                Privacy & Data Management Policy
              </span>
            </label>
          </div>

          {showPolicy && (
            <div className={styles.policyBox}>
              <p>
                This is a mock Privacy & Data Management Policy. We value your privacy and will not share your information.
              </p>
            </div>
          )}

          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FreeCourseGuide;
