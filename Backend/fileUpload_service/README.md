# File Upload Service

File upload and retrieval microservice for the JobTracker platform. Handles resume, avatar, and document uploads with Multer-based disk storage.

## Tech Stack

- **Runtime:** Node.js (Express 5)
- **Storage:** Local filesystem (Multer disk storage)
- **Service Discovery:** HashiCorp Consul

## API Endpoints

| Method | Path                                      | Description                     |
|--------|-------------------------------------------|---------------------------------|
| POST   | `/upload`                                  | Upload a file (multipart/form-data) |
| GET    | `/uploads/:folder/:filename`               | Retrieve an uploaded file       |
| GET    | `/health`                                  | Health check for Consul         |

### Upload Response

```json
{
  "message": "File uploaded successfully!",
  "file": {
    "originalName": "resume.pdf",
    "storedName": "1712345678901-resume.pdf",
    "mimetype": "application/pdf",
    "size": 204800,
    "url": "/uploads/resumes/user-id/1712345678901-resume.pdf"
  }
}
```

Uploads are organized into subdirectories by type (`resumes`, `avatars`, etc.) and owner ID. File size is limited to 5 MB.

## Getting Started

```bash
npm install
npm start                # production
npm run dev              # development with nodemon
```

The service listens on port `5007` by default.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | HTTP port | `5007` |
| `CONSUL_HOST` | Consul agent host | `localhost` |
| `CONSUL_PORT` | Consul agent port | `8500` |
| `SERVICE_HOST` | Advertised host for Consul | `host.docker.internal` |
| `SERVICE_ID` | Consul service instance ID | `fileupload-service` |
| `SERVICE_NAME` | Consul service name | `fileupload-service` |

## Project Structure

```
src/
├── index.js                   # Express app, routes, Consul registration
├── config/
│   └── registerService.js     # Consul service registration
├── constants/
│   └── UploadFolders.js       # Upload directory mapping
├── controllers/
│   ├── UploadController.js    # File upload and retrieval handlers
│   └── HealthController.js    # Health check handler
├── middlewares/
│   └── middlewares.js         # Request middleware (folder key resolution)
├── models/
└── routes/
    ├── uploadRouter.js        # Express router for upload/file endpoints
    └── healthRouter.js        # Express router for health endpoint
```
