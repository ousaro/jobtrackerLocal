module "network" {
    source = "./Modules/network"
}

module "mongo-user" {
    source = "./Modules/mongo"

    mongo_root_username = var.mongo_root_username
    mongo_root_password = var.mongo_root_password
    mongo_database = var.mongo_database
    mongo_uri = var.mongo_uri

    network_id = module.network.id
}

module "user-service" {
    source = "./Modules/user-service"

    mongo_root_username = var.mongo_root_username
    mongo_root_password = var.mongo_root_password
    mongo_database = var.mongo_database
    mongo_uri = var.mongo_uri

    network_id = module.network.id
}
