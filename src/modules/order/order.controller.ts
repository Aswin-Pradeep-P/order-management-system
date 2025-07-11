import { Response } from "express";
import { OrderService } from "./order.service";
import { CreateOrderDto, UpdateOrderDto } from "./order.types";
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

  async updateOrder(req: CustomRequest, res: Response): Promise<void>{
    try{
      const updateOrderPayload = req.body as UpdateOrderDto;
      const id = req.params.id;
      const updatedOrder = await this.orderService.updateOrder(id, updateOrderPayload);
      res.status(200).json(updatedOrder);
    }
    catch(error){
      res.status(500).json({message: (error as Error).message})
    }
 
  }

  async deleteOrder(req: CustomRequest, res: Response): Promise<void>{
    try{
      const id = req.params.id;
      await this.orderService.deleteOrder(id);
      res.json({message: "Deleted OK"})
    }
    catch(error){
      res.send(500).json({message: (error as Error).message})
    }
  }
}