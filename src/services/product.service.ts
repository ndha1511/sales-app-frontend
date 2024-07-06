import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { PageResponse } from "../dtos/responses/page-response";
import { ProductResponse } from "../dtos/responses/product-response";
import { ProductUserResponse } from "../dtos/responses/product-user-response";
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


export const getAllProducts = async (): Promise<ResponseSuccess<ProductModel[]>> => {
    try {
        const response = await requestConfig(
            'products',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getPageProducts = async (pageNo: number = 1, pageSize: number = 20, search: string[] = [],
    sort: string[] = []): Promise<ResponseSuccess<PageResponse<ProductUserResponse[]>>> => {
    try {
        const response = await requestConfig(
            `products/page-product?pageNo=${pageNo}&pageSize=${pageSize}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getProductById = async (productId: number = -1): Promise<ResponseSuccess<ProductResponse>> => {
    try {
        const response = await requestConfig(
            'products/' + productId,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}