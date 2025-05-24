## ⚙️ Environment/Configuration Variables (`interview-service`)

These are the essential configuration keys for the `interview-service`.  
Add them to your `application.yaml`, `application.properties`, or pass as ENV vars (Spring Boot will automatically map most from ENV with the correct naming).

---

### Example (`application.yaml` format)

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
    interview-queue:

jobtracker:
  rabbitmq:
    exchange:
    routingkey:
      interview:
        created:
        updated:
  
  # Optionally add here any custom keys

cloud:
  consul:
    host:
    port:
    discovery:
      hostname:        # IP or name advertised for other services (for service discovery)
      port:            # Typically resolves from ${server.port}
      register:        # true/false to register in Consul
      health-check-path:
      health-check-interval:
      service-name:
      instance-id:
```

---

### Variable Reference

| Key/Variable                                       | Description                                                                    |
|----------------------------------------------------|--------------------------------------------------------------------------------|
| `server.port`                                      | Port interview-service listens on                                               |
| `spring.application.name`                          | Service name for Spring Boot/Consul registration                                |
| `spring.data.mongodb.uri`                          | MongoDB URI for "Interviews" database                                           |
| `spring.data.mongodb.username`                     | MongoDB user                                                                   |
| `spring.data.mongodb.password`                     | MongoDB password                                                               |
| `spring.rabbitmq.host`                             | RabbitMQ server hostname                                                       |
| `spring.rabbitmq.port`                             | RabbitMQ server port                                                           |
| `spring.rabbitmq.username`                         | RabbitMQ user                                                                  |
| `spring.rabbitmq.password`                         | RabbitMQ password                                                              |
| `spring.rabbitmq.interview-queue`                  | RabbitMQ queue for interview events                                            |
| `jobtracker.rabbitmq.exchange`                     | RabbitMQ exchange name                                                         |
| `jobtracker.rabbitmq.routingkey.interview.created` | Routing key for interview created event                                         |
| `jobtracker.rabbitmq.routingkey.interview.updated` | Routing key for interview updated event                                         |
| `cloud.consul.host`                                | Consul agent/server hostname                                                    |
| `cloud.consul.port`                                | Consul HTTP API port                                                           |
| `cloud.consul.discovery.hostname`                  | Advertised address for this service in Consul                                  |
| `cloud.consul.discovery.port`                      | Port advertised to Consul (usually `${server.port}`)                            |
| `cloud.consul.discovery.register`                  | Whether to register in Consul (`true`/`false`)                                 |
| `cloud.consul.discovery.health-check-path`         | Path for HTTP health check registered in Consul (`/health`)                     |
| `cloud.consul.discovery.health-check-interval`     | Health check interval (`10s`)                                                   |
| `cloud.consul.discovery.service-name`              | Service name for registration (`interview-service`)                             |
| `cloud.consul.discovery.instance-id`               | Unique instance ID for the service in Consul                                    |

---

### Example (Spring `.env` mapping):

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
SPRING_RABBITMQ_INTERVIEW_QUEUE=
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

**Tip:**  
- When running in Docker/Kubernetes, pass these as ENV vars or use a mounted config file.  
- Never commit secrets (passwords, keys) to source control!

---

> [🔗 Back to main Job Tracker README](../../README.md)  
