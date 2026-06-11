# User Service

User profile management microservice for the JobTracker platform. Provides full CRUD over user profiles with event-driven search index synchronization and cross-service saga coordination.

## Tech Stack

- **Runtime:** Node.js (Express 5)
- **Database:** MongoDB (Mongoose ODM)
- **Service Discovery:** HashiCorp Consul
- **Messaging:** RabbitMQ (amqplib)
- **Auth:** JWT RS256 verification middleware
- **Inter-service:** HTTP (axios)

## API Endpoints

All routes are prefixed via Kong at `/api/user-service`.

| Method | Path                   | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | `/users/profile`        | List all profiles                   |
| POST   | `/users/profile`        | Create a new profile                |
| GET    | `/users/profile/:uid`   | Get profile by ID                   |
| PUT    | `/users/profile/:uid`   | Update profile                      |
| DELETE | `/users/profile/:uid`   | Delete profile                      |
| GET    | `/users/profile/email/:email` | Get profile by email          |
| POST   | `/users/profile/search` | Bulk retrieve profiles by array of IDs |
| GET    | `/health`               | Health check for Consul             |

## Data Model — `User`

| Field        | Type   | Constraints                      |
|-------------|--------|----------------------------------|
| `fullName`  | String | required                         |
| `email`     | String | required, unique                 |
| `phone`     | String | required, unique                 |
| `location`  | String |                                  |
| `skills`    | String |                                  |
| `title`     | String |                                  |
| `resume`    | String | file URL                         |
| `avatar`    | String | image URL                        |
| `bio`       | String |                                  |
| `website`   | String |                                  |
| `socialLinks.github` | String |                        |
| `socialLinks.linkedin` | String |                       |
| `createdAt` | Date   | auto (Mongoose timestamps)       |
| `updatedAt` | Date   | auto (Mongoose timestamps)       |

## Saga Pattern

The delete operation implements a compensation-based saga:

1. Delete the user profile from MongoDB
2. Call auth service to remove the corresponding auth record
3. Publish a delete event to the search index queue
4. If any step fails, the user document is restored (compensating transaction)

## Getting Started

```bash
npm install
npm start                # production
npm run dev              # development with nodemon
```

The service listens on port `5001` by default.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | HTTP port | `5001` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/jobtracker_users` |
| `CONSUL_HOST` | Consul agent host | `localhost` |
| `CONSUL_PORT` | Consul agent port | `8500` |
| `RABBITMQ_URL` | RabbitMQ connection URL | `amqp://localhost:5672` |
| `USER_QUEUE` | Queue for search index sync | `user_events` |
| `AUTH_SERVICE` | Auth service base URL | `http://localhost:5000` |

## Project Structure

```
src/
├── index.js                   # Express app entry, MongoDB connection, Consul registration
├── Config/
│   ├── publisher.js           # RabbitMQ publisher (queue-based)
│   ├── registerService.js     # Consul service registration
│   └── getServices.js         # Inter-service HTTP clients
├── Controllers/
│   ├── userController.js      # Request handlers for profile CRUD + saga logic
│   └── healthController.js    # Health check handler
├── Middlewares/
│   └── authMiddleware.js      # RS256 JWT verification middleware
├── Models/
│   └── user.js                # Mongoose schema and model
└── Routes/
    ├── userRoutes.js          # Express router for profile endpoints
    └── healthRouter.js        # Express router for health endpoint
```
