## ⚙️ Environment Variables (`application-service`)

Add these to a `.env` file in your service root, or configure as needed for deployment.

```env
# Server config
PORT=

DEBUG=
SECRET_KEY=

# MongoDB config
MONGO_DB=
MONGO_HOST=
MONGO_PORT=

# Consul config
SERVICE_HOST=
CONSUL_HOST=
CONSUL_PORT=
SERVICE_ID=
SERVICE_NAME=

# RabbitMQ config
RABBITMQ_URL=
RABBITMQ_EXCHANGE=
RABBITMQ_EXCHANGE_TYPE=
RABBITMQ_ROUTING_KEY_APPLICATION_CREATED=
RABBITMQ_ROUTING_KEY_APPLICATION_UPDATED=
APP_QUEUE=
```

---

### Variable Reference

| Variable                                    | Description                                             |
|----------------------------------------------|---------------------------------------------------------|
| `PORT`                                      | Port number your Django app will listen on (default 5002) |
| `DEBUG`                                     | Django debug mode (`True` or `False`)                  |
| `SECRET_KEY`                                | Django secret key                                      |
| `MONGO_DB`                                  | Mongo database name                                    |
| `MONGO_HOST`                                | MongoDB host (default `localhost`)                     |
| `MONGO_PORT`                                | MongoDB port (default `27017`)                         |
| `SERVICE_HOST`                              | Host/IP for service registration (advertised to Consul) |
| `CONSUL_HOST`                               | Consul agent host                                      |
| `CONSUL_PORT`                               | Consul agent HTTP API port (default `8500`)            |
| `SERVICE_ID`                                | Unique ID for Consul registration                      |
| `SERVICE_NAME`                              | Name for Consul service discovery                      |
| `RABBITMQ_URL`                              | Connection URI for RabbitMQ                            |
| `RABBITMQ_EXCHANGE`                         | RabbitMQ exchange name                                 |
| `RABBITMQ_EXCHANGE_TYPE`                    | RabbitMQ exchange type (e.g., `topic`)                 |
| `RABBITMQ_ROUTING_KEY_APPLICATION_CREATED`  | Routing key for "application created" events           |
| `RABBITMQ_ROUTING_KEY_APPLICATION_UPDATED`  | Routing key for "application updated" events           |
| `APP_QUEUE`                                 | RabbitMQ queue name for application events             |

---

> [🔗 Back to main Job Tracker README](../../README.md)
>
