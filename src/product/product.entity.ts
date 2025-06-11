import { Column, Entity } from "typeorm";

import { PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
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
