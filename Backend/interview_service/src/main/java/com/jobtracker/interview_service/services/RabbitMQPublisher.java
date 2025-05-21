package com.jobtracker.interview_service.services;

import com.jobtracker.interview_service.Utils.InterviewQueuePayload;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.jobtracker.interview_service.Utils.InterviewResponse;

@Service
public class RabbitMQPublisher {

    @Value("${jobtracker.rabbitmq.exchange}")
    String exchange;

    @Value("${jobtracker.rabbitmq.routingkey.interview.created}")
    String interviewCreatedRoutingKey;

    @Value("${jobtracker.rabbitmq.routingkey.interview.updated}")
    String interviewUpdatedRoutingKey;

    @Value("${spring.rabbitmq.interview-queue}")
    String interviewQueue;

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishInterviewCreatedEvent(InterviewResponse interview) {
        rabbitTemplate.convertAndSend(exchange, interviewCreatedRoutingKey, interview);
    }

    public void publishInterviewUpdatedEvent(InterviewResponse interview) {
        rabbitTemplate.convertAndSend(exchange, interviewUpdatedRoutingKey, interview);
    }

    public void publishToInteviewQueue(InterviewQueuePayload payload) {
        rabbitTemplate.convertAndSend(interviewQueue, payload);
    }
}
