package com.jobtracker.contact_service.Utils;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ContactQueuePayload {

    String action;
    ContactQueueData data;

}
