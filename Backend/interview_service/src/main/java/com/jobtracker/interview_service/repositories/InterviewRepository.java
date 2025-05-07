package com.jobtracker.interview_service.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jobtracker.interview_service.entities.Interview;

public interface InterviewRepository extends MongoRepository<Interview, String> {
    
}

