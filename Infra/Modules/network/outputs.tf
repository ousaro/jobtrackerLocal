output "network_name" {
  value = docker_network.app_network.name
  description = "The name of the docker network"
}
