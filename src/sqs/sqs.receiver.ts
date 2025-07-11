// src/lib/sqsReceiver.ts
import {
 ReceiveMessageCommand,
 DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import sqsClient from "./sqs.client";

import dotenv from "dotenv";
import { SQSMessage, SQSMessageType } from "./sqs.types";
import { generateInvoice } from "../util/pdf.util";
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

   if(msg.Body){
    try{
      const body = JSON.parse(msg.Body) as SQSMessage;
      if(body.type === SQSMessageType.OrderCreated){
        console.log("Order created", msg.Body)
        generateInvoice(body.payload)
      }

    }catch(e){
      console.log("Error parsing Message body")
    }
   }

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
