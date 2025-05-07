package com.jobtracker.contact_service.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jobtracker.contact_service.entities.Contact;

public interface ContactRepository extends MongoRepository<Contact, String> {
    
}

