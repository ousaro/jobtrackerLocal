package com.jobtracker.interview_service.Utils;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class InterviewQueuePayload {

    String action;
    InterviewQueueData data;
}
