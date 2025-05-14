package com.jobtracker.contact_service.services;

import com.jobtracker.contact_service.Utils.ContactQueuePayload;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class RabbitMQPublisher {

    @Value("${spring.rabbitmq.contact-queue}")
    String contactQueue;

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishToContactQueue(ContactQueuePayload payload) {
        rabbitTemplate.convertAndSend(contactQueue, payload);
    }


}
