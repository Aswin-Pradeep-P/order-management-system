import { OrderItemRepository } from "../order-item/order-item.respostory";
import { User } from "../user/user.entity";
import { OrderRepository } from "./order.repository";
import { CreateOrderDto, OrderStatus, UpdateOrderDto } from "./order.types";
import { ProductService } from "../product/product.service";
import { OrderItem } from "../order-item/order-item.entity";
import { UserService } from "../user/user.service";
import { sendSqsMessage } from "../../sqs/sqs.sender";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from 'fs';
import { SQSMessageType } from "../../sqs/sqs.types";

export class OrderService{
 private productService: ProductService;
 private userService: UserService;

 constructor(){
  this.productService = new ProductService();
  this.userService = new UserService();
 }

 async createOrder(createOrderPayload: CreateOrderDto, user: User){
  const orderItems: OrderItem[] = [];

  for(const item of createOrderPayload.orderItems){
   const product = await this.productService.getProductById(item.productId);
   if(!product){
    throw Error("Product not found")
   }

   const orderItem = OrderItemRepository.create({
    product: product,
    quantity: item.quantity
   })

   orderItems.push(orderItem);
  }

  

  const savedUser = await this.userService.findUserById(user.id)

  if(!savedUser){
   throw new Error("User not found")
  }

  const order = OrderRepository.create({
   orderItems,
   user: savedUser,
   status:OrderStatus.PENDING
  })

  const createdOrder = await OrderRepository.save(order);

  const sqsMessage = {type: SQSMessageType.OrderCreated, payload: createdOrder};

  sendSqsMessage(JSON.stringify(sqsMessage));

  return createdOrder;
 } 

 async updateOrder(orderId: string, updateOrderPayload: UpdateOrderDto){
  const order = await OrderRepository.findOne({
   where: {
    id: orderId
   }
  })

  if(!order){
   throw new Error("Order not found")
  }

  if(updateOrderPayload.status){
   order.status = updateOrderPayload.status
  }

  if(updateOrderPayload.orderItems){
   for(const item of updateOrderPayload.orderItems){
    const product = await this.productService.getProductById(item.productId);
    if(!product){
     throw new Error("Product not found")
    }
    
    order.orderItems.push(OrderItemRepository.create({
     product: product,
     quantity: item.quantity
    }))
   }
  }

  return await OrderRepository.save(order)
 }

 async getOrdersByUser(user: User){
  const savedUser = await this.userService.findUserById(user.id)
  if(!savedUser){
   throw new Error("User not found")
  } 

  return await OrderRepository.find({
   where: {
    user: savedUser
   },
   relations: ["orderItems.product"]
  })
 }

 async deleteOrder(orderId: string){
  const order = await OrderRepository.findOne({where : {id: orderId}})

  if(!order){
   throw Error("Order not found");
  }

  return await OrderRepository.delete(order)
 }
}