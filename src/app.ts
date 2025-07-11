import express from 'express';
import productRoutes from './modules/product/product.routes';
import userRoutes from './modules/user/user.routes';
import orderRoutes from './modules/order/order.routes';
import { initialiseQueues } from './sqs/sqs.init';

const app = express();

app.use(express.json());

app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

initialiseQueues()

export default app;
