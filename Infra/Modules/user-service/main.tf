resource "docker_image" "user_service" {
    name = "mezlin/user-service:latest"
}

resource "docker_container" "user_service" {
    name = "user-service"
    image = docker_image.user_service.name

    ports {
        internal = 3000
        external = 3000
    }

    networks_advanced {
        name = var.network_id
    }

    env = [
        "MONGO_URI=${var.mongo_uri}",
        "MONGO_INITDB_ROOT_USERNAME=${var.mongo_root_username}",
        "MONGO_INITDB_ROOT_PASSWORD=${var.mongo_root_password}",
        "MONGO_INITDB_DATABASE=${var.mongo_database}"
    ]
}