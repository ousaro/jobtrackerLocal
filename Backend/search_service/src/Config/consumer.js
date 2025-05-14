const amqp = require('amqplib');
const { getIndex } = require('./meili');
require('dotenv').config();

const queues = [
  { name: process.env.USER_QUEUE, index: 'users' },
  { name: process.env.CONTACT_QUEUE, index: 'contacts' },
  { name: process.env.APP_QUEUE, index: 'applications' },
  {name: process.env.INTERVIEW_QUEUE, index: 'interviews'},
];
async function startConsumer() {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();

  for (const q of queues) {
    await channel.assertQueue(q.name);
    console.log(`[✅] Listening on ${q.name}`);

    channel.consume(q.name, async (msg) => {
      if (!msg) return;

      const { action, data } = JSON.parse(msg.content.toString());
      console.log(`[📥] ${q.name} → Action: ${action}`, data);

      const index = getIndex(q.index);
      try {
        if (action === 'create') {
          await index.addDocuments([data]);
          console.log(`[✅] Indexed to ${q.index}`);
        } else if (action === 'delete') {
          await index.deleteDocument(data.id);
          console.log(`[🗑️] Deleted from ${q.index} → ID: ${data.id}`);
        } else {
          console.warn(`[⚠️] Unknown action "${action}"`);
        }
      } catch (e) {
        console.error(`[❌] Error in "${action}" for ${q.index}:`, e.message);
      }
      channel.ack(msg);
    });
  }
}

module.exports = startConsumer;
