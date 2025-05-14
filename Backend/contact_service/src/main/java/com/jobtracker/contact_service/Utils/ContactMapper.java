package com.jobtracker.contact_service.Utils;

import org.springframework.stereotype.Service;

import com.jobtracker.contact_service.entities.Contact;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactMapper {
    
    public Contact toContact(ContactRequest request) {
        return Contact.builder()
            .jobId(request.getJobId())
            .name(request.getName())
            .email(request.getEmail())
            .phone(request.getPhone())
            .linkedIn(request.getLinkedIn())
            .role(request.getRole())
            .workingAt(request.getWorkingAt())
            .build();
    }

    public ContactResponse toContactResponse(Contact contact) {
        return ContactResponse.builder()
            .id(contact.getId())
            .jobId(contact.getJobId())
            .name(contact.getName())
            .email(contact.getEmail())
            .phone(contact.getPhone())
            .linkedIn(contact.getLinkedIn())
            .role(contact.getRole())
            .workingAt(contact.getWorkingAt())
            .createdDate(contact.getCreatedDate())
            .lastModifiedDate(contact.getLastModifiedDate())
            .build();
    }

    public ContactQueuePayload toContactQueuePayload(Contact contact){
        ContactQueueData data = new ContactQueueData();
        data.setId(contact.getId());
        data.setFullName(contact.getName());
        data.setPhoneNumber(contact.getPhone());
        return ContactQueuePayload.builder()
                .action("create")
                .data(data)
                .build();

    }

    public ContactQueuePayload toContactQueuePayload(String id){
        ContactQueueData data = new ContactQueueData();
        data.setId(id);
        data.setFullName("");
        data.setPhoneNumber("");
        return ContactQueuePayload.builder()
                .action("delete")
                .data(data)
                .build();

    }


}


