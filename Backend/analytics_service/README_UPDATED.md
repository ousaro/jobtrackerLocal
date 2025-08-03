# 📊 Analytics Service

**Analytics Service** is a Node.js microservice that provides real-time analytics and metrics for the JobTracker application. It aggregates data from various sources to deliver insights and dashboard statistics:

- 📈 Real-time application statistics and trends
- 📊 Interview analytics and success rates
- 🎯 User engagement metrics
- 📅 Timeline analysis and forecasting
- 🔄 Data aggregation from multiple services
- 📋 Dashboard data preparation and caching

Built with Node.js, Express, and MongoDB for efficient data processing and analytics generation.

---

## 🛠️ Technology Stack

- **Framework:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT validation
- **Service Discovery:** Consul
- **Message Queue:** RabbitMQ (AMQP)
- **Data Processing:** Aggregation pipelines
- **Caching:** In-memory and Redis (optional)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Consul (for service discovery)
- RabbitMQ (for real-time data streams)

### 1. Clone the Repository

```bash
git clone https://github.com/ousaro/JobTracker.git
cd JobTracker/Backend/analytics_service
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
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/jobtracker_analytics

# Authentication
JWT_SECRET=your-jwt-secret-key

# Consul Service Discovery
SERVICE_HOST=localhost
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
CACHE_TTL=300
AGGREGATION_INTERVAL=30000
```

### 4. Start Dependencies

```bash
# Start MongoDB
docker run --name mongo -p 27017:27017 -d mongo:latest

# Start RabbitMQ
docker run --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:3-management

# Start Consul (if not already running)
docker run --name consul -p 8500:8500 -d consul:latest
```

### 5. Run the Service

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

### 6. Access the Service

- **Analytics API:** http://localhost:5004/api/analytics/
- **Health Check:** http://localhost:5004/health
- **Metrics:** http://localhost:5004/metrics
- **Service Status:** Check Consul UI at http://localhost:8500

---

## 📋 API Endpoints

### Dashboard Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/dashboard` | Get complete dashboard data |
| GET | `/api/analytics/summary` | Get summary statistics |
| GET | `/api/analytics/trends` | Get trending data |

### Application Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/applications/stats` | Application statistics |
| GET | `/api/analytics/applications/status-distribution` | Status breakdown |
| GET | `/api/analytics/applications/timeline` | Application timeline |
| GET | `/api/analytics/applications/companies` | Top companies applied to |
| GET | `/api/analytics/applications/success-rate` | Success rate metrics |

### Interview Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/interviews/stats` | Interview statistics |
| GET | `/api/analytics/interviews/success-rate` | Interview success rates |
| GET | `/api/analytics/interviews/types` | Interview type analysis |
| GET | `/api/analytics/interviews/timeline` | Interview scheduling trends |

### User Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/users/engagement` | User engagement metrics |
| GET | `/api/analytics/users/activity` | User activity patterns |
| GET | `/api/analytics/users/growth` | User growth statistics |

### Custom Reports

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analytics/reports/custom` | Generate custom report |
| GET | `/api/analytics/reports/{reportId}` | Get generated report |
| GET | `/api/analytics/exports/csv` | Export data as CSV |
| GET | `/api/analytics/exports/pdf` | Export report as PDF |

---

## 📊 Analytics Data Models

### Application Analytics Schema

```javascript
{
  userId: String,
  period: String,               // daily, weekly, monthly
  date: Date,
  metrics: {
    totalApplications: Number,
    newApplications: Number,
    statusChanges: Number,
    interviews: Number,
    offers: Number,
    rejections: Number,
    responseRate: Number,        // Percentage
    averageResponseTime: Number  // Days
  },
  statusDistribution: {
    applied: Number,
    interview: Number,
    offer: Number,
    rejected: Number,
    withdrawn: Number
  },
  topCompanies: [{
    company: String,
    applications: Number,
    successRate: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Interview Analytics Schema

```javascript
{
  userId: String,
  period: String,
  date: Date,
  metrics: {
    totalInterviews: Number,
    scheduledInterviews: Number,
    completedInterviews: Number,
    cancelledInterviews: Number,
    successRate: Number,
    averageDuration: Number,     // Minutes
    conversionRate: Number       // Interview to offer rate
  },
  interviewTypes: {
    phone: Number,
    video: Number,
    onsite: Number,
    technical: Number,
    final: Number
  },
  timeSlotPreferences: {
    morning: Number,
    afternoon: Number,
    evening: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### User Engagement Schema

```javascript
{
  userId: String,
  date: Date,
  engagement: {
    loginCount: Number,
    sessionDuration: Number,     // Minutes
    pageViews: Number,
    actionsPerformed: Number,
    featuresUsed: [String],
    lastActiveAt: Date
  },
  goals: {
    applicationsTarget: Number,
    applicationsActual: Number,
    interviewsTarget: Number,
    interviewsActual: Number
  },
  createdAt: Date
}
```

---

## 🔄 Real-time Data Processing

### Event Consumers

The service listens to RabbitMQ events for real-time analytics updates:

- **Application Events**: Created, updated, status changed
- **Interview Events**: Scheduled, completed, cancelled
- **User Events**: Profile updated, activity tracked
- **System Events**: Login, logout, feature usage

### Data Aggregation Pipeline

```javascript
// Example aggregation for daily application stats
[
  {
    $match: {
      userId: ObjectId(userId),
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }
  },
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 },
      avgResponseTime: { $avg: "$responseTime" }
    }
  },
  {
    $group: {
      _id: null,
      totalApplications: { $sum: "$count" },
      statusBreakdown: {
        $push: {
          status: "$_id",
          count: "$count"
        }
      }
    }
  }
]
```

---

## 🔧 Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | 5004 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/jobtracker_analytics |
| `JWT_SECRET` | JWT secret for token validation | - |
| `SERVICE_HOST` | Host for Consul registration | localhost |
| `CONSUL_HOST` | Consul server host | localhost |
| `CONSUL_PORT` | Consul server port | 8500 |
| `SERVICE_ID` | Unique service instance ID | analytics-service-1 |
| `SERVICE_NAME` | Service name for discovery | analytics-service |
| `RABBITMQ_URL` | RabbitMQ connection URL | amqp://localhost:5672 |
| `EXCHANGE_NAME` | RabbitMQ exchange name | jobtracker_exchange |
| `QUEUE_ANALYTICS` | Analytics queue name | analytics_queue |
| `PREFETCH_COUNT` | RabbitMQ prefetch count | 10 |
| `CACHE_TTL` | Cache TTL in seconds | 300 |
| `AGGREGATION_INTERVAL` | Aggregation interval in ms | 30000 |

---

## 📈 Performance Optimization

### Caching Strategy
- Dashboard data cached for 5 minutes
- Heavy aggregations cached for 30 minutes
- Real-time metrics updated every 30 seconds

### Database Indexing
```javascript
// Recommended MongoDB indexes
db.applications.createIndex({ userId: 1, createdAt: -1 });
db.interviews.createIndex({ userId: 1, scheduledDate: -1 });
db.analytics.createIndex({ userId: 1, period: 1, date: -1 });
```

### Background Jobs
- Hourly aggregation of daily statistics
- Daily aggregation of weekly/monthly metrics
- Weekly cleanup of old analytical data

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run performance tests
npm run test:performance

# Run with coverage
npm run test:coverage
```

---

## 🔍 Monitoring & Debugging

### Health Check
```bash
curl http://localhost:5004/health
```

### Metrics Endpoint
```bash
curl http://localhost:5004/metrics
```

### Debug Analytics Pipeline
```bash
# Enable debug logging
DEBUG=analytics:* npm run dev
```

---

## 🐳 Docker Support

```bash
# Build Docker image
docker build -t analytics-service .

# Run with Docker Compose
docker-compose up
```

---

## 📚 Additional Resources

- [MongoDB Aggregation Framework](https://docs.mongodb.com/manual/aggregation/)
- [RabbitMQ Node.js Tutorial](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

---

> [🔗 Back to main Job Tracker README](../../README.md)
