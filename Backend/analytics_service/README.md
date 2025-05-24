## ⚙️ Environment Variables (`analytics-service`)

Copy these into your `.env` file (or adapt for Docker/k8s secrets).

```env
# Server config
PORT=

# Consul Service Discovery
SERVICE_HOST=              # IP or DNS to advertise to Consul
CONSUL_HOST=
CONSUL_PORT=
SERVICE_ID=
SERVICE_NAME=
APPLICATION_SERVICE=       # Service name for the Application microservice
INTERVIEW_SERVICE=         # Service name for the Interview microservice

# MongoDB connection
MONGODB_URI=

# RabbitMQ connection
RABBITMQ_URL=
EXCHANGE_NAME=
EXCHANGE_TYPE=

QUEUE_ANALYTICS=           # Optional: leave blank for auto-generated/ephemeral queue

ROUTING_KEY_APP_CREATED=
ROUTING_KEY_APP_UPDATED=
ROUTING_KEY_ITV_CREATED=
ROUTING_KEY_ITV_UPDATED=
ROUTING_KEY_ANALYTICS_SUMMARY=

PREFETCH_COUNT=            # Optional: Number of messages to prefetch (RabbitMQ worker performance tuning)
```

---

### Variable Reference

| Variable                     | Description                                                      |
|------------------------------|------------------------------------------------------------------|
| `PORT`                       | Service HTTP port (default: 5005)                                |
| `SERVICE_HOST`               | Host/IP for Consul advertisement (can use `host.docker.internal`)|
| `CONSUL_HOST`                | Consul agent host                                                |
| `CONSUL_PORT`                | Consul agent API port (default: 8500)                            |
| `SERVICE_ID`                 | Unique service instance ID in Consul                             |
| `SERVICE_NAME`               | Consul service registration name                                 |
| `APPLICATION_SERVICE`        | Name for the Application service (for inter-service calls)       |
| `INTERVIEW_SERVICE`          | Name for the Interview service (for inter-service calls)         |
| `MONGODB_URI`                | MongoDB connection URI                                           |
| `RABBITMQ_URL`               | AMQP(RabbitMQ) connection URI                                   |
| `EXCHANGE_NAME`              | RabbitMQ exchange for jobtracker system events                   |
| `EXCHANGE_TYPE`              | Exchange type (usually `topic`)                                  |
| `QUEUE_ANALYTICS`            | Analytics queue name (leave blank for exclusive/auto-named)      |
| `ROUTING_KEY_APP_CREATED`    | Routing key for application created events                       |
| `ROUTING_KEY_APP_UPDATED`    | Routing key for application updated events                       |
| `ROUTING_KEY_ITV_CREATED`    | Routing key for interview created events                         |
| `ROUTING_KEY_ITV_UPDATED`    | Routing key for interview updated events                         |
| `ROUTING_KEY_ANALYTICS_SUMMARY` | Analytics summary routing key                                |
| `PREFETCH_COUNT`             | RabbitMQ consumer prefetch count (optimization; default: 10)     |

---

> [🔗 Back to main Job Tracker README](../../README.md)  
