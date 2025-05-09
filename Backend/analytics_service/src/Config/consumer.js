const amqp = require('amqplib');
require('dotenv').config();

async function start() {
    // Load ENV config with fallbacks
    const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
    const exchange = process.env.EXCHANGE_NAME || 'jobtracker.exchange';
    const exchangeType = process.env.EXCHANGE_TYPE || 'topic';
    const queueName = process.env.QUEUE_ANALYTICS || ''; // '' for exclusive temp queue
    const prefetchCount = parseInt(process.env.PREFETCH_COUNT || '10', 10);

    // Routing keys to listen for
    const keys = [
        process.env.ROUTING_KEY_APP_CREATED || 'application.created',
        process.env.ROUTING_KEY_APP_UPDATED || 'application.updated',
        process.env.ROUTING_KEY_ITV_CREATED || 'interview.created',
        process.env.ROUTING_KEY_ITV_UPDATED || 'interview.updated'
    ].filter(Boolean);

    // Routing key to publish analytics summary
    const summaryRoutingKey = process.env.ROUTING_KEY_ANALYTICS_SUMMARY || 'analytics.summary';

    // Connect & init channel
    const conn = await amqp.connect(rabbitmqUrl);
    const ch = await conn.createChannel();

    await ch.assertExchange(exchange, exchangeType, { durable: true });

    const q = await ch.assertQueue(queueName, { exclusive: !queueName });
    await ch.prefetch(prefetchCount);

    // Bind all event routing keys to the queue
    for (const key of keys) {
        await ch.bindQueue(q.queue, exchange, key);
    }

    // In-memory state for demo (replace with DB for real use)
    let applications = [];
    let interviews = [];

    ch.consume(q.queue, async msg => {
        if (!msg) return;
        const routingKey = msg.fields.routingKey;
        const data = JSON.parse(msg.content.toString());

        // Track by routing key
        if (routingKey === (process.env.ROUTING_KEY_APP_CREATED || 'application.created')) {
            applications.push(data);
        } else if( routingKey === (process.env.ROUTING_KEY_APP_UPDATED || 'application.updated')) {
            // Find/update application by id, if exists; else push
            const idx = applications.findIndex(x => x.id === data.id);
            if (idx >= 0) applications[idx] = data;
            else applications.push(data);
        }else if (routingKey === (process.env.ROUTING_KEY_ITV_CREATED || 'interview.created')) {
            interviews.push(data);
        } else if (routingKey === (process.env.ROUTING_KEY_ITV_UPDATED || 'interview.updated')) {
            // Find/update interview by id, if exists; else push
            const idx = interviews.findIndex(x => x.id === data.id);
            if (idx >= 0) interviews[idx] = data;
            else interviews.push(data);
        }

        // Prepare rolling summary
        const summary = {
            totalApplications: applications.length,
            totalInterviews: interviews.length,
            lastApplication: applications[applications.length - 1],
            lastInterview: interviews[interviews.length - 1]
        };

        // Publish summary
        await ch.publish(
            exchange,
            summaryRoutingKey,
            Buffer.from(JSON.stringify(summary))
        );

        console.log('📊 Analytics summary published:', summary);

        ch.ack(msg);
    }, { noAck: false });

    console.log('✅ Analytics consumer running with config:', { exchange, queue: q.queue, keys });
}

module.exports = start;
