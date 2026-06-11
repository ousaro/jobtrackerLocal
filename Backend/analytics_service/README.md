# Analytics Service

Real-time analytics aggregation microservice for the JobTracker platform. Consumes application and interview events via RabbitMQ, maintains aggregate counters and status distributions, and exposes a summary endpoint for dashboard visualization.

## Tech Stack

- **Runtime:** Node.js (Express 5)
- **Database:** MongoDB (Mongoose ODM)
- **Messaging:** RabbitMQ (amqplib) — topic exchange consumer
- **Service Discovery:** HashiCorp Consul
- **Auth:** JWT RS256 verification middleware

## API Endpoints

All routes are prefixed via Kong at `/api/analytics-service`.

| Method | Path            | Description                                  |
|--------|-----------------|----------------------------------------------|
| GET    | `/summary`      | Aggregated analytics summary                 |
| GET    | `/health`       | Health check for Consul                      |

### Summary Response Shape

```json
{
  "totalApplications": 42,
  "totalInterviews": 18,
  "applicationStatusCounts": {
    "SAVED": 5,
    "APPLIED": 20,
    "INTERVIEW_SCHEDULED": 8,
    "OFFER_RECEIVED": 3,
    "REJECTED": 5,
    "HIRED": 1
  },
  "monthlyApplications": {
    "2026-01": 10,
    "2026-02": 15,
    "2026-03": 17
  },
  "lastApplications": [...],
  "lastInterviews": [...]
}
```

## Event-Driven Architecture

The service listens on the `jobtracker.exchange` topic exchange and updates its aggregate counters on every event:

| Event | Effect |
|---|---|
| `application.created` | Increments total, monthly counter, status count |
| `application.updated` | Transfers status count from previous to new status |
| `interview.created` | Increments total interview counter |

## Getting Started

```bash
npm install
npm start                # production
npm run dev              # development with nodemon
```

The service listens on port `5005` by default.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | HTTP port | `5005` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/jobtracker_analytics` |
| `CONSUL_HOST` | Consul agent host | `localhost` |
| `CONSUL_PORT` | Consul agent port | `8500` |
| `RABBITMQ_URL` | RabbitMQ connection URL | `amqp://guest:guest@localhost:5672` |
| `EXCHANGE_NAME` | Topic exchange to consume from | `jobtracker.exchange` |
| `QUEUE_ANALYTICS` | Queue bound to the exchange | `analytics_queue` |
| `APPLICATION_SERVICE` | Application service hostname | `application-service` |
| `INTERVIEW_SERVICE` | Interview service hostname | `interview-service` |

## Project Structure

```
src/
├── index.js                   # Express app, MongoDB connection, consumer startup
├── Config/
│   ├── consumer.js            # RabbitMQ consumer (topic exchange listener)
│   ├── registerService.js     # Consul service registration
│   └── getServices.js         # Inter-service HTTP clients (application, interview)
├── Controllers/
│   ├── analyticsController.js # Summary endpoint + updateAnalytics logic
│   └── healthController.js    # Health check handler
├── Models/
│   └── AnalyticsModel.js      # Mongoose schema for aggregate counters
├── Middlewares/
│   └── authMiddleware.js      # RS256 JWT verification middleware
└── Routes/
    ├── analyticsRouter.js     # Express router for analytics endpoints
    └── healthRouter.js        # Express router for health endpoint
```
