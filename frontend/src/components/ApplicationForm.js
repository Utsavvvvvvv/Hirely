import React, { useState } from 'react';

const ApplicationForm = ({ jobId, onApplicationSubmitted }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    resume: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const application = {
      ...formData,
      jobId: jobId
    };

    fetch('http://localhost:8080/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(application),
    })
    .then(response => {
        if(response.ok) {
            onApplicationSubmitted();
            setFormData({
                applicantName: '',
                resume: '',
                message: ''
            });
        }
    })
    .catch(error => console.error('Error submitting application:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <h2>Apply for this Job</h2>
      <input
        type="text"
        name="applicantName"
        value={formData.applicantName}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        type="text"
        name="resume"
        value={formData.resume}
        onChange={handleChange}
        placeholder="Link to your resume"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message"
        required
      />
      <button type="submit">Submit Application</button>
    </form>
  );
};

export default ApplicationForm;