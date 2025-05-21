package com.jobtracker.interview_service.services;


import com.jobtracker.interview_service.Utils.InterviewQueuePayload;
import org.springframework.stereotype.Service;

import com.jobtracker.interview_service.Utils.InterviewMapper;
import com.jobtracker.interview_service.Utils.InterviewRequest;
import com.jobtracker.interview_service.Utils.InterviewResponse;
import com.jobtracker.interview_service.entities.Interview;
import com.jobtracker.interview_service.repositories.InterviewRepository;


import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InterviewService {


    final private InterviewRepository repository;
    final private InterviewMapper mapper;
    final private RabbitMQPublisher rabbitMQService;

    public InterviewResponse createInterview(InterviewRequest request) {
        Interview interview = mapper.toInterview(request);
        Interview savedInterview = repository.save(interview);
        InterviewResponse resInterview = mapper.toInterviewResponse(savedInterview);
        InterviewQueuePayload payload = mapper.toInterviewQueuePayload(savedInterview);
        rabbitMQService.publishToInteviewQueue(payload);
        rabbitMQService.publishInterviewCreatedEvent(resInterview);
        return resInterview;
    }

    public List<InterviewResponse> getAllInterviews() {
        // Fetch all interviews from the repository and map them to InterviewResponse and handle null values
        
        List<InterviewResponse> interviewResponses = repository.findAll().stream()
                .map(mapper::toInterviewResponse)
                .collect(Collectors.toList());
        // Filter out null values from the list
        interviewResponses.removeIf(interviewResponse -> interviewResponse == null);
        return interviewResponses;
       
    }

    public List<InterviewResponse> getInterviewByIds(List<String> ids) {
        List<Interview> interviews = repository.findAllById(ids);

        // Map Contact entity to ContactResponse DTO
        return interviews.stream()
                .map(mapper::toInterviewResponse)
                .collect(Collectors.toList());
    }

    public InterviewResponse getInterviewById(String id) {
        Optional<Interview> interviewOpt = repository.findById(id);
        return interviewOpt.map(mapper::toInterviewResponse).orElse(null);
    }

    public InterviewResponse updateInterview(String id, InterviewRequest request) {
        Optional<Interview> interviewOpt = repository.findById(id);
        if (interviewOpt.isPresent()) {
            Interview interview = interviewOpt.get();
            // Only update fields if they are not null in the request
            if (request.getCompanyName() != null)
                interview.setCompanyName(request.getCompanyName());
            if (request.getPositionTitle() != null)
                interview.setPositionTitle(request.getPositionTitle());
            if (request.getDateTime() != null)
                interview.setDateTime(request.getDateTime());
            if (request.getType() != null)
                interview.setType(request.getType());
            if (request.getNotes() != null)
                interview.setNotes(request.getNotes());
            if (request.getPreparationDetails() != null)
                interview.setPreparationDetails(request.getPreparationDetails());
            // Save and return the updated response

            Interview savedInterview = repository.save(interview);
            InterviewResponse resInterview = mapper.toInterviewResponse(savedInterview);
            InterviewQueuePayload payload = mapper.toInterviewQueuePayload(savedInterview);
            rabbitMQService.publishToInteviewQueue(payload);
            rabbitMQService.publishInterviewUpdatedEvent(resInterview);
            return resInterview;
        }
        return null;
    }
    

    public boolean deleteInterview(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            InterviewQueuePayload payload = mapper.toInterviewQueuePayload(id);
            rabbitMQService.publishToInteviewQueue(payload);
            return true;
        }
        return false;
    }
}
