# Interview Service

Interview scheduling and management microservice for the JobTracker platform. Provides full CRUD over interview records with event-driven search index synchronization.

## Tech Stack

- **Runtime:** Java 17 (Spring Boot 3.4.5)
- **Database:** MongoDB (Spring Data MongoDB)
- **Service Discovery:** HashiCorp Consul
- **Messaging:** RabbitMQ (Spring AMQP)
- **Build Tool:** Maven

## API Endpoints

All routes are prefixed via Kong at `/api/interview-service`.

| Method | Path              | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | `/interviews/`     | List all interviews                  |
| POST   | `/interviews/`     | Create a new interview               |
| GET    | `/interviews/{id}` | Get interview by ID                  |
| PUT    | `/interviews/{id}` | Update an interview                  |
| DELETE | `/interviews/{id}` | Delete an interview                  |
| POST   | `/interviews/ids`  | Bulk retrieve interviews by IDs      |
| GET    | `/health`          | Health check for Consul              |

## Getting Started

```bash
# Build and run with Maven
./mvnw spring-boot:run
```

The service listens on port `5003` by default.

### Prerequisites

- Java 17+
- MongoDB
- Consul agent
- RabbitMQ

## Configuration

### Key Properties

| Key | Description |
|---|---|
| `server.port` | HTTP port |
| `spring.data.mongodb.uri` | MongoDB connection URI |
| `spring.rabbitmq.host` | RabbitMQ host |
| `spring.rabbitmq.port` | RabbitMQ port |
| `jobtracker.rabbitmq.exchange` | Topic exchange name |
| `jobtracker.rabbitmq.routingkey.interview.created` | Routing key for create events |
| `jobtracker.rabbitmq.routingkey.interview.updated` | Routing key for update events |
| `cloud.consul.host` | Consul agent host |
| `cloud.consul.port` | Consul agent port |
| `cloud.consul.discovery.hostname` | Advertised hostname for Consul |

## Project Structure

```
src/main/java/com/jobtracker/interview_service/
├── controllers/
│   ├── InterviewController.java
│   └── HealthController.java
├── models/
├── repositories/
├── services/
└── config/
```
