output "network_name" {
  value = "The app is running on the Docker network: '${docker_network.app_network.name}'"
  description = "The name of the docker network"
}
