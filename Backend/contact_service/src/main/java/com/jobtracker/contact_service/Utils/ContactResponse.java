package com.jobtracker.contact_service.Utils;


import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ContactResponse {
    
    private String id;
    private String jobId;
    private String name;
    private String email;
    private String phone;
    private String linkedIn;
    private String role;
    private String workingAt;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;

}
