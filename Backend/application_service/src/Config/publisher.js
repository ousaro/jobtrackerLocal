const amqp = require('amqplib');

let channel, connection;

async function connect() {
  if (!channel || !connection) {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
  }
  return channel;
}

async function publishEvent(routingKey, payload) {
  const ch = await connect();
  try {
    await ch.assertExchange(process.env.RABBITMQ_EXCHANGE, process.env.RABBITMQ_EXCHANGE_TYPE || 'topic', { durable: true });
    ch.publish(
      process.env.RABBITMQ_EXCHANGE,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true, deliveryMode: 2 }
    );
    console.log(`Published event to "${routingKey}"`);
  } catch (error) {
    console.error(`Failed to publish event to "${routingKey}":`, error.message);
  }
}

async function publishToAppQueue(payload) {
  const ch = await connect();
  try {
    await ch.assertQueue(process.env.APP_QUEUE, { durable: true });
    ch.sendToQueue(process.env.APP_QUEUE, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
      deliveryMode: 2
    });
    console.log(`Published to queue "${process.env.APP_QUEUE}"`);
  } catch (error) {
    console.error(`Failed to publish to queue "${process.env.APP_QUEUE}":`, error.message);
  }
}

module.exports = {
  publishEvent,
  publishToAppQueue,
};
