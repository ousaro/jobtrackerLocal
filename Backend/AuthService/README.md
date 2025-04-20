# 🛡️ AuthService

**AuthService** is a microservice responsible for **user authentication and authorization** in a distributed system. It supports:

- ✅ User registration & login  
- 🔐 Secure password management  
- 🔄 Token generation (JWT)  
- 🔗 Easy integration with other microservices  

Designed with security, scalability, and modularity in mind.

---

## 🚀 Getting Started

Follow these steps to set up and run the service locally:

### 1. Clone the Repository

```bash
git clone https://github.com/ousaro/JobTracker.git
cd ./Backend/AuthService
```

### 2. Start Docker

Ensure Docker and Docker Compose are installed and running on your system.

### 3. Build and Run the Service

```bash
docker-compose up --build
```

This will:

- Build the AuthService image
- Start the service and its dependencies (PostgreSQL & Admin panel)

### 4. Access the Service

- **Auth API Endpoint:**  
  [http://localhost:8080/api/auth/](http://localhost:8080/api/auth/)

---

## 🛢️ Database Access & Management

The service uses **PostgreSQL** as the underlying database. The database will be initialized automatically when the service starts.

### 🔧 Managing the Database with Adminer

You can manage the database via [Adminer](http://localhost:5050):

- **URL:** [http://localhost:5050](http://localhost:5050)  
- **Login Credentials:**

  | Field    | Value             |
  |----------|-------------------|
  | Server   | `db`              |
  | Username | `auth_user`       |
  | Password | `password`       |
  | Database | `auth_db`         |

---

## 📁 Folder Structure

```plaintext
AuthService/
├── src/main/java/com/example/authservice/   # Main application code
│   ├── config/                              # Configuration classes (e.g., SecurityConfig, JWTConfig)
│   ├── controller/                          # Controllers for Auth API (e.g., AuthController)
│   ├── service/                             # Business logic for auth operations (e.g., AuthService)
│   ├── model/                               # Entity classes (e.g., User, Role)
│   ├── repository/                          # Database interaction (e.g., UserRepository)
│   ├── security/                            # Security-related classes (e.g., JWT filters)
│   └── util/                                # Utility classes (e.g., JWT utility, password hashing)
├── src/main/resources/
│   ├── application.properties               # Application configuration (e.g., DB connection, JWT secret)
│   ├── private.key                         # Contains private JWT key for signing tokens
│   ├── public.key                          # Contains public JWT key for verifying tokens
│   └── static/                              # Static files (if needed)
├── Dockerfile
├── docker-compose.yml
└── README.md
---

## 🔐 Environment Variables

Make sure to configure the `application.properties` file (or define values in `docker-compose.yml`). Key variables include:

```env
# For PostgreSQL
POSTGRES_DB: db_name
POSTGRES_USER: user_name
POSTGRES_PASSWORD: user_password

# For AuthService
SPRING_DATASOURCE_URL: postgres_url
SPRING_DATASOURCE_USERNAME: user_name
SPRING_DATASOURCE_PASSWORD: user_password
SPRING_DATASOURCE_DRIVER_CLASS_NAME: driver_class_name

# For pgAdmin
PGADMIN_DEFAULT_EMAIL: pdAdmin_email
PGADMIN_DEFAULT_PASSWORD: pgAdmin_password
```

---

## 📬 API Endpoints

Sample base URL: `http://localhost:8080/api/auth/`

- `POST /register` – Register a new user  
- `POST /login` – Authenticate user and return token  

---

## 🗝️ JWT Configuration

In the src/main/resources directory, you will find two important files for JWT configuration:

`private.pom`
    - Contains the private key used for signing JWT tokens.

    - Purpose: Used to create secure tokens that can be sent to clients during the authentication process.

`public.pom`  
    - Contains the corresponding public key used for verifying the JWT tokens.

    - Purpose: This key is used by the service to ensure that the tokens received from clients are valid and haven't been tampered with.

These files should be kept secure and should not be shared publicly, as they are crucial to maintaining the integrity of the authentication process.

## 📌 Notes

- The service is containerized using Docker for easy deployment and local development.
- PostgreSQL data is stored in a volume to persist across restarts.
- This service is designed to be integrated with other microservices in a larger system.

---

## 🧪 Future Improvements

- OAuth2 / Social login integration  
- Role-based access control (RBAC)  
- Rate limiting & brute-force protection  
- Unit and integration test coverage

---