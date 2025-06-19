import express from 'express';
import { auth } from '../../middleware/auth';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { validate } from '../../middleware/validation';
import { CreateOrderSchema } from './order.schema';

const router = express.Router();

const orderService = new OrderService();
const orderController = new OrderController(orderService);

router.post("/orders",auth, validate(CreateOrderSchema, 'body'), orderController.createOrder.bind(orderController))

export default router;