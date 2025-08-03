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
git clone https://github.com/ousaro/JobTracker.git
cd JobTracker/Backend/user_service
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
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/jobtracker_users

# Authentication
JWT_SECRET=your-jwt-secret-key

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
AUTH_SERVICE=http://localhost:8080
SEARCH_SERVICE=http://localhost:5003
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
# Development mode
npm run dev

# Production mode
npm start
```

### 6. Access the Service

- **User API:** http://localhost:5001/api/users/
- **Health Check:** http://localhost:5001/health
- **Service Status:** Check Consul UI at http://localhost:8500

---

## 📋 API Endpoints

### Profile Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get current user profile |
| PUT | `/api/users/profile` | Update user profile |
| GET | `/api/users/profile/:userId` | Get user profile by ID |
| DELETE | `/api/users/profile` | Delete user profile |

### Skills & Experience

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/skills` | Get user skills |
| POST | `/api/users/skills` | Add new skill |
| PUT | `/api/users/skills/:skillId` | Update skill |
| DELETE | `/api/users/skills/:skillId` | Remove skill |
| GET | `/api/users/experience` | Get work experience |
| POST | `/api/users/experience` | Add work experience |
| PUT | `/api/users/experience/:expId` | Update experience |
| DELETE | `/api/users/experience/:expId` | Remove experience |

### Social Connections

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/social` | Get social links |
| POST | `/api/users/social` | Add social link |
| PUT | `/api/users/social/:linkId` | Update social link |
| DELETE | `/api/users/social/:linkId` | Remove social link |

### Search & Discovery

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/search` | Search user profiles |
| GET | `/api/users/recommendations` | Get profile recommendations |
| GET | `/api/users/stats` | Get profile statistics |

---

## 📊 Data Models

### User Profile Schema

```javascript
{
  userId: String,           // Reference to auth service user ID
  firstName: String,
  lastName: String,
  headline: String,         // Professional headline
  summary: String,          // Profile summary
  location: {
    city: String,
    state: String,
    country: String
  },
  avatar: String,           // Profile picture URL
  resume: String,           // Resume file URL
  createdAt: Date,
  updatedAt: Date
}
```

### Skills Schema

```javascript
{
  userId: String,
  name: String,             // Skill name (e.g., "JavaScript", "Project Management")
  category: String,         // Skill category (e.g., "Programming", "Soft Skills")
  level: String,            // Proficiency level (Beginner, Intermediate, Advanced, Expert)
  yearsOfExperience: Number,
  endorsements: Number,
  createdAt: Date
}
```

### Experience Schema

```javascript
{
  userId: String,
  type: String,             // "work" or "education"
  title: String,            // Job title or degree
  company: String,          // Company or institution name
  location: String,
  startDate: Date,
  endDate: Date,            // null if current
  current: Boolean,
  description: String,
  skills: [String],         // Related skills
  createdAt: Date
}
```

---

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | 5001 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/jobtracker_users |
| `JWT_SECRET` | JWT secret for token validation | - |
| `RABBITMQ_URL` | RabbitMQ connection URL | amqp://localhost:5672 |
| `USER_QUEUE` | RabbitMQ queue for user events | user_events |
| `USER_EXCHANGE` | RabbitMQ exchange name | user_exchange |
| `SERVICE_HOST` | Host for Consul registration | localhost |
| `CONSUL_HOST` | Consul server host | localhost |
| `CONSUL_PORT` | Consul server port | 8500 |
| `SERVICE_ID` | Unique service instance ID | user-service-1 |
| `SERVICE_NAME` | Service name for discovery | user-service |
| `AUTH_SERVICE` | Auth service endpoint | http://localhost:8080 |
| `SEARCH_SERVICE` | Search service endpoint | http://localhost:5003 |

---

## 🔄 Service Integration

### Message Queue Events

The service publishes events to RabbitMQ for other services:

- `user.profile.created` - When a new profile is created
- `user.profile.updated` - When profile is updated
- `user.skills.updated` - When skills are modified
- `user.experience.added` - When experience is added

### Service Dependencies

- **Auth Service**: User authentication validation
- **Search Service**: Profile indexing for search
- **Analytics Service**: Profile statistics and metrics

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage
```

---

## 🐳 Docker Support

```bash
# Build Docker image
docker build -t user-service .

# Run with Docker Compose
docker-compose up
```

---

> [🔗 Back to main Job Tracker README](../../README.md)
