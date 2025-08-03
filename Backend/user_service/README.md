# 👤 User Service

**User Service** is a Node.js microservice that manages user profiles, skills, experience, and social connections in the JobTracker application. It provides:

- 👤 User profile management
- 🎯 Skills and expertise tracking  
- 💼 Work experience and education
- 🔗 Social media and contact links
- 🔍 Profile search and discovery
- 📊 Profile analytics and statistics

Built with Node.js, Express, and MongoDB for flexible profile data management.

---

## 🛠️ Technology Stack

- **Framework:** Node.js + Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT validation
- **Service Discovery:** Consul
- **Message Queue:** RabbitMQ
- **Validation:** Joi/Express-validator

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB
- Consul (for service discovery)
- RabbitMQ (for messaging)

### 1. Clone the Repository

```bash
git clone https://github.com/ousaro/jobtrackerLocal.git
cd jobtrackerLocal/Backend/user_service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the service root:

```env
# Server Configuration
PORT=5001

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/jobtracker_users


# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost:5672
USER_QUEUE=user_events
USER_EXCHANGE=user_exchange

# Consul Configuration
SERVICE_HOST=localhost
CONSUL_HOST=localhost
CONSUL_PORT=8500
SERVICE_ID=user-service-1
SERVICE_NAME=user-service

# Downstream Services
AUTH_SERVICE=http://localhost:5000
```

### 4. Run the Service

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 5. Access the Service

- **User API:** http://localhost:5001/api/users/

---

## 📋 API Endpoints

### Profile Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get current user profile |
| PUT | `/api/users/profile` | Update user profile |
| GET | `/api/users/profile/:userId` | Get user profile by ID |
| DELETE | `/api/users/profile` | Delete user profile |

---

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | 5001 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/jobtracker_users |
| `RABBITMQ_URL` | RabbitMQ connection URL | amqp://localhost:5672 |
| `USER_QUEUE` | RabbitMQ queue for user events | user_events |
| `USER_EXCHANGE` | RabbitMQ exchange name | user_exchange |
| `SERVICE_HOST` | Host for Consul registration | localhost |
| `CONSUL_HOST` | Consul server host | localhost |
| `CONSUL_PORT` | Consul server port | 8500 |
| `SERVICE_ID` | Unique service instance ID | user-service-1 |
| `SERVICE_NAME` | Service name for discovery | user-service |
| `AUTH_SERVICE` | Auth service endpoint | http://localhost:8080 |

---

> [🔗 Back to main Job Tracker README](../../README.md)