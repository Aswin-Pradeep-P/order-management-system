import { SQSClient } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";
dotenv.config();

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION || "us-east-1",
  endpoint: process.env.AWS_ENDPOINT || "http://localstack:4566",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "test",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "test",
  },
});

export default sqsClient;
