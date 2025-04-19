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

locals {
  mongo_uri = "mongodb://${var.mongo_root_username}:${var.mongo_root_password}@mongo-user:27017/${var.mongo_database}" 
}

variable "network_name" {
  description = "The ID of the Docker network to connect to"
  type        = string
}
