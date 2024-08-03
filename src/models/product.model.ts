import { CategoryModel } from "./category.model";
import { Status } from "./enums/status.enum";
import { ProviderModel } from "./provider.model";

export type ProductModel = {
    id?: number;
    productName: string;
    price: number;
    category?: CategoryModel;
    avgRating?: number;
    numberOfRating?: number;
    provider?: ProviderModel;
    description?: string;
    thumbnail?: string;
    productStatus?: Status;
    totalQuantity?: number;
    buyQuantity?: number; 

}