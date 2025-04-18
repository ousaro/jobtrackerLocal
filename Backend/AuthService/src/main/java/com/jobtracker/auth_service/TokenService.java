package com.jobtracker.auth_service;

import java.security.interfaces.RSAPrivateKey;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenService {

    @Value("${spring.security.oauth2.resourceserver.jwt.expiration}")
    private long jwtExpiration;
    
    @Autowired
    private RSAPrivateKey privateKey;


    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .claim("roles", "ROLE_USER")
            .signWith(privateKey, SignatureAlgorithm.RS256)
            .compact();
    }
}