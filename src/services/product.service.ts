import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { ProductModel } from "../models/product.model";

export const createProduct = async (productDto: FormData): Promise<ResponseSuccess<ProductModel>> => {
    try {
        const response = await requestConfig(
            'products',
            Method.POST,
            productDto,
            ContentType.FORM_DATA
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}