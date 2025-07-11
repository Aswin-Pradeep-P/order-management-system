export type CreateOrderDto = {
  orderItems: {
    productId: string;
    quantity: number;
  }[];
}

export type UpdateOrderDto = {
  status?: OrderStatus;
  orderItems?: {
    productId: string;
    quantity: number;
  }[];
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}