"use strict";

const amqp = require("amqplib");

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost"); // connect to RabbitMQ server
    if (!connection) throw new Error("Connection can not established");

    const channel = await connection.createChannel(); // create a channel

    return { channel, connection };
  } catch (error) {}
};

const connectToRabbitMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();

    // Pushlish message to a queue
    const queue = "test-queue";
    const message = "Hello, shopDev by Vu Anh Lam";

    // https://amqp-node.github.io/amqplib/channel_api.html#channel_assertQueue 
    await channel.assertQueue(queue);

    // https://amqp-node.github.io/amqplib/channel_api.html#channel_sendToQueue
    await channel.sendToQueue(queue, Buffer.from(message));

    // close connection
    await connection.close();
  } catch (error) {
    console.log(`Error connecting to RabbitMQ`, error);
  }
};

const consumerQueue = async ({ channel, queueName }) => {
  try {
    await channel.assertQueue(queueName, { durable: true })
    console.log(`Waiting for message....`);

    channel.consume(queueName, (msg) => {
      console.log(`Received message: ${queueName}::`, msg.content.toString());
      //1. find user follow that shop

      //2. send message to user

      //3. yes, ok ===> success
      
      //4. error, setup DLX ....
    }, {
      noAck: true
    })

  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { connectToRabbitMQ, connectToRabbitMQForTest, consumerQueue };
