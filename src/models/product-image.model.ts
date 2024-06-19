import { ProductModel } from "./product.model";

export type ProductImageModel = {
    id?: number;
    product: ProductModel;
    path: string;
}