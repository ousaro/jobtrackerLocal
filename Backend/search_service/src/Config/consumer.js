const amqp = require('amqplib');
const { getIndex, testRead } = require('./meili');
require('dotenv').config();

const queues = [
  { name: process.env.USER_QUEUE, index: 'users' },
  { name: process.env.CONTACT_QUEUE, index: 'contacts' },
  { name: process.env.APP_QUEUE, index: 'applications' },
];
async function startConsumer() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();

  for (const q of queues) {
    await channel.assertQueue(q.name);
    console.log(`[✅] Listening on ${q.name}`);

    channel.consume(q.name, async (msg) => {
      if (!msg) return;

      const data = JSON.parse(msg.content.toString());
      console.log(`[📥] ${q.name} → Indexing`, data);

      const index = getIndex(q.index);
      try{
        await index.addDocuments([data]);
      }catch(e){
        console.error(`[❌] Error indexing to ${q.index}:`, e.message);
      }
      channel.ack(msg);
    });
  }
}

module.exports = startConsumer;
