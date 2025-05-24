## ⚙️ Environment/Configuration Variables (`contact-service`)

Add these keys and values to your `application.yaml`, `application.properties`, or set them as environment variables.
You can use this as a template for your `.env.example`.

---

### Example (`application.yaml` style)

```yaml
server:
  port:

spring:
  application:
    name:
  data:
    mongodb:
      uri:
      username:
      password:
  rabbitmq:
    host:
    port:
    username:
    password:
    contact-queue:

jobtracker:
  rabbitmq:
    exchange:
    routingkey:
      interview:
        created:  # Should correspond to contact.created
        updated:  # Should correspond to contact.updated

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

### Example (Spring ENV style - `.env` or Docker)

```env
SERVER_PORT=
SPRING_APPLICATION_NAME=
SPRING_DATA_MONGODB_URI=
SPRING_DATA_MONGODB_USERNAME=
SPRING_DATA_MONGODB_PASSWORD=
SPRING_RABBITMQ_HOST=
SPRING_RABBITMQ_PORT=
SPRING_RABBITMQ_USERNAME=
SPRING_RABBITMQ_PASSWORD=
SPRING_RABBITMQ_CONTACT_QUEUE=
JOBTRACKER_RABBITMQ_EXCHANGE=
JOBTRACKER_RABBITMQ_ROUTINGKEY_INTERVIEW_CREATED=
JOBTRACKER_RABBITMQ_ROUTINGKEY_INTERVIEW_UPDATED=
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

| Key / Variable                                         | Description                                                        |
|--------------------------------------------------------|--------------------------------------------------------------------|
| `SERVER_PORT` / `server.port`                          | Port for the contact-service HTTP server                           |
| `SPRING_APPLICATION_NAME` / `spring.application.name`   | Name of this service instance (for Consul etc.)                    |
| `SPRING_DATA_MONGODB_URI`                              | MongoDB connection URI for "Contacts" database                     |
| `SPRING_DATA_MONGODB_USERNAME`                         | MongoDB username                                                   |
| `SPRING_DATA_MONGODB_PASSWORD`                         | MongoDB password                                                   |
| `SPRING_RABBITMQ_HOST`                                 | RabbitMQ host/ip                                                   |
| `SPRING_RABBITMQ_PORT`                                 | RabbitMQ port                                                      |
| `SPRING_RABBITMQ_USERNAME`                             | RabbitMQ username                                                  |
| `SPRING_RABBITMQ_PASSWORD`                             | RabbitMQ password                                                  |
| `SPRING_RABBITMQ_CONTACT_QUEUE`                        | RabbitMQ queue for contact indexing                                |
| `JOBTRACKER_RABBITMQ_EXCHANGE`                         | RabbitMQ exchange name for jobtracker events                       |
| `JOBTRACKER_RABBITMQ_ROUTINGKEY_INTERVIEW_CREATED`      | Routing key for contact creation events                            |
| `JOBTRACKER_RABBITMQ_ROUTINGKEY_INTERVIEW_UPDATED`      | Routing key for contact update events                              |
| `CLOUD_CONSUL_HOST`                                    | Consul agent/server host                                           |
| `CLOUD_CONSUL_PORT`                                    | Consul API port                                                    |
| `CLOUD_CONSUL_DISCOVERY_HOSTNAME`                      | Host/IP to advertise to Consul for service discovery               |
| `CLOUD_CONSUL_DISCOVERY_PORT`                          | Port to advertise to Consul (usually `${SERVER_PORT}`)             |
| `CLOUD_CONSUL_DISCOVERY_REGISTER`                      | Whether to register the service in Consul (`true`/`false`)         |
| `CLOUD_CONSUL_DISCOVERY_HEALTH_CHECK_PATH`             | HTTP path for Consul health checks                                 |
| `CLOUD_CONSUL_DISCOVERY_HEALTH_CHECK_INTERVAL`         | Health check polling interval for Consul                           |
| `CLOUD_CONSUL_DISCOVERY_SERVICE_NAME`                  | Name of service in Consul registry                                 |
| `CLOUD_CONSUL_DISCOVERY_INSTANCE_ID`                   | Unique ID for this instance in Consul                              |

---

> [🔗 Back to main Job Tracker README](../../README.md)  
