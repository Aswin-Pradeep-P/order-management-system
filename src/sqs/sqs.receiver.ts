// src/lib/sqsReceiver.ts
import {
 ReceiveMessageCommand,
 DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import sqsClient from "./sqs.client";

import dotenv from "dotenv";
dotenv.config();

const QUEUE_NAME = process.env.AWS_QUEUE_NAME || "order-management-system";

const queueUrl = `${process.env.AWS_ENDPOINT}/000000000000/${QUEUE_NAME}`;

export const pollMessages = async () => {
 const command = new ReceiveMessageCommand({
   QueueUrl: queueUrl,
   MaxNumberOfMessages: 5,
   WaitTimeSeconds: 10,
 });

 const response = await sqsClient.send(command);

 if (!response.Messages || response.Messages.length === 0) {
   return;
 }

 for (const msg of response.Messages) {
   console.log("Received message:", msg.Body);

   // Delete the message
   if (msg.ReceiptHandle) {
     await sqsClient.send(
       new DeleteMessageCommand({
         QueueUrl: queueUrl,
         ReceiptHandle: msg.ReceiptHandle,
       })
     );
     console.log("Deleted message:", msg.MessageId);
   }
 }
};
