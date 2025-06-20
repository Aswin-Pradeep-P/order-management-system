import { OrderItemRepository } from "../order-item/order-item.respostory";
import { User } from "../user/user.entity";
import { Order } from "./order.entity";
import { OrderRepository } from "./order.repository";
import { CreateOrderDto, OrderStatus } from "./order.types";
import { ProductService } from "../product/product.service";
import { OrderItem } from "../order-item/order-item.entity";
import { UserService } from "../user/user.service";

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
}