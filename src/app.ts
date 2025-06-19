import express from 'express';
import productRoutes from './modules/product/product.routes';
import userRoutes from './modules/user/user.routes';
import orderRoutes from './modules/order/order.routes';
const app = express();

app.use(express.json());

app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

export default app;
