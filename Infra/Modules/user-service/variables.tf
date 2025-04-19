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
  default     = "mongodb://mongo:27018/User-Service"
  sensitive   = true
  
}

variable "network_id" {
  description = "The ID of the Docker network to connect to"
  type        = string
}
