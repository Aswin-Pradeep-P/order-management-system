import { SendMessageCommand, SendMessageCommandInput } from "@aws-sdk/client-sqs";
import sqsClient from "./sqs.client";

import dotenv from "dotenv";
dotenv.config();

const QUEUE_NAME = process.env.AWS_QUEUE_NAME || "order-management-system";

const queueUrl = `${process.env.AWS_ENDPOINT}/000000000000/${QUEUE_NAME}`;

export const sendSqsMessage = async (message: string) => {
  const command: SendMessageCommandInput = {
    QueueUrl: queueUrl,
    MessageBody: message,
  };
  await sqsClient.send(new SendMessageCommand(command));
};