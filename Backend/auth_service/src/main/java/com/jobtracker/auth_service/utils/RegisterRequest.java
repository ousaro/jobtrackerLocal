package com.jobtracker.auth_service.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    
    private String email;
    private String password;
    private String fullName;
    private String phone;
    
}
