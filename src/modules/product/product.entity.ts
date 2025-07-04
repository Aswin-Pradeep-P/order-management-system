import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string; 

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;
}
