const amqp = require('amqplib');
const { updateAnalytics, getAnalyticsSummary } = require('../Controllers/analyticsController');
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


    ch.consume(q.queue, async msg => {
        if (!msg) return;
        const routingKey = msg.fields.routingKey;
        const data = JSON.parse(msg.content.toString());

        let analyticsUpdate = {};
        let isCreated = false;

        // Application events
        if (routingKey === (process.env.ROUTING_KEY_APP_CREATED || 'application.created')) {
            analyticsUpdate.applicationId = data.id;
            analyticsUpdate.status = data.status;
            isCreated = true;
            
        }
        if (routingKey === (process.env.ROUTING_KEY_APP_UPDATED || 'application.updated')) {
            analyticsUpdate.applicationId = data.id;
            analyticsUpdate.status = data.status;
            analyticsUpdate.previousStatus = data.previousStatus;

        }

        // Interview events
        if (routingKey === (process.env.ROUTING_KEY_ITV_CREATED || 'interview.created')) {
            analyticsUpdate.interviewId = data.id;
            isCreated = true;
        }
        if (routingKey === (process.env.ROUTING_KEY_ITV_UPDATED || 'interview.updated')) {
            analyticsUpdate.interviewId = data.id;
        }

        if (analyticsUpdate.applicationId || analyticsUpdate.interviewId) {
            
            await updateAnalytics(analyticsUpdate, isCreated);
        }

        // Prepare rolling summary
        const summary = await getAnalyticsSummary();

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
