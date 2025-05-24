## ⚙️ Environment Variables (`search-service`)

Below are the environment variables required to configure and run the `search-service`.  
Create a `.env` file in the `Backend/search-service/` directory and add these keys with your values.

### Example `.env` file

```env
# --- MeiliSearch configuration ---
MEILI_HOST=
MEILI_KEY=

# --- RabbitMQ configuration ---
RABBITMQ_URL=
RABBITMQ_EXCHANGE=
RABBITMQ_EXCHANGE_TYPE=
USER_QUEUE=
CONTACT_QUEUE=
APP_QUEUE=
INTERVIEW_QUEUE=

# --- Service Configuration ---
PORT=

# --- Consul configuration ---
SERVICE_HOST=
CONSUL_HOST=
CONSUL_PORT=
SERVICE_ID=
SERVICE_NAME=
```

---

### Variable Reference

| Name                   | Description                                                                                   |
|------------------------|-----------------------------------------------------------------------------------------------|
| `MEILI_HOST`           | MeiliSearch server endpoint URL                                                               |
| `MEILI_KEY`            | MeiliSearch master or private key for API access                                              |
| `RABBITMQ_URL`         | RabbitMQ server connection string (AMQP protocol)                                             |
| `RABBITMQ_EXCHANGE`    | Name of the RabbitMQ exchange for messaging/event distribution                                |
| `RABBITMQ_EXCHANGE_TYPE` | Type of exchange in RabbitMQ (usually `topic` or `fanout`)                                 |
| `USER_QUEUE`           | Queue name for user indexing events                                                           |
| `CONTACT_QUEUE`        | Queue name for contact indexing events                                                        |
| `APP_QUEUE`            | Queue name for application indexing events                                                    |
| `INTERVIEW_QUEUE`      | Queue name for interview indexing events                                                      |
| `PORT`                 | Port the search-service listens on                                                            |
| `SERVICE_HOST`         | Host/IP this service registers in Consul (should be reachable on the network)                 |
| `CONSUL_HOST`          | Consul agent/server hostname or IP address                                                    |
| `CONSUL_PORT`          | Consul HTTP API port (default is 8500)                                                        |
| `SERVICE_ID`           | Unique identifier for this search-service instance in Consul                                  |
| `SERVICE_NAME`         | Name the service registers under in Consul (used for service discovery)                       |

---

> [🔗 Back to main Job Tracker README](../../README.md)  
