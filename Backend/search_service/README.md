# Search Service

Full-text search microservice for the JobTracker platform. Powered by Meilisearch for fast, typo-tolerant search across applications, users, contacts, and interviews. Consumes RabbitMQ events to keep search indexes synchronized in real time.

## Tech Stack

- **Runtime:** Node.js (Express 4)
- **Search Engine:** Meilisearch
- **Messaging:** RabbitMQ (amqplib) — multi-queue consumer
- **Service Discovery:** HashiCorp Consul
- **Auth:** JWT RS256 verification middleware

## API Endpoints

All routes are prefixed via Kong at `/api/search-service`.

| Method | Path                       | Description                               |
|--------|----------------------------|-------------------------------------------|
| GET    | `/search/:type`             | Search documents by type (applications, users, contacts, interviews) |
| GET    | `/search/:type/:id`         | Get a specific document from the index     |
| GET    | `/search/reindex-all`       | Trigger a full reindex of all data         |
| DELETE | `/search/:type/:id`         | Delete a document from the index           |
| GET    | `/health`                   | Health check for Consul                    |

## Event-Driven Indexing

The service listens on four RabbitMQ queues to keep Meilisearch indexes up to date:

| Queue               | Source Service      | Content Indexed      |
|---------------------|---------------------|----------------------|
| `application.index` | application-service | Job applications     |
| `user_events`       | user-service        | User profiles        |
| `contact_queue`     | contact-service     | Contacts             |
| `interview_queue`   | interview-service   | Interviews           |

Each consumer receives `{ action: "create" | "delete", data: {...} }` payloads and applies the corresponding Meilisearch document operation.

## Getting Started

```bash
npm install

# Start dependencies (Meilisearch + RabbitMQ)
docker-compose up -d

npm start
```

The service listens on port `5009` by default.

### Prerequisites

- Node.js 18+
- Meilisearch
- RabbitMQ
- Consul agent

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | HTTP port | `5009` |
| `MEILI_HOST` | Meilisearch server URL | `http://localhost:7700` |
| `MEILI_KEY` | Meilisearch API key | |
| `RABBITMQ_URL` | RabbitMQ connection URL | `amqp://guest:guest@localhost:5672` |
| `RABBITMQ_EXCHANGE` | RabbitMQ exchange name | `jobtracker.exchange` |
| `APP_QUEUE` | Queue for application events | `application.index` |
| `USER_QUEUE` | Queue for user events | `user_events` |
| `CONTACT_QUEUE` | Queue for contact events | `contact_queue` |
| `INTERVIEW_QUEUE` | Queue for interview events | `interview_queue` |
| `CONSUL_HOST` | Consul agent host | `localhost` |
| `CONSUL_PORT` | Consul agent port | `8500` |

## Project Structure

```
src/
├── index.js                   # Express app, route mounting, consumer startup
├── Config/
│   ├── consumer.js            # RabbitMQ multi-queue consumer
│   └── registerService.js     # Consul service registration
├── Controllers/
│   ├── searchController.js    # Search, reindex, and delete handlers
│   └── healthController.js    # Health check handler
├── Middlewares/
│   └── authMiddleware.js      # RS256 JWT verification middleware
└── routers/
    ├── searchRoutes.js        # Express router for search endpoints
    └── healthRouter.js        # Express router for health endpoint
```
