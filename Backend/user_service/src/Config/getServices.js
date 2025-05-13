const Consul = require('consul');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const {
  CONSUL_HOST = 'localhost',
  CONSUL_PORT = 8500,
  AUTH_SERVICE = 'auth-service',
} = process.env;

const consul = new Consul({
  host: CONSUL_HOST,
  port: CONSUL_PORT,
  promisify: true
});


const getService = async (serviceName) => {
  try {
    const services = await consul.catalog.service.nodes(serviceName);

    if (!services.length) {
      throw new Error(`No services found for ${serviceName}`);
    }

    // You can add load balancing here by randomly choosing one
    const service = services[0];
    const address = `${service.Address}:${service.ServicePort}`;
    return address;
  } catch (err) {
    console.error(`Error discovering service ${serviceName}:`, err);
    throw err;
  }
};

const deleteAuthUser = async (email) => {
  const authServiceAddress = await getService(AUTH_SERVICE);
  const response = await axios.delete(`http://${authServiceAddress}/auth/${email}`);
  return response.data;
}



module.exports = { getService, deleteAuthUser };
