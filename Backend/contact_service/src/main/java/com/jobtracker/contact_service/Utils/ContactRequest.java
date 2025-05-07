package com.jobtracker.contact_service.Utils;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactRequest {

    private String jobId;
    private String name;
    private String email;
    private String phone;
    private String linkedIn;
    private String role;
    private String workingAt;

}
