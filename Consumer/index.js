import amqplib from "amqplib";

const MQ_USER = "guest";
const MQ_PASSWORD = "guest";
const MQ_HOST = "localhost";
const MQ_PORT = "5672";
const MQ_VIRTUALHOST = "/ABC";
const QUEUE_NAME = "QUEUE_NAME";

const MQ_DEADLETTEREXCHANGE = "";
const MQ_DEADLETTERROUTINGKEY = "";
const MQ_MESSAGETTL = "";

const connection = await amqplib.connect(
  `amqp://${MQ_USER}:${MQ_PASSWORD}@${MQ_HOST}:${MQ_PORT}/${encodeURIComponent(
    MQ_VIRTUALHOST
  )}`
);
const channel = await connection.createChannel();

const queueStatus = await channel.assertQueue(QUEUE_NAME, {
  MQ_DEADLETTEREXCHANGE,
  MQ_DEADLETTERROUTINGKEY,
  MQ_MESSAGETTL,
});

console.log(`Queue status - ${JSON.stringify(queueStatus)}`);

channel.consume(QUEUE_NAME, (message) => {
  const data = message.content.toString();
  console.log(JSON.parse(data));

  channel.ack(message);
});
