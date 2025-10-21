package com.hirely.hirely.controller;

import com.hirely.hirely.model.JobPost;
import com.hirely.hirely.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class JobPostController {

    @Autowired
    private JobPostService service;

    @GetMapping("/job-posts")
    public List<JobPost> getAllJobs(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "experience", required = false) String experience,
            @RequestParam(value = "techStack", required = false) String techStack) {
        if (keyword != null || experience != null || techStack != null) {
            return service.search(keyword, experience, techStack);
        }
        return service.getAllJobs();
    }

    @GetMapping("/job-posts/{postId}")
    public JobPost getJob(@PathVariable int postId) {
        return service.getJob(postId);
    }

    @PostMapping("/create-job-post")
    public void addJob(@RequestBody JobPost jobPost) {
        service.addJob(jobPost);
    }

    @PutMapping("/job-posts")
    public JobPost updateJob(@RequestBody JobPost jobPost) {
        return service.updateJob(jobPost);
    }

    @DeleteMapping("/job-posts/{postId}")
    public void deleteJob(@PathVariable int postId) {
        service.deleteJob(postId);
    }
}