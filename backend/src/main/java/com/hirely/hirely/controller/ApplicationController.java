package com.hirely.hirely.controller;

import com.hirely.hirely.model.Application;
import com.hirely.hirely.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    @PostMapping("/apply")
    public void addApplication(@RequestBody Application application) {
        service.addApplication(application);
    }
}