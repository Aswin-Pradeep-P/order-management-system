import { CreateQueueCommand, GetQueueUrlCommand } from "@aws-sdk/client-sqs";
import sqsClient from "./sqs.client";
import dotenv from "dotenv";
import { pollMessages } from "./sqs.receiver";
dotenv.config();

const QUEUE_NAME = process.env.AWS_QUEUE_NAME || "order-management-system";

export const initialiseQueues = async () => {
  try {
    // Check if queue exists
    await sqsClient.send(new GetQueueUrlCommand({ QueueName: QUEUE_NAME }));
    console.log(`SQS queue "${QUEUE_NAME}" already exists`);
  } catch (err) {
    // Create if it doesn't
    console.log(`Creating SQS queue "${QUEUE_NAME}"...`);
    await sqsClient.send(
      new CreateQueueCommand({
        QueueName: QUEUE_NAME,
        Attributes: {
          VisibilityTimeout: "30", // seconds
        },
      })
    );
    console.log(`SQS queue "${QUEUE_NAME}" created`);
  }
};

setInterval(() => {
 pollMessages().catch(console.error);
}, 5000);

