# Contact Service

Professional contact management microservice for the JobTracker platform. Provides full CRUD over contact records with event-driven search index synchronization.

## Tech Stack

- **Runtime:** Java 17 (Spring Boot 3.4.5)
- **Database:** MongoDB (Spring Data MongoDB)
- **Service Discovery:** HashiCorp Consul
- **Messaging:** RabbitMQ (Spring AMQP)
- **Build Tool:** Maven

## API Endpoints

All routes are prefixed via Kong at `/api/contact-service`.

| Method | Path             | Description                         |
|--------|------------------|-------------------------------------|
| GET    | `/contacts/`      | List all contacts                   |
| POST   | `/contacts/`      | Create a new contact                |
| GET    | `/contacts/{id}`  | Get contact by ID                   |
| PUT    | `/contacts/{id}`  | Update a contact                    |
| DELETE | `/contacts/{id}`  | Delete a contact                    |
| POST   | `/contacts/ids`   | Bulk retrieve contacts by IDs       |
| GET    | `/health`         | Health check for Consul             |

## Getting Started

```bash
# Build and run with Maven
./mvnw spring-boot:run
```

The service listens on port `5004` by default.

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
| `jobtracker.rabbitmq.routingkey.contact.created` | Routing key for create events |
| `jobtracker.rabbitmq.routingkey.contact.updated` | Routing key for update events |
| `cloud.consul.host` | Consul agent host |
| `cloud.consul.port` | Consul agent port |
| `cloud.consul.discovery.hostname` | Advertised hostname for Consul |

## Project Structure

```
src/main/java/com/jobtracker/contact_service/
├── controllers/
│   ├── ContactController.java
│   └── HealthController.java
├── models/
├── repositories/
├── services/
└── config/
```
