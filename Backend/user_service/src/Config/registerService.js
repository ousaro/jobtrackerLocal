const Consul = require('consul');
const dotenv = require('dotenv');
dotenv.config();

const {
  SERVICE_HOST = 'user-service',
  PORT = 5001,
  CONSUL_HOST = 'consul',
  CONSUL_PORT = 8500,
  SERVICE_ID = 'user-service',
  SERVICE_NAME = 'user-service'
} = process.env;

const consul = new Consul({
  host: CONSUL_HOST,
  port: CONSUL_PORT,
  promisify: true
});




const registerService = async () => {

  try {
    await consul.agent.service.register({
      id: SERVICE_ID,
      name: SERVICE_NAME,
      address: SERVICE_HOST, 
      port: parseInt(PORT),
      check: {
        http: `http://${SERVICE_HOST}:${PORT}/health`,
        interval: '10s'
      }
    });
    console.log(`Service registered with Consul at ${SERVICE_HOST}:${PORT}`);
  } catch (err) {
    console.error('Failed to register with Consul:', err);
  }
};



module.exports = registerService;
