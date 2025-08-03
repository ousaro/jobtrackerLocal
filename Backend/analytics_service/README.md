# 📊 Analytics Service

**Analytics Service** is a Node.js microservice that provides real-time analytics and metrics for the JobTracker application. It aggregates data from various sources to deliver insights and dashboard statistics:

-  Real-time application statistics and trends
-  Timeline analysis and forecasting
-  Data aggregation from multiple services

Built with Node.js, Express, and MongoDB for efficient data processing and analytics generation.

---

## 🛠️ Technology Stack

- **Framework:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT validation
- **Service Discovery:** Consul
- **Message Queue:** RabbitMQ (AMQP)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Consul (for service discovery)
- RabbitMQ (for real-time data streams)

### 1. Clone the Repository

```bash
git clone https://github.com/ousaro/jobtrackerLocal.git
cd jobtrackerLocal/Backend/analytics_service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the service root:

```env
# Server Configuration
PORT=5004

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/jobtracker_analytics

# Consul Service Discovery
SERVICE_HOST=localhost / your-ip-address
CONSUL_HOST=localhost
CONSUL_PORT=8500
SERVICE_ID=analytics-service-1
SERVICE_NAME=analytics-service

# Downstream Services
APPLICATION_SERVICE=application-service
INTERVIEW_SERVICE=interview-service
USER_SERVICE=user-service

# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost:5672
EXCHANGE_NAME=jobtracker_exchange
EXCHANGE_TYPE=topic
QUEUE_ANALYTICS=analytics_queue

# Event Routing Keys
ROUTING_KEY_APP_CREATED=application.created
ROUTING_KEY_APP_UPDATED=application.updated
ROUTING_KEY_ITV_CREATED=interview.created
ROUTING_KEY_ITV_UPDATED=interview.updated
ROUTING_KEY_ANALYTICS_SUMMARY=analytics.summary

# Performance Configuration
PREFETCH_COUNT=10
```

### 4. Run the Service

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### 5. Access the Service

- **Analytics API:** http://localhost:5004/api/analytics/

---

## 🔧 Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | 5004 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/jobtracker_analytics |
| `SERVICE_HOST` | Host for Consul registration | localhost |
| `CONSUL_HOST` | Consul server host | localhost |
| `CONSUL_PORT` | Consul server port | 8500 |
| `SERVICE_ID` | Unique service instance ID | analytics-service-1 |
| `SERVICE_NAME` | Service name for discovery | analytics-service |
| `RABBITMQ_URL` | RabbitMQ connection URL | amqp://localhost:5672 |
| `EXCHANGE_NAME` | RabbitMQ exchange name | jobtracker_exchange |
| `QUEUE_ANALYTICS` | Analytics queue name | analytics_queue |
| `PREFETCH_COUNT` | RabbitMQ prefetch count | 10 |

---

> [🔗 Back to main Job Tracker README](../../README.md)
