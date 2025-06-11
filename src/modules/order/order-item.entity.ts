import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../product/product.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => Order)
  @JoinColumn()
  order!: Order;

  @ManyToOne(() => Product)
  @JoinColumn()
  product!: Product;

  @Column()
  quantity!: number;
} 