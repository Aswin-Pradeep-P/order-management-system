import { Between } from "typeorm";
import { Product } from "./product.entity";
import { ProductRepository } from "./product.repository";
import { ProductFilter } from "./product.types";

export class ProductService {
  async getProducts(filter: ProductFilter): Promise<Product[]> {
   if(!filter){
    return await ProductRepository.find();
   }
   const {category, minPrice, maxPrice} = filter;
   const query = ProductRepository.createQueryBuilder("product");
   
   if(category){
    query.andWhere("product.category = :category", {category});
   }

   if(minPrice){
    query.andWhere("product.price >= :minPrice", {minPrice});
   }

   if(maxPrice){
    query.andWhere("product.price <= :maxPrice", {maxPrice});
   }

   return await query.getMany();
  }
}

