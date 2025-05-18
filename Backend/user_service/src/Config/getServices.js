const Consul = require('consul');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const {
  CONSUL_HOST = 'localhost',
  CONSUL_PORT = 8500,
  AUTH_SERVICE = 'auth-service'
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

    // Pick one instance (load balancing could be added here)
    const service = services[Math.floor(Math.random() * services.length)];
    // Use ServiceAddress if available, fallback to Address
    const host = service.ServiceAddress || service.Address;
    const address = `${host}:${service.ServicePort}`;
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
