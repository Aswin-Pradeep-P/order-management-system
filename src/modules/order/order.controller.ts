import { Request, Response, NextFunction } from "express";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./order.types";
import { OrderItemRepository } from "../order-item/order-item.respostory";
import { ProductRepository } from "../product/product.repository";
import { ProductService } from "../product/product.service";
import { User } from "../user/user.entity";
import { CustomRequest } from "../../middleware/auth";

export class OrderController{

 constructor(private orderService: OrderService){

 }
  async createOrder(req: CustomRequest, res: Response): Promise<void>{

    try{

      const createOrderDto = req.body as CreateOrderDto;
      const user = req.user as User;
      const order = await this.orderService.createOrder(createOrderDto, user)

      res.status(201).json(order)
    }catch(error){
      res.status(500).json({message: (error as Error).message})
    }
  }

  async getOrdersByUser(req: CustomRequest, res: Response): Promise<void>{
    try{
      const user = req.user as User;
      const orders = await this.orderService.getOrdersByUser(user)
      res.status(200).json(orders)
    }catch(error){
      res.status(500).json({message: (error as Error).message})
    }
  }
}