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

variable "mongo_uri" {
  description = "MongoDB connection URI"
  type        = string
  default     = "mongodb://localhost:27018/user-service"
  sensitive   = true
  
}