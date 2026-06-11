# Application Service

Job application management microservice for the JobTracker platform. Provides full CRUD operations over job applications with status lifecycle tracking and event-driven search index synchronization.

## Tech Stack

- **Runtime:** Node.js (Express 5)
- **Database:** MongoDB (Mongoose ODM)
- **Service Discovery:** HashiCorp Consul
- **Messaging:** RabbitMQ (amqplib) — topic exchange + work queue
- **Auth:** JWT RS256 verification middleware

## API Endpoints

All routes are prefixed via Kong at `/api/application-service`.

| Method | Path                 | Description                     |
|--------|----------------------|----------------------------------|
| GET    | `/applications`      | List all applications           |
| POST   | `/applications`      | Create a new application        |
| GET    | `/applications/:id`  | Retrieve a single application   |
| PUT    | `/applications/:id`  | Update an application           |
| DELETE | `/applications/:id`  | Delete an application           |
| POST   | `/applications/ids`  | Bulk retrieve by array of IDs   |
| GET    | `/health`            | Health check for Consul         |

## Data Model — `JobApplication`

| Field                | Type   | Constraints                           |
|----------------------|--------|---------------------------------------|
| `owner_id`           | ObjectId | required                            |
| `company_name`       | String | required                             |
| `position_title`     | String | required                             |
| `application_date`   | Date   | required                             |
| `location`           | String | required                             |
| `salary_expectation` | Number | required                             |
| `status`             | String | enum: `SAVED`, `APPLIED`, `INTERVIEW_SCHEDULED`, `OFFER_RECEIVED`, `REJECTED`, `HIRED` |
| `job_description_link` | String | required                           |
| `created_at`         | Date   | auto (Mongoose timestamps)           |
| `last_modified`      | Date   | auto (Mongoose timestamps)           |

## Event-Driven Architecture

On every write operation the service publishes messages to synchronize the Meilisearch search index:

| Operation | Exchange / Routing Key              | Queue               |
|-----------|-------------------------------------|---------------------|
| Create    | `jobtracker.exchange` / `application.created` | `application.index` |
| Update    | `jobtracker.exchange` / `application.updated` | `application.index` |
| Delete    | —                                   | `application.index` |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Copy environment configuration
cp .env.container .env

# 3. Start the service
npm start                # production
npm run dev              # development with nodemon
```

The service listens on port `5002` by default.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | HTTP port | `5002` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/Aplications_Service` |
| `CONSUL_HOST` | Consul agent host | `localhost` |
| `CONSUL_PORT` | Consul agent port | `8500` |
| `RABBITMQ_URL` | RabbitMQ connection URL | `amqp://guest:guest@localhost:5672` |
| `RABBITMQ_EXCHANGE` | Topic exchange name | `jobtracker.exchange` |
| `RABBITMQ_ROUTING_KEY_APPLICATION_CREATED` | Routing key for create events | `application.created` |
| `RABBITMQ_ROUTING_KEY_APPLICATION_UPDATED` | Routing key for update events | `application.updated` |
| `APP_QUEUE` | Queue for search index sync | `application.index` |

## Project Structure

```
src/
├── index.js                  # Express app entry, MongoDB connection, Consul registration
├── Config/
│   ├── publisher.js          # RabbitMQ channel manager (topic exchange + queue)
│   └── registerService.js    # Consul service registration with health check
├── Controllers/
│   ├── applicationController.js  # Request handlers for all CRUD endpoints
│   └── healthController.js       # Health check handler
├── Middlewares/
│   └── authMiddleware.js     # RS256 JWT verification middleware
├── Models/
│   └── JobApplication.js     # Mongoose schema and model
└── Routes/
    ├── applicationRoutes.js  # Express router for application endpoints
    └── healthRouter.js       # Express router for health endpoint
```
