import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertDummyProducts1750325043276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "product" ("name", "category", "price", "description") VALUES
            ('Wireless Mouse', 'Electronics', 1299, 'Ergonomic wireless mouse with USB receiver'),
            ('Bluetooth Speaker', 'Electronics', 2499, 'Portable Bluetooth speaker with high-quality sound'),
            ('Yoga Mat', 'Fitness', 899, 'Non-slip yoga mat for home workouts'),
            ('Notebook', 'Stationery', 199, 'Hardcover notebook with 200 ruled pages'),
            ('Water Bottle', 'Lifestyle', 499, 'Insulated stainless steel water bottle, 750ml'),
            ('Running Shoes', 'Footwear', 3599, 'Lightweight running shoes with breathable fabric'),
            ('LED Desk Lamp', 'Home & Living', 1199, 'Adjustable LED desk lamp with touch controls'),
            ('Gaming Keyboard', 'Electronics', 4499, 'Mechanical RGB gaming keyboard with blue switches'),
            ('Backpack', 'Accessories', 1799, 'Water-resistant backpack with laptop compartment'),
            ('Electric Kettle', 'Kitchen Appliances', 2199, '1.5L stainless steel electric kettle with auto shut-off');
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "product" WHERE "name" IN (
              'Wireless Mouse',
              'Bluetooth Speaker',
              'Yoga Mat',
              'Notebook',
              'Water Bottle',
              'Running Shoes',
              'LED Desk Lamp',
              'Gaming Keyboard',
              'Backpack',
              'Electric Kettle'
            );
          `);
    }

}
