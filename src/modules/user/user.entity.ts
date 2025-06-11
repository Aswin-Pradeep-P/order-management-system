import { Column, OneToMany, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";
import { Order } from "../order/order.entity";
import { Cart } from "../cart/cart.enity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  address!: string;

  @OneToMany(() => Order, (order) => order.user)
  @Column()
  orders!: Order;

  @OneToOne(() => Cart, (cart) => cart.user)
  @Column()
  cart!: Order;
}
