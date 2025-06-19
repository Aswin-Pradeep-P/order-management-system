import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "../cart/cart.entity";
import { Product } from "../product/product.entity";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn()
  cart!: Cart;

  @ManyToOne(() => Product)
  @JoinColumn()
  product!: Product;

  @Column()
  quantity!: number;
} 