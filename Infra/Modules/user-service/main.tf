resource "docker_image" "user_service" {
    name = "mezlin/user-service:latest"
}

resource "docker_container" "user_service" {
    name = "user-service"
    image = docker_image.user_service.name

    ports {
        internal = 5001
        external = 5001
    }

    networks_advanced {
        name = var.network_name
    }

    env = [
        "MONGO_URI=${local.mongo_uri}",
        "MONGO_INITDB_ROOT_USERNAME=${var.mongo_root_username}",
        "MONGO_INITDB_ROOT_PASSWORD=${var.mongo_root_password}",
        "MONGO_INITDB_DATABASE=${var.mongo_database}"
    ]
}