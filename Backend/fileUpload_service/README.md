## ⚙️ Environment Variables (`fileUpload-service`)

Below are the environment variables required to configure and run the **fileUpload-service**.  
Add these keys to a `.env` file in your `Backend/fileUpload-service/` directory with your own values.

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

| Variable        | Description                                                                              |
|-----------------|------------------------------------------------------------------------------------------|
| `PORT`          | Port where the fileUpload-service will listen for HTTP requests.                         |
| `SERVICE_HOST`  | External IP or hostname advertised to Consul (should be accessible by other services).   |
| `CONSUL_HOST`   | Consul agent/server hostname or IP.                                                      |
| `CONSUL_PORT`   | Consul HTTP API port (usually `8500`).                                                   |
| `SERVICE_ID`    | Unique ID for this instance when registering in Consul.                                  |
| `SERVICE_NAME`  | Name for service discovery and registration in Consul.                                   |

---

> [🔗 Back to main Job Tracker README](../../README.md)  
