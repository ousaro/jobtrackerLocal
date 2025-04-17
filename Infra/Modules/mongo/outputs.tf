output "mongo_status" {
  value = "MongoDB container '${docker_container.mongo_user.name}' is running with ID '${docker_container.mongo_user.id}'"
  description = "Status of the MongoDB container"
}

output "mongo_port_info" {
  value = "MongoDB exposed on host port ${docker_container.mongo_user.ports[0].external}"
  description = "Host port MongoDB is mapped to"
}
