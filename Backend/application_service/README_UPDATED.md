# 📋 Application Service

**Application Service** is a Django-based microservice that manages job applications in the JobTracker system. It provides comprehensive job application tracking and management capabilities:

- 📝 Job application CRUD operations
- 📊 Application status tracking and updates
- 🏢 Company and position management
- 📅 Application timeline and history
- 🔍 Advanced filtering and search
- 📈 Application statistics and analytics

Built with Django, Django REST Framework, and MongoDB for flexible document storage.

---

## 🛠️ Technology Stack

- **Framework:** Django + Django REST Framework
- **Database:** MongoDB (MongoEngine ODM)
- **Authentication:** JWT token validation
- **Service Discovery:** Consul integration
- **Message Queue:** RabbitMQ (Pika)
- **API Documentation:** Django REST Framework browsable API

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- MongoDB
- Consul (for service discovery)
- RabbitMQ (for messaging)

### 1. Clone the Repository

```bash
git clone https://github.com/ousaro/JobTracker.git
cd JobTracker/Backend/application_service
```

### 2. Set Up Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the service root:

```env
# Server Configuration
PORT=5002
DEBUG=True
SECRET_KEY=your-django-secret-key

# MongoDB Configuration
MONGO_DB=jobtracker_applications
MONGO_HOST=localhost
MONGO_PORT=27017

# Authentication
JWT_SECRET=your-jwt-secret-key

# Consul Configuration
SERVICE_HOST=localhost
CONSUL_HOST=localhost
CONSUL_PORT=8500
SERVICE_ID=application-service-1
SERVICE_NAME=application-service

# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost:5672
RABBITMQ_EXCHANGE=jobtracker_exchange
RABBITMQ_EXCHANGE_TYPE=topic
RABBITMQ_ROUTING_KEY_APPLICATION_CREATED=application.created
RABBITMQ_ROUTING_KEY_APPLICATION_UPDATED=application.updated
APP_QUEUE=application_events

# Downstream Services
USER_SERVICE=http://localhost:5001
SEARCH_SERVICE=http://localhost:5003
ANALYTICS_SERVICE=http://localhost:5004
```

### 5. Start Dependencies

```bash
# Start MongoDB
docker run --name mongo -p 27017:27017 -d mongo:latest

# Start RabbitMQ
docker run --name rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:3-management

# Start Consul (if not already running)
docker run --name consul -p 8500:8500 -d consul:latest
```

### 6. Run Database Migrations

```bash
python manage.py migrate
```

### 7. Run the Service

```bash
# Development mode
python manage.py runserver 0.0.0.0:5002

# Or using the local runner
python runLocal.py
```

### 8. Access the Service

- **Application API:** http://localhost:5002/api/applications/
- **Admin Interface:** http://localhost:5002/admin/
- **API Browser:** http://localhost:5002/api/ (Django REST Framework)
- **Health Check:** http://localhost:5002/health/

---

## 📋 API Endpoints

### Application Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications/` | List all applications (with filtering) |
| POST | `/api/applications/` | Create new application |
| GET | `/api/applications/{id}/` | Get application details |
| PUT | `/api/applications/{id}/` | Update application |
| PATCH | `/api/applications/{id}/` | Partial update application |
| DELETE | `/api/applications/{id}/` | Delete application |

### Application Status & Workflow

| Method | Endpoint | Description |
|--------|----------|-------------|
| PATCH | `/api/applications/{id}/status/` | Update application status |
| GET | `/api/applications/{id}/history/` | Get application status history |
| POST | `/api/applications/{id}/notes/` | Add application note |
| GET | `/api/applications/stats/` | Get application statistics |

### Company & Position Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/companies/` | List companies |
| POST | `/api/companies/` | Create company |
| GET | `/api/positions/` | List positions |
| POST | `/api/positions/` | Create position |

### Search & Filtering

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications/search/` | Search applications |
| GET | `/api/applications/filter/` | Filter by criteria |
| GET | `/api/applications/dashboard/` | Dashboard summary |

---

## 📊 Data Models

### Application Schema

```python
{
    "id": "unique_application_id",
    "userId": "user_reference_id",
    "company": {
        "name": "Company Name",
        "website": "https://company.com",
        "location": "City, State",
        "industry": "Technology",
        "size": "100-500 employees"
    },
    "position": {
        "title": "Software Developer",
        "department": "Engineering",
        "type": "Full-time",
        "remote": True,
        "salary": {
            "min": 70000,
            "max": 90000,
            "currency": "USD"
        }
    },
    "status": "applied",           # applied, interview, offer, rejected, withdrawn
    "applicationDate": "2024-01-15T10:00:00Z",
    "source": "LinkedIn",         # Job board or referral source
    "jobPostingUrl": "https://...",
    "coverLetter": "Cover letter text...",
    "resumeVersion": "resume_v2.pdf",
    "notes": [
        {
            "content": "Follow up email sent",
            "createdAt": "2024-01-20T09:00:00Z",
            "type": "note"
        }
    ],
    "statusHistory": [
        {
            "status": "applied",
            "changedAt": "2024-01-15T10:00:00Z",
            "note": "Application submitted"
        }
    ],
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-20T09:00:00Z"
}
```

### Application Status Values

- `draft` - Application being prepared
- `applied` - Application submitted
- `under_review` - Application being reviewed
- `phone_screen` - Phone screening scheduled/completed
- `interview` - Interview scheduled/completed
- `technical_test` - Technical assessment
- `final_interview` - Final round interview
- `offer` - Job offer received
- `accepted` - Offer accepted
- `rejected` - Application rejected
- `withdrawn` - Application withdrawn

---

## 🔧 Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Django server port | 5002 |
| `DEBUG` | Django debug mode | False |
| `SECRET_KEY` | Django secret key | - |
| `MONGO_DB` | MongoDB database name | jobtracker_applications |
| `MONGO_HOST` | MongoDB host | localhost |
| `MONGO_PORT` | MongoDB port | 27017 |
| `JWT_SECRET` | JWT secret for token validation | - |
| `SERVICE_HOST` | Host for Consul registration | localhost |
| `CONSUL_HOST` | Consul server host | localhost |
| `CONSUL_PORT` | Consul server port | 8500 |
| `SERVICE_ID` | Unique service instance ID | application-service-1 |
| `SERVICE_NAME` | Service name for discovery | application-service |
| `RABBITMQ_URL` | RabbitMQ connection URL | amqp://localhost:5672 |
| `RABBITMQ_EXCHANGE` | RabbitMQ exchange name | jobtracker_exchange |
| `APP_QUEUE` | RabbitMQ queue for events | application_events |

---

## 🔄 Service Integration

### Message Queue Events

The service publishes events to RabbitMQ:

- `application.created` - When a new application is created
- `application.updated` - When application details are updated
- `application.status_changed` - When application status changes
- `application.deleted` - When application is deleted

### Service Dependencies

- **User Service**: User profile validation and data enrichment
- **Search Service**: Application indexing for search functionality
- **Analytics Service**: Application metrics and reporting
- **Notification Service**: Status change notifications

---

## 🧪 Testing

```bash
# Run unit tests
python manage.py test

# Run specific test module
python manage.py test api.tests.test_applications

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

---

## 📈 Monitoring & Health Checks

### Health Check Endpoint
```bash
curl http://localhost:5002/health/
```

Response:
```json
{
    "status": "healthy",
    "database": "connected",
    "consul": "registered",
    "rabbitmq": "connected",
    "timestamp": "2024-01-15T10:00:00Z"
}
```

---

## 🐳 Docker Support

```bash
# Build Docker image
docker build -t application-service .

# Run with Docker Compose
docker-compose up
```

---

## 📚 Additional Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [MongoEngine Documentation](http://mongoengine.org/)
- [RabbitMQ Tutorial](https://www.rabbitmq.com/tutorials/tutorial-one-python.html)

---

> [🔗 Back to main Job Tracker README](../../README.md)
