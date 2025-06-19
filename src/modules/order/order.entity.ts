import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { OrderItem } from "../order-item/order-item.entity";
import { OrderStatus } from "./order.types";

@Entity()
export class Order {
 @PrimaryGeneratedColumn('uuid')
 id!: string;

 @ManyToOne(() => User, (user) => user.orders, {
  onDelete: 'CASCADE',
 })
 user!: User;

 @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
  cascade: true,
 })
 orderItems!: OrderItem[];

 @CreateDateColumn()
 createdAt!: Date;

 @Column({ type: 'enum', enum: OrderStatus })
 status!: OrderStatus;
}