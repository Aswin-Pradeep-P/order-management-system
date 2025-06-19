import { OrderItem } from "./order-item.entity";
import { AppDataSource } from "../../config/data-source";

export const OrderItemRepository = AppDataSource.getRepository(OrderItem);