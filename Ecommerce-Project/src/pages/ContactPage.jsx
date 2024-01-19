import React, { useState } from 'react';
import axios from 'axios';
import styles from './ContactPage.module.css'; // Assuming you have a CSS module for this component

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
  else if (formData.name.length < 2) formErrors.name = 'Name must be at least 2 characters';
    if (!formData.email) formErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Email address is invalid';
    if (!formData.message) formErrors.message = 'Message is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('https://js2-ecommerce-api.vercel.app/api/messages', formData);
        setSubmissionMessage(response.data.message);
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } catch (error) {
        console.error('Error sending message:', error);
        setSubmissionMessage('Failed to send message.');
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Kontakta oss</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Namn:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Meddelande:</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
          />
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>Send Message</button>
        {submissionMessage && <p className={styles.submissionMessage}>{submissionMessage}</p>}
      </form>
    </div>
  );
};

export default ContactPage;