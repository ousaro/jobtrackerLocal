package com.jobtracker.auth_service.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping("/{email}")
    public ResponseEntity<String> delete(@PathVariable String email) {
        String deletedUser = authService.delete(email);
        return ResponseEntity.ok(deletedUser);
    }


}