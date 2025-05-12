package com.jobtracker.auth_service.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileRequest {
    
    private String email;
    private String fullName;
    private String phone;
}
