package com.jobtracker.interview_service.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobtracker.interview_service.Utils.InterviewRequest;
import com.jobtracker.interview_service.Utils.InterviewResponse;
import com.jobtracker.interview_service.services.InterviewService;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("interviews")
@RequiredArgsConstructor
public class InterviewController {

    final private InterviewService service;

    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Interview Service is up and running!");
    }


    @PostMapping("/")
    public ResponseEntity<InterviewResponse> create(@RequestBody InterviewRequest request) {
        return ResponseEntity.ok(service.createInterview(request));
    }

    @GetMapping("/")
    public ResponseEntity<List<InterviewResponse>> findAll() {
        return ResponseEntity.ok(service.getAllInterviews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewResponse> findById(@PathVariable String id) {
        InterviewResponse res = service.getInterviewById(id);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewResponse> update(@PathVariable String id, @RequestBody InterviewRequest request) {
        InterviewResponse res = service.updateInterview(id, request);
        return res != null ? ResponseEntity.ok(res) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        return service.deleteInterview(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
