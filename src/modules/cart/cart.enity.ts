import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "../product/product.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: string;

  @OneToOne(()=> Product)
  @JoinColumn({name: 'productId'})
  @Column()
  products!: Product[];

  @OneToOne(()=> User, (user) => user.cart)
  @Column()
  user!: User;
}