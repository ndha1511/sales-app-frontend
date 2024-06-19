import { ColorModel } from "./color.model";
import { ProductModel } from "./product.model"
import { SizeModel } from "./size.model";

export type ProductDetailModel = {
    id?: number,
    product?: ProductModel;
    size: SizeModel;
    color: ColorModel;
    quantity?: number;
}