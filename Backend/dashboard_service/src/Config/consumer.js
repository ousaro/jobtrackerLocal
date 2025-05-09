const amqp = require('amqplib');
require('dotenv').config();

async function startDashboardConsumer() {
    const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    const exchange = process.env.EXCHANGE_NAME || 'jobtracker.exchange';
    const exchangeType = process.env.EXCHANGE_TYPE || 'topic';
    const summaryRoutingKey = process.env.ROUTING_KEY_ANALYTICS_SUMMARY || 'analytics.summary';

    // Connect & create channel
    const conn = await amqp.connect(rabbitmqUrl);
    const ch = await conn.createChannel();
    await ch.assertExchange(exchange, exchangeType, { durable: true });

    // Create exclusive queue (auto-delete when consumer disconnects)
    const q = await ch.assertQueue('', { exclusive: true });

    // Bind summary routing key to queue
    await ch.bindQueue(q.queue, exchange, summaryRoutingKey);

    console.log('🚦 Waiting for analytics summaries...');

    ch.consume(q.queue, (msg) => {
        if (!msg) return;
        const summary = JSON.parse(msg.content.toString());
        console.log('📈 Analytics summary received by dashboard:', summary);
        
        ch.ack(msg);
    }, { noAck: false });
}

module.exports = startDashboardConsumer;
