package com.jobtracker.interview_service.Utils;

import org.springframework.stereotype.Service;

import com.jobtracker.interview_service.entities.Interview;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewMapper {
    
    public Interview toInterview(InterviewRequest request) {
        return Interview.builder()
            .jobId(request.getJobId())
            .companyName(request.getCompanyName())
            .positionTitle(request.getPositionTitle())
            .dateTime(request.getDateTime())
            .type(request.getType())
            .notes(request.getNotes())
            .preparationDetails(request.getPreparationDetails())
            .build();
    }

    public InterviewResponse toInterviewResponse(Interview interview) {
        return InterviewResponse.builder()
            .id(interview.getId())
            .jobId(interview.getJobId())
            .companyName(interview.getCompanyName())
            .positionTitle(interview.getPositionTitle())
            .dateTime(interview.getDateTime())
            .type(interview.getType())
            .notes(interview.getNotes())
            .preparationDetails(interview.getPreparationDetails())
            .createdDate(interview.getCreatedDate())
            .lastModifiedDate(interview.getLastModifiedDate())
            .build();
    }


}


