package com.devlearning.devlerning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devlearning.devlerning.dto.AutenticationDTO;
import com.devlearning.devlerning.dto.UserDTO;
import com.devlearning.devlerning.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("user")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Void> register(@RequestBody UserDTO userDTO){
        userService.register(userDTO);
        return ResponseEntity.status(201).build();
    }

    @PostMapping("login")
    public ResponseEntity<UserDTO> autentication(@RequestBody AutenticationDTO autenticationDTO){
        return ResponseEntity.ok().body(userService.autication(autenticationDTO));
    }
    
}
