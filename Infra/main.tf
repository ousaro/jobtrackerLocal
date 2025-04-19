module "network" {
    source = "./Modules/network"
}

module "mongo-user" {
    source = "./Modules/mongo"

    mongo_root_username = var.mongo_root_username
    mongo_root_password = var.mongo_root_password
    mongo_database = var.mongo_database

    network_name = module.network.network_name
}

module "user-service" {
    source = "./Modules/user-service"

    mongo_root_username = var.mongo_root_username
    mongo_root_password = var.mongo_root_password
    mongo_database = var.mongo_database

    network_name = module.network.network_name
}

module "postgres-auth" {
    source = "./Modules/postgres"

    postgres_user = var.postgres_user
    postgres_password = var.postgres_password
    postgres_database = var.postgres_database

    network_name = module.network.network_name
}