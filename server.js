"use strict";

const { consumerToQueue } = require("./src/services/consumerQueue.service");

const queueName = "test-topic";

consumerToQueue(queueName)
  .then(() => {
    console.log(`Message queue started ${queueName}`);
  })
  .catch((error) => {
    console.error(`Message error: ${error.message}`);
  });
