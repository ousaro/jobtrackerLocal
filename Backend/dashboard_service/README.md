# Dashboard Service

Dashboard data aggregation microservice for the JobTracker platform. Consumes application and interview events via RabbitMQ and maintains pre-computed dashboard views for fast frontend rendering.

## Tech Stack

- **Runtime:** Node.js (Express 5)
- **Database:** MongoDB (Mongoose ODM)
- **Messaging:** RabbitMQ (amqplib) — queue consumer
- **Service Discovery:** HashiCorp Consul

## API Endpoints

| Method | Path      | Description                     |
|--------|-----------|---------------------------------|
| GET    | `/health` | Health check for Consul         |

## Getting Started

```bash
npm install
npm start                # production
npm run dev              # development with nodemon
```

The service listens on port `5006` by default.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | HTTP port | `5006` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/jobtracker_dashboard` |
| `CONSUL_HOST` | Consul agent host | `localhost` |
| `CONSUL_PORT` | Consul agent port | `8500` |
| `RABBITMQ_URL` | RabbitMQ connection URL | `amqp://guest:guest@localhost:5672` |

## Project Structure

```
src/
├── index.js                   # Express app, health endpoint, consumer startup
├── Config/
│   ├── consumer.js            # RabbitMQ queue consumer
│   └── registerService.js     # Consul service registration
└── Models/
    └── ...
```
