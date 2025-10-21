package com.hirely.hirely.service;

import com.hirely.hirely.model.Application;
import com.hirely.hirely.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository repo;

    public void addApplication(Application application) {
        repo.save(application);
    }
}