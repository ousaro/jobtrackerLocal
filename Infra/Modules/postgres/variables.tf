variable "network_name" {
  description = "The ID of the Docker network to connect to"
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
    postgres_uri = "postgresql://${var.postgres_user}:${var.postgres_password}@postgres-auth:5432/${var.postgres_database}"
}