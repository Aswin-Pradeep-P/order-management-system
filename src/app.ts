import express from 'express';
import productRoutes from './modules/product/product.routes';
import userRoutes from './modules/user/user.routes';
import orderRoutes from './modules/order/order.routes';
import { initialiseQueues } from './sqs/sqs.init';
import { downloadFile } from './s3/s3.client';

const app = express();

app.use(express.json());

app.get("/download/:fileName", (req, res) => {
  const key = `${req.params.fileName}.pdf`;

  downloadFile(key);

  res.send("File downloaded")
})

app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

initialiseQueues()

export default app;
