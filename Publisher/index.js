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

const message = `{
    "auth_mechanism": "PLAIN",
        "channel_max": 2047,
        "channels": 1
}`;

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

channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)));

await channel.close();
await connection.close();
