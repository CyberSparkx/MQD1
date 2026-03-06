const amqplib = require('amqplib');

const QUEUE = 'email_queue';

const publishMessage = async (req, res) => {
  try {
    const connection = await amqplib.connect(process.env.CLOUDAMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });

    const message = JSON.stringify({
      subject: 'Hello from RabbitMQ!',
      body: 'This email was triggered via a message queue.',
    });

    channel.sendToQueue(QUEUE, Buffer.from(message), { persistent: true });
    console.log('✅ Message published to queue');

    setTimeout(() => connection.close(), 500);

    res.status(200).json({ success: true, message: 'Message added to queue!' });
  } catch (err) {
    console.error('Publisher error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { publishMessage };