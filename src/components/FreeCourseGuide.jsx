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

  const resetForm = () => {
    setFormData({
      company: '',
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      phone: '',
      acceptedPrivacy: false,
    });
    setSubmitted(false);
    setShowPolicy(false);
  };

  return (
    <>
      <header className={styles.pageHeader}>
        <h1>Automations PRactice</h1>
        <p>n8n and Make.com automations testing</p>
      </header>

      <div className={styles.container}>
        <h2 className={styles.heading}>Form Submissions into G-Sheets</h2>

        {submitted ? (
          <>
            <p className={styles.thankYou}>Thanks! We'll be in touch soon.</p>
            <button
              type="button"
              onClick={resetForm}
              className={styles.submitButton}
            >
              Return to Form
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              className={styles.myInputClass}
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
            />
            <input
              className={styles.myInputClass}
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              className={styles.myInputClass}
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              className={styles.myInputClass}
              name="role"
              placeholder="Role/Title"
              value={formData.role}
              onChange={handleChange}
            />
            <input
              className={styles.myInputClass}
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={styles.myInputClass}
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

            <button
              className={styles.submitButton}
              type="submit"
              disabled={!isFormValid}
            >
              Submit
            </button>
          </form>
        )}

        <section className={styles.blogSection}>
          <h3 className={styles.blogTitle}>Blog Posting Testing</h3>
          <article className={styles.blogPost}>
            <h4 className={styles.postTitle}>
              Why Make.com Can’t Watch Your Google Drive (If You're Using Gmail)
            </h4>
            <p className={styles.postExcerpt}>
              Running into errors trying to use Make.com’s “Watch Files in Folder” with your Gmail?
              Google blocks certain permissions for personal accounts — but there’s a workaround.
              Learn how to automate blog publishing without a Workspace account.
            </p>
            <a
              className={styles.readMore}
              href="/blog/make-google-drive-restricted-scopes"
            >
              Read More →
            </a>
          </article>
        </section>

      </div>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} TuCielo. All rights reserved.</p>
      </footer>
    </>
  );
};

export default FreeCourseGuide;





