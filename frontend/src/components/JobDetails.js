import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApplicationForm from './ApplicationForm';

const JobDetails = () => {
  const { postId } = useParams();
  const [job, setJob] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/job-posts/${postId}`)
      .then(response => response.json())
      .then(data => setJob(data))
      .catch(error => console.error('Error fetching job details:', error));
  }, [postId]);

  const handleApplicationSubmitted = () => {
    setApplicationSubmitted(true);
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h1>{job.postProfile}</h1>
      <p>{job.postDesc}</p>
      <p><strong>Experience:</strong> {job.reqExperience} years</p>
      <div>
        <strong>Skills:</strong>
        {job.postTechStack && job.postTechStack.map((tech, index) => (
          <span key={index} className="tech-stack">{tech}</span>
        ))}
      </div>
      {applicationSubmitted ? (
        <p>Your application has been submitted successfully!</p>
      ) : (
        <ApplicationForm jobId={job.postId} onApplicationSubmitted={handleApplicationSubmitted} />
      )}
    </div>
  );
};

export default JobDetails;