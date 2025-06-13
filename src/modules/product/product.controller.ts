import { Product } from "./product.entity";
import { ProductService } from "./product.service";
import { ProductFilter } from "./product.types";
import { Request, Response } from "express";

export class ProductController{
  constructor(private readonly productService: ProductService){}

  async getProducts(req: Request, res: Response): Promise<void> {
    const filter = req.query as ProductFilter;
    const products = await this.productService.getProducts(filter);
    res.json(products);
  }
}