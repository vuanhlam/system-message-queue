"use strict";

const amqp = require("amqplib");

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    if (!connection) throw new Error("Connection can not established");

    const channel = await connection.createChannel();

    return { channel, connection };
  } catch (error) {}
};

const connectToRabbitMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();

    // Pushlish message to a queue
    const queue = "test-queue";
    const message = "Hello, shopDev by Vu Anh Lam";

    await channel.assertQueue(queue);

    await channel.sendToQueue(queue, Buffer.from(message));

    // close connection
    await connection.close();
  } catch (error) {
    console.log(`Error connecting to RabbitMQ`, error);
  }
};

module.exports = { connectToRabbitMQ, connectToRabbitMQForTest };
