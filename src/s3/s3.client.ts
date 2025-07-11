import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME || 'my-local-bucket';
// for testing purposes
const outputPath = path.resolve(__dirname, 'downloaded-invoice.pdf');

const s3 = new AWS.S3({
 endpoint: process.env.AWS_ENDPOINT,
 region:  process.env.AWS_REGION,
 accessKeyId:  process.env.AWS_ACCESS_KEY_ID, 
 secretAccessKey:  process.env.AWS_SECRET_ACCESS_KEY,
 s3ForcePathStyle: true            
});

export async function uploadPdfFromBuffer(key: string, pdfBuffer: Buffer) {
  // Ensure bucket exists
  try {
    await s3.headBucket({ Bucket: bucketName }).promise();
  } catch (err) {
    if ((err as {statusCode: number}).statusCode === 404) {
      await s3.createBucket({ Bucket: bucketName }).promise();
    }
  }

  // Upload the buffer
  await s3.putObject({
    Bucket: bucketName,
    Key: key,
    Body: pdfBuffer,
    ContentType: 'application/pdf'
  }).promise();

  console.log(`✅ PDF buffer uploaded to "${bucketName}/${key}"`);
}

export async function downloadFile(key: string): Promise<void> {
 try {
   const result = await s3.getObject({ Bucket: bucketName, Key: key }).promise();

   if (!result.Body) {
     throw new Error('File body is empty');
   }

   const buffer = Buffer.isBuffer(result.Body)
     ? result.Body
     : Buffer.from(result.Body as Uint8Array);

   fs.writeFileSync(outputPath, buffer);
   console.log(`✅ File downloaded to "${outputPath}"`);
 } catch (err) {
   console.error('❌ Error downloading file:', (err as Error).message);
 }
}

