package com.hirely.hirely.service;

import com.hirely.hirely.model.JobPost;
import com.hirely.hirely.repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostService {

    @Autowired
    private JobPostRepository repo;

    public List<JobPost> getAllJobs() {
        return repo.findAll();
    }

    public JobPost getJob(int postId) {
        return repo.findById(postId).orElse(null);
    }

    public void addJob(JobPost jobPost) {
        repo.save(jobPost);
    }

    public JobPost updateJob(JobPost jobPost) {
        return repo.save(jobPost);
    }

    public void deleteJob(int postId) {
        repo.deleteById(postId);
    }

    public List<JobPost> search(String keyword, String experience, String techStack) {
        Integer minExperience = null;
        Integer maxExperience = null;

        if (experience != null && !experience.isEmpty()) {
            String[] parts = experience.split("-");
            if (parts.length == 2) {
                try {
                    minExperience = Integer.parseInt(parts[0]);
                    maxExperience = Integer.parseInt(parts[1]);
                } catch (NumberFormatException e) {
                    // Handle parsing error
                }
            }
        }

        return repo.findByFilters(keyword, minExperience, maxExperience, techStack);
    }
}