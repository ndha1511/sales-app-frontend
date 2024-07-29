

export type ProductPriceModel = {
    id: number;
    discount: number;
    discountedPrice: number;
    discountedAmount: number;
    expiredDate: Date;
    note: string;
}