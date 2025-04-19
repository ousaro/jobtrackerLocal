resource "docker_image" "mongo" {
    name = "mongo:6"
}

resource "docker_volume" "mongo_data_user"  {
    name = "mongo-data-user"
}

resource "docker_container" "mongo_user" {
    name = "mongo-user"
    image = docker_image.mongo.name

    ports {
        internal = 27017
        external = 27018
    }

    volumes {
        volume_name = docker_volume.mongo_data_user.name
        container_path = "/data/db"
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