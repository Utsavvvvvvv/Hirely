
import React, { useState, useEffect } from 'react';

const JobPostForm = ({ onJobAdded, jobToEdit }) => {
  const [formData, setFormData] = useState({
    postProfile: '',
    postDesc: '',
    reqExperience: 0,
    postTechStack: ''
  });

  useEffect(() => {
    if (jobToEdit) {
      setFormData({
        ...jobToEdit,
        postTechStack: jobToEdit.postTechStack.join(', ')
      });
    } else {
      setFormData({
        postProfile: '',
        postDesc: '',
        reqExperience: 0,
        postTechStack: ''
      });
    }
  }, [jobToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobPost = {
      ...formData,
      postTechStack: formData.postTechStack.split(',').map(tech => tech.trim()),
      reqExperience: parseInt(formData.reqExperience, 10)
    };

    const url = jobToEdit ? 'http://localhost:8080/job-posts' : 'http://localhost:8080/create-job-post';
    const method = jobToEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobPost),
    })
    .then(response => {
        if(response.ok) {
            onJobAdded();
        }
    })
    .catch(error => console.error('Error saving job post:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="job-post-form">
      <h2>{jobToEdit ? 'Update Job Post' : 'Create Job Post'}</h2>
      <input
        type="text"
        name="postProfile"
        value={formData.postProfile}
        onChange={handleChange}
        placeholder="Job Profile"
        required
      />
      <textarea
        name="postDesc"
        value={formData.postDesc}
        onChange={handleChange}
        placeholder="Job Description"
        required
      />
      <input
        type="number"
        name="reqExperience"
        value={formData.reqExperience}
        onChange={handleChange}
        placeholder="Required Experience"
        required
      />
      <input
        type="text"
        name="postTechStack"
        value={formData.postTechStack}
        onChange={handleChange}
        placeholder="Tech Stack (comma-separated)"
        required
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default JobPostForm;