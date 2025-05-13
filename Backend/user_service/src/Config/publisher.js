const amqp = require('amqplib');

let channel, connection;

async function connect() {
  if (!channel || !connection) {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
  }
  return channel;
}

async function publishProfileAction(queue, action, data) {
  const ch = await connect();
  try {
    await ch.assertQueue(queue);
    const message = {
      action,
      data,
    };
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`Published "${action}" to queue "${queue}"`);
  } catch (error) {
    console.error(`Failed to publish to queue "${queue}":`, error.message);
  }
}


module.exports = {
  publishProfileAction,
};