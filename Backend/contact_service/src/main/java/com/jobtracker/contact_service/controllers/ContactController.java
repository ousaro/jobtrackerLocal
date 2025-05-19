package com.jobtracker.contact_service.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobtracker.contact_service.Utils.ContactRequest;
import com.jobtracker.contact_service.Utils.ContactResponse;
import com.jobtracker.contact_service.services.ContactService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("contacts")
@RequiredArgsConstructor
public class ContactController {

    final private ContactService service;

    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Contact Service is up and running!");
    }


    @PostMapping("/")
    public ResponseEntity<ContactResponse> create(@RequestBody ContactRequest request) {
        return ResponseEntity.ok(service.createContact(request));
    }

    @GetMapping("/")
    public ResponseEntity<List<ContactResponse>> findAll() {
        return ResponseEntity.ok(service.getAllContacts());
    }

    @PostMapping("/ids")
    public ResponseEntity<List<ContactResponse>> getContactsByIds(@RequestBody List<String> ids) {
        return ResponseEntity.ok(service.getContactByIds(ids));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponse> findById(@PathVariable String id) {
        ContactResponse res = service.getContactById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactResponse> update(@PathVariable String id, @RequestBody ContactRequest request) {
        ContactResponse res = service.updateContact(id, request);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        return service.deleteContact(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
