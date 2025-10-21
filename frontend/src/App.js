import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobPostForm from './components/JobPostForm';
import JobDetails from './components/JobDetails';
import NotFound from './components/NotFound';

function App() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [experience, setExperience] = useState('');
  const [techStack, setTechStack] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = (searchKeyword = '', searchExperience = '', searchTechStack = '') => {
    let url = 'http://localhost:8080/job-posts';
    const params = [];
    if (searchKeyword) params.push(`keyword=${searchKeyword}`);
    if (searchExperience) {
      const [min, max] = searchExperience.split('-').map(e => e.trim());
      if (min) params.push(`minExperience=${min}`);
      if (max) params.push(`maxExperience=${max}`);
    }
    if (searchTechStack) params.push(`techStack=${searchTechStack}`);
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(keyword, experience, techStack);
  };

  const handleJobAdded = () => {
    fetchJobs();
    setEditingJob(null);
  };

  const handleDelete = (postId) => {
    fetch(`http://localhost:8080/job-posts/${postId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        fetchJobs();
      }
    })
    .catch(error => console.error('Error deleting job post:', error));
  };

  const handleEdit = (job) => {
    setEditingJob(job);
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Hirely Job Portal</Link></h1>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for jobs..."
            />
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Experience (e.g., 0-2)"
            />
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="Tech Stack (e.g., Java)"
            />
            <button type="submit">Search</button>
          </form>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <JobPostForm onJobAdded={handleJobAdded} jobToEdit={editingJob} />
                <div className="job-listings">
                  {jobs.length > 0 ? (
                    currentJobs.map(job => (
                      <div key={job.postId} className="job-card">
                        <Link to={`/job-posts/${job.postId}`}>
                          <h2>{job.postProfile}</h2>
                        </Link>
                        <p>{job.postDesc}</p>
                        <p><strong>Experience:</strong> {job.reqExperience} years</p>
                        <div>
                          <strong>Skills:</strong>
                          {job.postTechStack && job.postTechStack.map((tech, index) => (
                            <span key={index} className="tech-stack">{tech}</span>
                          ))}
                        </div>
                        <div className="job-card-buttons">
                          <button onClick={() => handleEdit(job)}>Update</button>
                          <button onClick={() => handleDelete(job.postId)}>Delete</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No job posts found.</p>
                  )}
                </div>
                <div className="pagination">
                  {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
                    <button key={i + 1} onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            } />
            <Route path="/job-posts/:postId" element={<JobDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
