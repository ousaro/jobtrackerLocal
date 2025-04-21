# Makefile for managing frontend and backend services

# Frontend
frontend-dev:
	cd ./Frontend && npm run dev
frontend-up: 

#docker-compose -f frontend/docker-compose.yml up -d

frontend-down:

#docker-compose -f frontend/docker-compose.yml down

# Auth Service
auth-up:
	docker-compose -f ./backend/AuthService/docker-compose.yml up -d

auth-down:
	docker-compose -f ./backend/AuthService/docker-compose.yml down

# User Service
user-up:
	docker-compose -f ./backend/User_Service/docker-compose.yml up -d

user-down:
	docker-compose -f ./backend/User_Service/docker-compose.yml down

# Search Service
search-up:
	docker-compose -f ./backend/Search_Service/docker-compose.yml up -d

search-down:
	docker-compose -f ./backend/Search_Service/docker-compose.yml down

# Run all services
up: frontend-up auth-up user-up search-up

# Stop all services
down: frontend-down auth-down user-down search-down

# Logs for all services
logs:
	docker-compose -f frontend/docker-compose.yml logs -f &
	docker-compose -f ./backend/AuthService/docker-compose.yml logs -f &
	docker-compose -f ./backend/User_Service/docker-compose.yml logs -f &
	docker-compose -f ./backend/Search_Service/docker-compose.yml logs -f
