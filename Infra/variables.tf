variable "mongo_root_username" {
  description = "The root username for MongoDB"
  type        = string
}

variable "mongo_root_password" {
  description = "The root password for MongoDB"
  type        = string
  sensitive   = true
}

variable "mongo_database" {
  description = "Initial MongoDB database to create"
  type        = string
}

variable "postgres_user" {
  description = "The root username for PostgreSQL"
  type        = string
}

variable "postgres_password" {
  description = "The root password for MongoDB"
  type        = string
  sensitive   = true
}

variable "postgres_database" {
  description = "Initial MongoDB database to create"
  type        = string
}

locals {
  mongo_uri = "mongodb://${var.mongo_root_username}:${var.mongo_root_password}@mongo-user:27017/${var.mongo_database}"
  postgres_uri = "postgresql://${var.postgres_user}:${var.postgres_password}@postgres-auth:5432/${var.postgres_database}"
}

