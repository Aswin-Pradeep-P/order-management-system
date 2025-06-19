import { Column, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";
import { Order } from "../order/order.entity";
import { Cart } from "../cart/cart.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({
    unique: true
  })
  email!: string;

  @Column()
  password!: string;

  @Column()
  address!: string;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  orders!: Order[];

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  cart!: Cart;
}
