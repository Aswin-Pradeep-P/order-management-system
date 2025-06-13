import { AppDataSource } from "../../config/data-source";
import { Cart } from "./cart.entity";

export const CartRepository = AppDataSource.getRepository(Cart);