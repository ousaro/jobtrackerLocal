package com.jobtracker.interview_service.Utils;

import org.springframework.stereotype.Service;

import com.jobtracker.interview_service.entities.Interview;

import lombok.RequiredArgsConstructor;

import java.time.format.DateTimeFormatter;

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

    public InterviewQueuePayload toInterviewQueuePayload(Interview interview){
        InterviewQueueData data = new InterviewQueueData();
        data.setId(interview.getId());
        data.setType(interview.getType());
        // Convert LocalDateTime to ISO 8601 string
        String isoDateTime = interview.getDateTime().format(DateTimeFormatter.ISO_DATE_TIME);
        data.setDateTime(isoDateTime);
        String dateOnly = interview.getDateTime().toLocalDate().toString();
        data.setDate(dateOnly);
        return InterviewQueuePayload.builder()
                .action("create")
                .data(data)
                .build();

    }

    public InterviewQueuePayload toInterviewQueuePayload(String id){
        InterviewQueueData data = new InterviewQueueData();
        data.setId(id);
        data.setType("");
        data.setDateTime("");
        data.setDate("");
        return InterviewQueuePayload.builder()
                .action("delete")
                .data(data)
                .build();

    }


}


