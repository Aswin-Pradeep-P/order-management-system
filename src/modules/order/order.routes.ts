import express from 'express';
import { auth } from '../../middleware/auth';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { validate } from '../../middleware/validation';
import { CreateOrderSchema, UpdateOrderSchema } from './order.schema';

const router = express.Router();

const orderService = new OrderService();
const orderController = new OrderController(orderService);

router.post("/orders",auth, validate(CreateOrderSchema, 'body'), orderController.createOrder.bind(orderController))
router.get("/orders",auth, orderController.getOrdersByUser.bind(orderController))
router.put("/orders/:id",auth,validate(UpdateOrderSchema, 'body'), orderController.updateOrder.bind(orderController))
router.delete("/orders/:id",auth, orderController.deleteOrder.bind(orderController))

export default router;