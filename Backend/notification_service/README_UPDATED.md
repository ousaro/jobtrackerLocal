# 🔔 Notification Service

**Notification Service** is a Node.js microservice that handles all notification and communication needs for the JobTracker application. It provides multi-channel notification delivery:

- 📧 Email notifications (SMTP)
- 📱 SMS notifications (optional)
- 🔔 In-app notifications
- ⏰ Scheduled reminders and alerts
- 📅 Interview reminders
- 📊 Application status updates
- 🎯 Customizable notification preferences

Built with Node.js, Express, and various notification providers for reliable message delivery.

---

## 🛠️ Technology Stack

- **Framework:** Node.js + Express.js
- **Database:** MongoDB (notification logs and preferences)
- **Email:** Nodemailer (SMTP support)
- **SMS:** Twilio/AWS SNS (configurable)
- **Templates:** Handlebars for email templates
- **Queue:** RabbitMQ for async processing
- **Scheduling:** Node-cron for scheduled notifications

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (for logs and preferences)
- SMTP server or email service (Gmail, SendGrid, etc.)
- RabbitMQ (for message queues)
- Consul (for service discovery)

### 1. Clone the Repository

```bash
git clone https://github.com/ousaro/JobTracker.git
cd JobTracker/Backend/notification_service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the service root:

```env
# Server Configuration
PORT=5005
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/jobtracker_notifications

# Email Configuration (SMTP)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM_NAME=JobTracker
EMAIL_FROM_ADDRESS=noreply@jobtracker.com

# SMS Configuration (Twilio)
SMS_ENABLED=false
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# Push Notifications (Firebase - Optional)
FIREBASE_SERVER_KEY=your-firebase-server-key
FIREBASE_PROJECT_ID=your-project-id

# Service Discovery
SERVICE_HOST=localhost
CONSUL_HOST=localhost
CONSUL_PORT=8500
SERVICE_ID=notification-service-1
SERVICE_NAME=notification-service

# RabbitMQ Configuration
RABBITMQ_URL=amqp://localhost:5672
NOTIFICATION_EXCHANGE=notifications_exchange
NOTIFICATION_QUEUE=notification_queue
EMAIL_QUEUE=email_queue
SMS_QUEUE=sms_queue

# Template Configuration
TEMPLATE_DIR=./templates
FRONTEND_URL=http://localhost:3000

# Rate Limiting
EMAIL_RATE_LIMIT=100
SMS_RATE_LIMIT=50
DAILY_LIMIT_PER_USER=50

# Retry Configuration
MAX_RETRIES=3
RETRY_DELAY=5000
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

- **Notification API:** http://localhost:5005/api/notifications/
- **Health Check:** http://localhost:5005/health
- **Templates Preview:** http://localhost:5005/templates/preview
- **Service Status:** Check Consul UI at http://localhost:8500

---

## 📋 API Endpoints

### Send Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/notifications/send` | Send immediate notification |
| POST | `/api/notifications/schedule` | Schedule notification |
| POST | `/api/notifications/bulk` | Send bulk notifications |

### Notification Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications/history` | Get notification history |
| GET | `/api/notifications/status/{id}` | Get notification status |
| DELETE | `/api/notifications/cancel/{id}` | Cancel scheduled notification |

### User Preferences

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications/preferences` | Get user notification preferences |
| PUT | `/api/notifications/preferences` | Update notification preferences |
| POST | `/api/notifications/subscribe` | Subscribe to notification type |
| DELETE | `/api/notifications/unsubscribe` | Unsubscribe from notifications |

### Templates

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications/templates` | List available templates |
| GET | `/api/notifications/templates/{type}` | Get template by type |
| POST | `/api/notifications/templates/preview` | Preview template with data |

---

## 📨 Notification Types & Templates

### Email Templates

#### Application Status Updates
```handlebars
<!-- templates/email/application-status.hbs -->
<h2>Application Status Update</h2>
<p>Hi {{firstName}},</p>
<p>Your application for <strong>{{position}}</strong> at <strong>{{company}}</strong> has been updated to: <strong>{{status}}</strong></p>
{{#if notes}}
<p><strong>Notes:</strong> {{notes}}</p>
{{/if}}
<p>View your application: <a href="{{applicationUrl}}">Click here</a></p>
```

#### Interview Reminders
```handlebars
<!-- templates/email/interview-reminder.hbs -->
<h2>Interview Reminder</h2>
<p>Hi {{firstName}},</p>
<p>You have an interview scheduled for <strong>{{position}}</strong> at <strong>{{company}}</strong></p>
<p><strong>Date:</strong> {{interviewDate}}</p>
<p><strong>Time:</strong> {{interviewTime}}</p>
<p><strong>Type:</strong> {{interviewType}}</p>
{{#if location}}
<p><strong>Location:</strong> {{location}}</p>
{{/if}}
{{#if meetingLink}}
<p><strong>Meeting Link:</strong> <a href="{{meetingLink}}">Join Interview</a></p>
{{/if}}
```

### SMS Templates

#### Quick Status Updates
```
JobTracker: Your application for {{position}} at {{company}} status changed to {{status}}. Check app for details.
```

#### Interview Reminders
```
Reminder: Interview for {{position}} at {{company}} in {{timeUntil}}. Location: {{location}}
```

---

## 🔔 Notification Categories

### System Notifications
- Welcome emails for new users
- Password reset instructions
- Account verification emails
- System maintenance alerts

### Application Notifications
- Application submitted confirmations
- Status change alerts
- Application deadline reminders
- Follow-up suggestions

### Interview Notifications
- Interview scheduled confirmations
- Interview reminders (24h, 2h, 30min before)
- Interview rescheduled alerts
- Post-interview follow-up reminders

### Analytics Notifications
- Weekly progress summaries
- Monthly analytics reports
- Goal achievement celebrations
- Performance insights

---

## 📊 Data Models

### Notification Schema

```javascript
{
  id: String,
  userId: String,
  type: String,                 // email, sms, push, in-app
  category: String,             // application, interview, system, analytics
  template: String,             // Template identifier
  subject: String,              // Email subject or notification title
  recipient: {
    email: String,
    phone: String,
    deviceToken: String
  },
  data: Object,                 // Template variables
  scheduledAt: Date,            // For scheduled notifications
  sentAt: Date,
  status: String,               // pending, sent, failed, cancelled
  attempts: Number,
  lastError: String,
  deliveryReceipt: Object,      // Provider-specific delivery info
  createdAt: Date,
  updatedAt: Date
}
```

### User Preferences Schema

```javascript
{
  userId: String,
  preferences: {
    email: {
      enabled: Boolean,
      applicationUpdates: Boolean,
      interviewReminders: Boolean,
      weeklyReports: Boolean,
      marketingEmails: Boolean
    },
    sms: {
      enabled: Boolean,
      urgentOnly: Boolean,
      interviewReminders: Boolean
    },
    push: {
      enabled: Boolean,
      applicationUpdates: Boolean,
      interviewReminders: Boolean
    },
    inApp: {
      enabled: Boolean,
      showDesktop: Boolean
    }
  },
  timezone: String,
  quietHours: {
    enabled: Boolean,
    start: String,              // e.g., "22:00"
    end: String                 // e.g., "08:00"
  },
  frequency: {
    digest: String,             // daily, weekly, never
    reminders: String           // immediate, hourly, daily
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | 5005 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/jobtracker_notifications |
| `EMAIL_SERVICE` | Email service provider | gmail |
| `EMAIL_HOST` | SMTP host | smtp.gmail.com |
| `EMAIL_PORT` | SMTP port | 587 |
| `EMAIL_USER` | SMTP username | - |
| `EMAIL_PASS` | SMTP password/app password | - |
| `SMS_ENABLED` | Enable SMS notifications | false |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | - |
| `SERVICE_HOST` | Host for Consul registration | localhost |
| `CONSUL_HOST` | Consul server host | localhost |
| `RABBITMQ_URL` | RabbitMQ connection URL | amqp://localhost:5672 |
| `EMAIL_RATE_LIMIT` | Emails per hour limit | 100 |
| `MAX_RETRIES` | Maximum retry attempts | 3 |

---

## 🔄 Message Queue Integration

### Event Consumers

The service listens to events from other services:

- `application.created` → Send welcome email
- `application.status_changed` → Status update notification
- `interview.scheduled` → Interview confirmation
- `interview.reminder` → Interview reminder (scheduled)
- `user.registered` → Welcome email sequence

### Scheduled Jobs

```javascript
// Interview reminders
cron.schedule('*/15 * * * *', () => {
  checkUpcomingInterviews();
});

// Daily digest
cron.schedule('0 9 * * *', () => {
  sendDailyDigest();
});

// Weekly reports
cron.schedule('0 9 * * 1', () => {
  sendWeeklyReport();
});
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Test email templates
npm run test:templates

# Test notification delivery
npm run test:delivery

# Run with coverage
npm run test:coverage
```

### Template Testing
```bash
# Preview email templates
curl http://localhost:5005/templates/preview/application-status \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "position": "Software Developer", 
    "company": "Tech Corp",
    "status": "Interview Scheduled"
  }'
```

---

## 🔍 Monitoring & Debugging

### Health Check
```bash
curl http://localhost:5005/health
```

### Notification Metrics
```bash
curl http://localhost:5005/metrics
```

### Debug Failed Notifications
```bash
# Get failed notifications
curl http://localhost:5005/api/notifications/history?status=failed

# Retry failed notification
curl -X POST http://localhost:5005/api/notifications/retry/{notificationId}
```

---

## 🐳 Docker Support

```bash
# Build Docker image
docker build -t notification-service .

# Run with Docker Compose
docker-compose up
```

---

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Twilio Node.js SDK](https://www.twilio.com/docs/libraries/node)
- [Handlebars Template Guide](https://handlebarsjs.com/guide/)
- [RabbitMQ Node.js Tutorial](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)

---

> [🔗 Back to main Job Tracker README](../../README.md)
