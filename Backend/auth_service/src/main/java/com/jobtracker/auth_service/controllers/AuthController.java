package com.jobtracker.auth_service.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobtracker.auth_service.services.AuthService;
import com.jobtracker.auth_service.utils.LoginRequest;
import com.jobtracker.auth_service.utils.LoginResponse;
import com.jobtracker.auth_service.utils.RegisterRequest;
import com.jobtracker.auth_service.utils.RegisterResponse;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {       
        return ResponseEntity.ok(authService.register(registerRequest));
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {       
        return ResponseEntity.ok(authService.login(loginRequest));
    }

}