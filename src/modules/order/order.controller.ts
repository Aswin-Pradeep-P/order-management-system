import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./order.types";
import { OrderItemRepository } from "../order-item/order-item.respostory";
import { ProductRepository } from "../product/product.repository";
import { ProductService } from "../product/product.service";

export class OrderController{

 constructor(private orderService: OrderService, private productService: ProductService){

 }
  async createOrder(req: Request, res: Response): Promise<void>{
  
    
  }
}