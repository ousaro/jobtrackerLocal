package com.jobtracker.contact_service.services;


import com.jobtracker.contact_service.Utils.*;
import org.springframework.stereotype.Service;

import com.jobtracker.contact_service.entities.Contact;
import com.jobtracker.contact_service.repositories.ContactRepository;


import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContactService {


    final private ContactRepository repository;
    final private ContactMapper mapper;
    final private RabbitMQPublisher publisher;

    public ContactResponse createContact(ContactRequest request) {
        Contact contact = mapper.toContact(request);
        Contact savedContact = repository.save(contact);
        ContactQueuePayload payload = mapper.toContactQueuePayload(savedContact);
        publisher.publishToContactQueue(payload);
        return mapper.toContactResponse(savedContact);
    }

    public List<ContactResponse> getAllContacts() {
        // Fetch all Contacts from the repository and map them to ContactResponse and handle null values
        
        List<ContactResponse> contactResponses = repository.findAll().stream()
                .map(mapper::toContactResponse)
                .collect(Collectors.toList());
        // Filter out null values from the list
        contactResponses.removeIf(contactResponse -> contactResponse == null);
        return contactResponses;
       
    }

    public ContactResponse getContactById(String id) {
        Optional<Contact> contactOpt = repository.findById(id);
        return contactOpt.map(mapper::toContactResponse).orElse(null);
    }

    public ContactResponse updateContact(String id, ContactRequest request) {
        Optional<Contact> contactOpt = repository.findById(id);
        if (contactOpt.isPresent()) {
            Contact contact = contactOpt.get();
            // Only update fields if they are not null in the request
            if (request.getJobId() != null) {
                contact.setJobId(request.getJobId());
            }
            if (request.getName() != null) {
                contact.setName(request.getName());
            }
            if (request.getEmail() != null) {
                contact.setEmail(request.getEmail());
            }
            if (request.getPhone() != null) {
                contact.setPhone(request.getPhone());
            }
            if (request.getLinkedIn() != null) {
                contact.setLinkedIn(request.getLinkedIn());
            }
            if (request.getRole() != null) {
                contact.setRole(request.getRole());
            }
            if (request.getWorkingAt() != null) {
                contact.setWorkingAt(request.getWorkingAt());
            }
            Contact savedContact = repository.save(contact);
            ContactQueuePayload payload = mapper.toContactQueuePayload(savedContact);
            publisher.publishToContactQueue(payload);
            // Save and return the updated response
            return mapper.toContactResponse(savedContact);
        }
        return null;
    }
    

    public boolean deleteContact(String id) {
        if (repository.existsById(id)) {
            ContactQueuePayload payload = mapper.toContactQueuePayload(id);
            publisher.publishToContactQueue(payload);
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
