import { AppDataSource } from '../../config/data-source';
import { Product } from './product.entity';

export const ProductRepository = AppDataSource.getRepository(Product);