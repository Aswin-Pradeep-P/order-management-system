import { AppDataSource } from "../../config/data-source";
import { Order } from "./order.entity";

export const OrderRepository = AppDataSource.getRepository(Order);