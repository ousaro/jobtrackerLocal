# 🛡️ Auth Service

**Auth Service** is a Spring Boot microservice responsible for **user authentication and authorization** in the JobTracker application. It provides:

- ✅ User registration & login  
- 🔐 Secure password management with BCrypt
- 🔄 JWT token generation and validation
- 🔗 Service integration with other microservices
- 📊 Consul service registration and health checks

Built with Spring Boot, Spring Security, and PostgreSQL for robust authentication management.

---

## 🛠️ Technology Stack

- **Framework:** Spring Boot 3.4.4
- **Security:** Spring Security + JWT
- **Database:** PostgreSQL 
- **ORM:** Spring Data JPA
- **Service Discovery:** Consul
- **Build Tool:** Maven
- **Java Version:** JDK 17

---

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- PostgreSQL database
- Consul (for service discovery)

### 1. Clone the Repository

```bash
git clone https://github.com/ousaro/JobTracker.git
cd JobTracker/Backend/auth_service
```

### 2. Configure Database

Create a PostgreSQL database for the auth service or use Docker:

```bash
# Using Docker for PostgreSQL
docker run --name auth-postgres -e POSTGRES_DB=auth_db -e POSTGRES_USER=auth_user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:latest
```

### 3. Configure Environment Variables

Create `application-local.properties` or set environment variables:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/auth_db
spring.datasource.username=auth_user
spring.datasource.password=password

# JWT Configuration
jwt.secret=your-secret-key
jwt.expiration=86400000

# Consul Configuration
spring.cloud.consul.host=localhost
spring.cloud.consul.port=8500
spring.application.name=auth-service
```

### 4. Run the Service

```bash
# Using Maven
./mvnw spring-boot:run

# Or using Docker
docker-compose up --build
```

### 5. Access the Service

- **Auth API Endpoint:** http://localhost:8080/api/auth/
- **Health Check:** http://localhost:8080/actuator/health
- **API Documentation:** http://localhost:8080/swagger-ui.html (if configured)

---

## 🛢️ Database Setup & Management

The service uses **PostgreSQL** as the database. The database schema will be created automatically when the service starts.

### Using Docker for Development

```bash
# Start PostgreSQL with Docker
docker run --name auth-postgres \
  -e POSTGRES_DB=auth_db \
  -e POSTGRES_USER=auth_user \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:latest
```

### Using Adminer for Database Management

You can use Adminer to manage the database:

```bash
# Start Adminer
docker run --name adminer -p 5050:8080 --link auth-postgres:db -d adminer
```

- **Adminer URL:** http://localhost:5050
- **Connection Details:**

  | Field    | Value             |
  |----------|-------------------|
  | System   | PostgreSQL        |
  | Server   | db                |
  | Username | auth_user         |
  | Password | password          |
  | Database | auth_db           |

---

## 📋 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/refresh` | Refresh JWT token |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user info |

### Example Requests

#### Register User
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

## 📁 Folder Structure

```plaintext
AuthService/
├── src/main/java/com/example/authservice/   # Main application code
│   ├── config/                              # Configuration classes (e.g., SecurityConfig, JWTConfig)
│   ├── controller/                          # Controllers for Auth API (e.g., AuthController)
│   ├── service/                             # Business logic for auth operations (e.g., AuthService)
│   ├── model/                               # Entity classes (e.g., User, Role)
│   ├── repository/                          # Database interaction (e.g., UserRepository)
│   ├── security/                            # Security-related classes (e.g., JWT filters)
│   └── util/                                # Utility classes (e.g., JWT utility, password hashing)
├── src/main/resources/
│   ├── application.properties               # Application configuration (e.g., DB connection, JWT secret)
│   ├── private.pem                         # Contains private JWT key for signing tokens
│   ├── public.pem                          # Contains public JWT key for verifying tokens
│   └── static/                              # Static files (if needed)
├── Dockerfile
├── docker-compose.yml
└── README.md
```
---

## ⚙️ Environment/Configuration Variables (`auth-service`)

Set these in your `application.yaml`, `application.properties`, or as environment variables.  
You can use the ENV-formatted version for `.env.example` or container deployment.

---

### YAML/Properties Structure

```yaml
server:
  port:

spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          public-key-location:
          expiration:

  application:
    name:

  services:
    profile-service:
      name:

  datasource:
    url:
    username:
    password:
    driver-class-name:

  jpa:
    hibernate:
      ddl-auto:
    properties:
      hibernate:
        dialect:

  cloud:
    consul:
      host:
      port:
      discovery:
        hostname:
        port:
        register:
        health-check-path:
        health-check-interval:
        service-name:
        instance-id:
```

---

### ENV File Template (`.env.example` / Docker Compose)

```env
SERVER_PORT=

SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_PUBLIC_KEY_LOCATION=
SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_EXPIRATION=

SPRING_APPLICATION_NAME=

SPRING_SERVICES_PROFILE_SERVICE_NAME=

SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
SPRING_DATASOURCE_DRIVER_CLASS_NAME=

SPRING_JPA_HIBERNATE_DDL_AUTO=
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=

CLOUD_CONSUL_HOST=
CLOUD_CONSUL_PORT=
CLOUD_CONSUL_DISCOVERY_HOSTNAME=
CLOUD_CONSUL_DISCOVERY_PORT=
CLOUD_CONSUL_DISCOVERY_REGISTER=
CLOUD_CONSUL_DISCOVERY_HEALTH_CHECK_PATH=
CLOUD_CONSUL_DISCOVERY_HEALTH_CHECK_INTERVAL=
CLOUD_CONSUL_DISCOVERY_SERVICE_NAME=
CLOUD_CONSUL_DISCOVERY_INSTANCE_ID=
```

---

### Variable Reference

| Variable (YAML/ENV)                                      | Description                                                        |
|----------------------------------------------------------|--------------------------------------------------------------------|
| `server.port` / `SERVER_PORT`                            | HTTP port for the service                                          |
| `spring.security.oauth2.resourceserver.jwt.public-key-location` / `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_PUBLIC_KEY_LOCATION` | Location of public key for JWT validation                          |
| `spring.security.oauth2.resourceserver.jwt.expiration` / `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_EXPIRATION` | JWT expiration time in ms (e.g. 7 days = `604800000`)              |
| `spring.application.name` / `SPRING_APPLICATION_NAME`     | Name of the application                                            |
| `spring.services.profile-service.name` / `SPRING_SERVICES_PROFILE_SERVICE_NAME` | Name of related profile/user service                               |
| `spring.datasource.url` / `SPRING_DATASOURCE_URL`         | Database URL (PostgreSQL)                                          |
| `spring.datasource.username` / `SPRING_DATASOURCE_USERNAME` | Database username                                                 |
| `spring.datasource.password` / `SPRING_DATASOURCE_PASSWORD` | Database password                                                 |
| `spring.datasource.driver-class-name` / `SPRING_DATASOURCE_DRIVER_CLASS_NAME` | JDBC driver class                                                 |
| `spring.jpa.hibernate.ddl-auto` / `SPRING_JPA_HIBERNATE_DDL_AUTO` | Hibernate DDL (e.g. `update`, `validate`)                          |
| `spring.jpa.properties.hibernate.dialect` / `SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT` | JPA dialect for PostgreSQL                                        |
| `cloud.consul.host` / `CLOUD_CONSUL_HOST`                 | Consul host for service discovery                                  |
| `cloud.consul.port` / `CLOUD_CONSUL_PORT`                 | Consul port                                                        |
| `cloud.consul.discovery.hostname` / `CLOUD_CONSUL_DISCOVERY_HOSTNAME` | Hostname/IP to advertise to Consul                                 |
| `cloud.consul.discovery.port` / `CLOUD_CONSUL_DISCOVERY_PORT`        | Port to register in Consul                                         |
| `cloud.consul.discovery.register` / `CLOUD_CONSUL_DISCOVERY_REGISTER`| Whether to register service (`true`/`false`)                       |
| `cloud.consul.discovery.health-check-path` / `CLOUD_CONSUL_DISCOVERY_HEALTH_CHECK_PATH`    | Consul health check endpoint (e.g. `/health`)                      |
| `cloud.consul.discovery.health-check-interval` / `CLOUD_CONSUL_DISCOVERY_HEALTH_CHECK_INTERVAL`| Consul health check interval (e.g. `10s`)                          |
| `cloud.consul.discovery.service-name` / `CLOUD_CONSUL_DISCOVERY_SERVICE_NAME`| Name in Consul                                                    |
| `cloud.consul.discovery.instance-id` / `CLOUD_CONSUL_DISCOVERY_INSTANCE_ID`| Unique Consul instance ID                                          |

---

> [🔗 Back to main Job Tracker README](../../README.md)  

---

## 📬 API Endpoints

Sample base URL: `http://localhost:8080/api/auth/`

- `POST /register` – Register a new user  
- `POST /login` – Authenticate user and return token  

---

## 🗝️ JWT Configuration

In the src/main/resources directory, you will find two important files for JWT configuration:

`private.pom`
    - Contains the private key used for signing JWT tokens.

    - Purpose: Used to create secure tokens that can be sent to clients during the authentication process.

`public.pom`  
    - Contains the corresponding public key used for verifying the JWT tokens.

    - Purpose: This key is used by the service to ensure that the tokens received from clients are valid and haven't been tampered with.

These files should be kept secure and should not be shared publicly, as they are crucial to maintaining the integrity of the authentication process.

## 📌 Notes

- The service is containerized using Docker for easy deployment and local development.
- PostgreSQL data is stored in a volume to persist across restarts.
- This service is designed to be integrated with other microservices in a larger system.

---

## 🧪 Future Improvements

- OAuth2 / Social login integration  
- Role-based access control (RBAC)  
- Rate limiting & brute-force protection  
- Unit and integration test coverage

---