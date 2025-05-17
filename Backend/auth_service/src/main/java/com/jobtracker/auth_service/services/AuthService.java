package com.jobtracker.auth_service.services;

import com.jobtracker.auth_service.utils.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.jobtracker.auth_service.entities.User;
import com.jobtracker.auth_service.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final RestTemplate restTemplate;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final DiscoveryClient discoveryClient;

    @Value("${spring.services.profile-service.url}")
    private String profileServiceUrl;
    @Value("${spring.services.profile-service.name}")
    private String profileServiceName;


    public boolean isServiceAvailable(String serviceName) {
        List<ServiceInstance> instances = discoveryClient.getInstances(serviceName);
        return (instances != null && !instances.isEmpty());
    }


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

         //Call Profile Service to create or update profile
        try {

            ProfileRequest profileRequest = new ProfileRequest();
            profileRequest.setEmail(user.getEmail());
            profileRequest.setFullName(user.getFullName());
            profileRequest.setPhone(request.getPhone());

            if(!isServiceAvailable(profileServiceName)) throw new RuntimeException("No such service found");
            // Send the request to the Profile Service
            ResponseEntity<ProfileResponse> response = restTemplate.postForEntity(profileServiceUrl, profileRequest, ProfileResponse.class);

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Profile creation failed");
            }

            // If Profile Service is successful, issue token
            RegisterResponse registerResponse = new RegisterResponse();
            registerResponse.setToken(tokenService.generateToken(user.getEmail()));
            registerResponse.setProfile(response.getBody());

            return registerResponse;

        } catch (Exception e) {
            // If Profile Service fails, roll back user creation
            userRepository.delete(user); // Rollback user creation in case of failure
            throw new RuntimeException("User registration failed: " + e.getMessage());
        }
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

        //Call Profile Service to create or update profile
        try {


            if(!isServiceAvailable(profileServiceName)) throw new RuntimeException("No such service found");

            ResponseEntity<ProfileResponse> response = restTemplate.getForEntity(profileServiceUrl+"/email/" +user.getEmail(), ProfileResponse.class);
            // Send the request to the Profile Service



            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Profile creation failed");
            }



            // Prepare response
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setToken(token);
            loginResponse.setProfile(response.getBody());

            return loginResponse;

        } catch (Exception e) {
            throw new RuntimeException("User login failed: " + e.getMessage());
        }

    }

    public String delete(String email) {
        // Delete user locally
        userRepository.deleteByEmail(email);

        return email;
    }



}
