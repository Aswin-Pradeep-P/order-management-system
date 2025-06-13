import express from 'express';
import { ProductController } from "./product.controller";
import { ProductService } from './product.service';

const router = express.Router();

const productService = new ProductService();
const productController = new ProductController(productService);

router.get("/products", productController.getProducts.bind(productController));

export default router;