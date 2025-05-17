package com.jobtracker.auth_service.utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileResponse {

    private String _id;
    private String fullName;
    private String email;
    private String phone;
    private String createdAt;
    private String updatedAt;
}
