package com.jobtracker.interview_service.Utils;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InterviewRequest {

    private String jobId;
    private String companyName;
    private String positionTitle;
    private LocalDateTime dateTime;
    private String type; // ONLINE, ONSITE, PHONE
    private String notes;
    private String preparationDetails;

}
