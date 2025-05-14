package com.jobtracker.auth_service.controllers;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.jobtracker.auth_service.services.AuthService;
import com.jobtracker.auth_service.utils.LoginRequest;
import com.jobtracker.auth_service.utils.LoginResponse;
import com.jobtracker.auth_service.utils.RegisterRequest;
import com.jobtracker.auth_service.utils.RegisterResponse;


import lombok.RequiredArgsConstructor;

import java.util.Collections;

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

    @DeleteMapping("/{email}")
    @Transactional // essential
    public ResponseEntity<String> delete(@PathVariable String email, HttpServletRequest request) {
        String deletedUser = authService.delete(email);
        return ResponseEntity.ok(deletedUser);
    }


}