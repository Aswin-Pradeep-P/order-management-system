import express from 'express';
import productRoutes from './modules/product/product.routes';
import userRoutes from './modules/user/user.routes';
import orderRoutes from './modules/order/order.routes';
import { initialiseQueues } from './sqs/sqs.init';
import { sendMessage } from './sqs/sqs.sender';

const app = express();

app.use(express.json());

app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

app.get('/send-message', (req, res) => {
  sendMessage("Hello, world!");
  res.send('Message sent');
});

initialiseQueues()

export default app;
