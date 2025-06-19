import { OrderItemRepository } from "../order-item/order-item.respostory";
import { User } from "../user/user.entity";
import { Order } from "./order.entity";
import { OrderRepository } from "./order.repository";
import { CreateOrderDto } from "./order.types";
import { ProductService } from "../product/product.service";
import { OrderItem } from "../order-item/order-item.entity";

export class OrderService{
 private productService: ProductService;

 constructor(){
  this.productService = new ProductService();
 }

 async createOrder(createOrderPayload: CreateOrderDto, user: User){
  const orderItems: OrderItem[] = [];

  createOrderPayload.orderItems.forEach(async(item) => {
   const product = await this.productService.getProductById(item.productId);
   if(!product){
    throw Error("Product not found")
   }
   const orderItem = OrderItemRepository.create({
    product: product,
    quantity: item.quantity
   })

   return orderItems.push(orderItem);
  })

  const order = OrderRepository.create({
   orderItems,
   user,
   status:"Created"
  })

  return await OrderItemRepository.save(order)

 } 
}