import { AddressDto } from "./address.dto";
import { ProductOrderDto } from "./product-order.dto";

export enum DeliveryMethod {
    EXPRESS = "EXPRESS",
    ECONOMY = "ECONOMY",
}

export enum PaymentMethod {
    COD = 'COD',
    CC = 'CC',
}
export type OrderDto = {
    email: string;
    paymentMethod: PaymentMethod;
    note?: string;
    address: AddressDto
    phoneNumber: string;
    buyerName: string;
    deliveryMethod: DeliveryMethod;
    productOrders: ProductOrderDto[];
    vouchers?: number[];
}