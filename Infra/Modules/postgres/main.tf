resource "docker_image" "user_service" {
    name = "postgres:17-alpine"
}

resource "docker_volume" "postgres_data_auth"  {
    name = "postgres-data-auth"
}

resource "docker_container" "postgres_auth" {
    name = "postgres-auth"
    image = docker_image.user_service.name

    ports {
        internal = 5432
        external = 5432
    }

    volumes {
        volume_name = docker_volume.postgres_data_auth.name
        container_path = "/var/lib/postgresql/data"
    }

    networks_advanced {
        name = var.network_name
    }

    env = [
        "POSTGRES_URI=${local.postgres_uri}",
        "POSTGRES_USER=${var.postgres_user}",
        "POSTGRES_PASSWORD=${var.postgres_password}",
        "POSTGRES_DB=${var.postgres_database}"
    ]
}