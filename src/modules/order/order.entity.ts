import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Product } from "../product/product.entity";

@Entity()
export class Order {
 @PrimaryGeneratedColumn()
 id!: string;

 @ManyToOne(() => User, (user) => user.orders, {
  onDelete: 'CASCADE',
 })
 user!: User;

 @ManyToOne(() => Product)
 @JoinColumn({ name: 'productId' })
 products!: Product[];

 @CreateDateColumn()
 @Column()
 createdAt!: string;

 @Column()
 status!: string;
}