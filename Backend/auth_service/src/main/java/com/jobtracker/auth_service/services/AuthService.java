package com.jobtracker.auth_service.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobtracker.auth_service.entities.User;
import com.jobtracker.auth_service.repositories.UserRepository;
import com.jobtracker.auth_service.utils.LoginRequest;
import com.jobtracker.auth_service.utils.LoginResponse;
import com.jobtracker.auth_service.utils.RegisterRequest;
import com.jobtracker.auth_service.utils.RegisterResponse;

import lombok.RequiredArgsConstructor;




@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public RegisterResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = User.builder()
                .email(request.getEmail())
                .fullName(request.getFullName())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        // Prepare response
        RegisterResponse registerResponse = new RegisterResponse();
        registerResponse.setEmail(user.getEmail());
        registerResponse.setFullName(user.getFullName());
        registerResponse.setPhone(request.getPhone());
        registerResponse.setToken(tokenService.generateToken(user.getEmail()));

        return registerResponse;
    }

    public LoginResponse login(LoginRequest request) {
        // Find user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Validate password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate token
        String token = tokenService.generateToken(user.getEmail());

        // Prepare response
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);

        return loginResponse;
    }

    public String rollback() {
        // Get the last user added
        User lastUser = userRepository.findTopByOrderByIdDesc()
                .orElseThrow(() -> new RuntimeException("No users found to rollback"));
        
        // Delete the user
        userRepository.delete(lastUser);
        
        return "Success";
    }

    
}
