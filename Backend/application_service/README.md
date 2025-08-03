# 📋 Application Service

**Application Service** is a Django-based microservice that manages job applications in the JobTracker system. It provides comprehensive job application tracking and management capabilities:

-  Job application CRUD operations
-  Application status tracking and updates
-  Company and position management
-  Application timeline and history
-  Advanced filtering and search
-  Application statistics and analytics

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
git clone https://github.com/ousaro/jobtrackerLocal.git
cd jobtrackerLocal/Backend/application_service
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

```
### 5. Run Database Migrations

```bash
python manage.py migrate
```

### 6. Run the Service

```bash
# Development mode
python manage.py runserver 0.0.0.0:5002

# Or using the local runner
python runLocal.py
```

### 7. Access the Service

- **Application API:** http://localhost:5002/api/applications/

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
| `SERVICE_HOST` | Host for Consul registration | localhost |
| `CONSUL_HOST` | Consul server host | localhost |
| `CONSUL_PORT` | Consul server port | 8500 |
| `SERVICE_ID` | Unique service instance ID | application-service-1 |
| `SERVICE_NAME` | Service name for discovery | application-service |
| `RABBITMQ_URL` | RabbitMQ connection URL | amqp://localhost:5672 |
| `RABBITMQ_EXCHANGE` | RabbitMQ exchange name | jobtracker_exchange |
| `APP_QUEUE` | RabbitMQ queue for events | application_events |

---

> [🔗 Back to main Job Tracker README](../../README.md)
