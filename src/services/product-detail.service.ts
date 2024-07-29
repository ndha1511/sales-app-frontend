import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ProductDetailDto } from "../dtos/requests/product-detail.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { ProductDetailModel } from "../models/product-detail.model";

export const createProductDetail = async (productDetailDto: ProductDetailDto): Promise<ResponseSuccess<ProductDetailModel>> => {
    try {
        const response = await requestConfig(
            'product-details',
            Method.POST,
            productDetailDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const removeProductDetail = async (id: number): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `product-details/${id}`,
            Method.DELETE,
            [],
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

