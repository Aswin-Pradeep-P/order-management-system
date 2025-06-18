import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "../product/product.entity";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: string;

  @OneToOne(()=> User, (user) => user.cart)
  @JoinColumn()
  user!: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {cascade: true})
  @JoinColumn()
  items!: CartItem[];
}