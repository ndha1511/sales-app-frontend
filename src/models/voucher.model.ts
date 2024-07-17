export enum VoucherType {
    FOR_PRODUCT = 'FOR_PRODUCT',
    FOR_DELIVERY = 'FOR_DELIVERY',
}

export enum Scope {
    ALL = 'ALL',
    FOR_USER = 'FOR_USER',
}

export type VoucherModel = {
    id: number;
    maxPrice: number;
    minAmount: number;
    discount: number;
    voucherType: VoucherType;
    expiredDate: Date;
    quantity: number;
    scope: Scope;
}