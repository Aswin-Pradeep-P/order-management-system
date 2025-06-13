import express from 'express';
import { ProductController } from "./product.controller";
import { ProductService } from './product.service';
import { validate } from '../../middleware/validation';
import { productFilterSchema } from './product.validations';
const router = express.Router();

const productService = new ProductService();
const productController = new ProductController(productService);

router.get("/products", validate(productFilterSchema, 'query'), productController.getProducts.bind(productController));

export default router;