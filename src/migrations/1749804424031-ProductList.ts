import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductList1749804424031 implements MigrationInterface {
    name = 'ProductList1749804424031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          INSERT INTO "product" ("name", "category", "price", "description") VALUES
            ('iPhone 15 Pro', 'Electronics', 1299.99, 'Latest Apple smartphone with A17 chip.'),
            ('Samsung Galaxy S24', 'Electronics', 1199.49, 'Flagship Android phone by Samsung.'),
            ('Sony WH-1000XM5', 'Audio', 399.99, 'Noise-canceling over-ear headphones.'),
            ('Dell XPS 13', 'Computers', 999.00, 'Compact and powerful ultrabook.'),
            ('Nike Air Max 270', 'Footwear', 149.95, 'Comfortable running shoes.'),
            ('Logitech MX Master 3S', 'Accessories', 99.99, 'High-precision wireless mouse.'),
            ('Instant Pot Duo', 'Kitchen', 89.99, '7-in-1 electric pressure cooker.'),
            ('Fitbit Charge 6', 'Wearables', 129.95, 'Fitness tracker with heart-rate monitor.'),
            ('Kindle Paperwhite', 'Books', 139.99, 'E-reader with high-resolution display.'),
            ('Levis 501 Original Jeans', 'Clothing', 69.50, 'Classic straight-fit denim jeans.');
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DELETE FROM "product" WHERE "name" IN (
            'iPhone 15 Pro',
            'Samsung Galaxy S24',
            'Sony WH-1000XM5',
            'Dell XPS 13',
            'Nike Air Max 270',
            'Logitech MX Master 3S',
            'Instant Pot Duo',
            'Fitbit Charge 6',
            'Kindle Paperwhite',
            'Levis 501 Original Jeans'
          );
        `);
      }
    }
