const amqp = require('amqplib');

let channel, connection;

async function connect() {
  if (!channel || !connection) {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
  }
  return [channel, connection];
}

async function publishToQueue(queue, payload) {
  const [ch, conn] = await connect();
  try {
    await ch.assertQueue(queue);
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
    console.log(`Published to queue "${queue}"`);
  } catch (error) {
    console.error(`Failed to publish to queue "${queue}":`, error.message);
  }finally {
    if (channel && connection) {
      await channel.close();
      await connection.close();
      console.log('RabbitMQ connection closed.');
    }
  }
}

async function publishAll() {
  try {
    await publishToQueue('user.index', {
      id: 'user_123',
      name: 'John Doe',
      email: 'john@acme.com',
      company: 'Acme Corp'
    });

    // await publishToQueue('contact.index', {
    //   id: 'contact_456',
    //   name: 'Alice Smith',
    //   phone: '+123456789',
    //   email: 'alice@example.com'
    // });

    // await publishToQueue('application.index', {
    //   id: 'app_789',
    //   name: 'Alice Smith',
    //   phone: '+123456789',
    //   email: 'alice@example.com'
    // });
  } catch (error) {
    console.error('Error in publishing messages:', error.message);
  } 
}

publishAll();

