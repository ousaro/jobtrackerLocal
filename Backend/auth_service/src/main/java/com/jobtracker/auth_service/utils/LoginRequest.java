package com.jobtracker.auth_service.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    
    private String email;
    private String password;
}
