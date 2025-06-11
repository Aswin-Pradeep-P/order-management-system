import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order {
 @PrimaryGeneratedColumn()
 id!: string;

 @ManyToOne(() => User, (user) => user.orders, {
  onDelete: 'CASCADE',
 })
 user!: User;

 @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
 @JoinColumn()
 orderItems!: OrderItem[];

 @CreateDateColumn()
 @Column()
 createdAt!: string;

 @Column()
 status!: string;
}