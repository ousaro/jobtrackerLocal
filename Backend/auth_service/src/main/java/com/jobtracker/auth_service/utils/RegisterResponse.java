package com.jobtracker.auth_service.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterResponse {

    private String token;
    private ProfileResponse profile;
}
