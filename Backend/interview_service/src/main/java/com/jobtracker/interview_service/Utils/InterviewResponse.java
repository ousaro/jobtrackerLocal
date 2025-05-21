package com.jobtracker.interview_service.Utils;


import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class InterviewResponse {
    
    private String id;
    private String jobId;
    private String companyName;
    private String positionTitle;
    private String dateTime;
    private String type;
    private String notes;
    private String preparationDetails;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;

}
