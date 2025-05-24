## ⚙️ Environment Variables (`user-service`)

Below are the environment variables required for running the `user-service`.  
Add these to your `.env` file in the `Backend/user-service/` directory.

### Example `.env` file

```env
# MongoDB connection string
MONGO_URI=

# Port for user-service
PORT=

# --- RabbitMQ configuration ---
RABBITMQ_URL=
USER_QUEUE=

# --- Consul configuration ---
SERVICE_HOST=          # IP to register with Consul (change as needed)
CONSUL_HOST=           # Consul agent host (use 'host.docker.internal' inside Docker on Mac/Win)
CONSUL_PORT=                 # Consul HTTP API port (default: 8500)
SERVICE_ID=
SERVICE_NAME=

# --- Downstream service discovery ---
AUTH_SERVICE=        # Logical DNS name for auth service (used in service calls)
```

### Variable Reference

| Name           | Description                                                                                      |
|----------------|--------------------------------------------------------------------------------------------------|
| `MONGO_URI`    | MongoDB connection string (users database)                                                       |
| `PORT`         | Port the service listens on                                                                      |
| `RABBITMQ_URL` | RabbitMQ connection URL (for pub/sub or async jobs/queueing)                                     |
| `USER_QUEUE`   | RabbitMQ queue name for user indexing/events                                                     |
| `SERVICE_HOST` | Host/IP of this service to register with Consul (should be reachable by other containers/services)|
| `CONSUL_HOST`  | Consul server hostname/IP                                                                        |
| `CONSUL_PORT`  | Consul server port (default: 8500)                                                               |
| `SERVICE_ID`   | Unique service ID to identify this instance in Consul                                            |
| `SERVICE_NAME` | Logical name registered in Consul, for service discovery                                         |
| `AUTH_SERVICE` | Name/endpoint for the authentication service, used in API calls                                  |

---

> [🔗 Back to main Job Tracker README](../../README.md)  