const amqplib = require('amqplib');
const nodemailer = require('nodemailer');
require('dotenv').config();

const QUEUE = 'email_queue';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function startConsumer() {
  try {
    const connection = await amqplib.connect(process.env.CLOUDAMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });
    channel.prefetch(1);

    console.log('👂 Consumer listening for messages...');

    channel.consume(QUEUE, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        console.log('📩 Message received:', data);

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.RECEIVER_EMAIL,
          subject: data.subject,
          text: data.body,
        });

        console.log('✉️  Email sent!');
        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error('Consumer error:', err);
  }
}

startConsumer();