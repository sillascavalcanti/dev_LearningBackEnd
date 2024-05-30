package com.devlearning.devlerning.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devlearning.devlerning.service.AuthenticationService;

@RestController
public class AuthenticationController {
    private AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }
    
    @PostMapping("authenticate")
    public String authenticate(){
        return authenticationService.authenticate();
    }

}
