export type CreateOrderDto = {
  orderItems: {
    productId: string;
    quantity: number;
  }[];
}