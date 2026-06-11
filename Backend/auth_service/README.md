# Auth Service

User authentication and authorization microservice for the JobTracker platform. Provides secure registration, login, and JWT-based identity management with PostgreSQL persistence.

## Tech Stack

- **Runtime:** Java 17 (Spring Boot 3.4.4)
- **Database:** PostgreSQL (Spring Data JPA / Hibernate)
- **Security:** Spring Security + OAuth2 Resource Server (RS256 JWT)
- **Service Discovery:** HashiCorp Consul
- **Build Tool:** Maven

## API Endpoints

All routes are prefixed via Kong at `/api/auth-service`.

| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------|
| POST   | `/auth/register`      | Register a new user              |
| POST   | `/auth/login`         | Authenticate user, return JWT    |
| DELETE | `/auth/{email}`       | Delete user account by email     |
| GET    | `/health`             | Health check for Consul          |

## Getting Started

```bash
# Build and run with Maven
./mvnw spring-boot:run
```

The service listens on port `5000` by default.

### Prerequisites

- Java 17+
- PostgreSQL database
- Consul agent

### Database Setup

Create a PostgreSQL database and configure the connection via environment variables or `application-local.properties`.

## Configuration

### Environment Variables

| Variable | Description |
|---|---|
| `SERVER_PORT` | HTTP port |
| `SPRING_DATASOURCE_URL` | PostgreSQL JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | Database user |
| `SPRING_DATASOURCE_PASSWORD` | Database password |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_PUBLIC_KEY_LOCATION` | Path to RS256 public key |
| `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_EXPIRATION` | JWT expiry in ms |
| `CLOUD_CONSUL_HOST` | Consul agent host |
| `CLOUD_CONSUL_PORT` | Consul agent port |

## JWT Authentication

JWT tokens are signed with RS256 using a private key held by the auth service. Downstream services and the Kong gateway verify tokens using the corresponding public key (`keys/public.pem`).

- Registration hashes passwords with BCrypt before persisting
- Login validates credentials and returns a signed JWT access token
- The DELETE endpoint allows account removal coordinated with the user service saga

## Project Structure

```
src/main/java/com/jobtracker/auth_service/
├── controllers/
│   ├── AuthController.java
│   └── HealthController.java
├── models/
├── repositories/
├── services/
└── security/
```
