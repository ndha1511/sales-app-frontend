import { ProductDetailModel } from "../../models/product-detail.model"
import { ProductImageModel } from "../../models/product-image.model"
import { ProductModel } from "../../models/product.model"

export type ProductResponse = {
    product: ProductModel,
    productDetails?: ProductDetailModel[],
    productImages?: ProductImageModel[]
}