## ⚙️ Environment Variables (`notification-service`)

Below are the environment variables required for the `notification-service`.  
Create a `.env` file in the `Backend/notification-service/` folder and add these keys with your own values.

### Example `.env` file

```env
# --- Service Configuration ---
PORT=

# --- Consul Configuration ---
SERVICE_HOST=
CONSUL_HOST=
CONSUL_PORT=
SERVICE_ID=
SERVICE_NAME=
```

---

### Variable Reference

| Name            | Description                                                                                      |
|-----------------|--------------------------------------------------------------------------------------------------|
| `PORT`          | Port the notification-service listens on.                                                        |
| `SERVICE_HOST`  | The external IP or hostname this service advertises to Consul (should be reachable by others).   |
| `CONSUL_HOST`   | Consul agent/server hostname or IP address.                                                      |
| `CONSUL_PORT`   | Consul HTTP API port (usually `8500`).                                                           |
| `SERVICE_ID`    | Unique ID for this instance of notification-service for Consul registration.                     |
| `SERVICE_NAME`  | Name under which this service is registered/discovered in Consul.                                |

---

> [🔗 Back to main Job Tracker README](../../README.md)  
