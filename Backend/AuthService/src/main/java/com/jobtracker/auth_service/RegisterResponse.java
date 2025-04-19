package com.jobtracker.auth_service;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponse {

    private String email;
    private String fullName;
    private String phoneNumber;
    private String token;
}
