package com.jobtracker.auth_service;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
@EntityListeners(AuditingEntityListener.class) // this annotation is used to automatically populate the createdDate and lastModifiedDate fields when the entity is created or updated.

public class User {


    @Id
    @GeneratedValue
    private Integer id;
    private String fullName;
    @Column(unique = true)
    private String email;
    private String password;

}
