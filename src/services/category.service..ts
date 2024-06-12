import {CategoryDto} from "../dtos/requests/category.dto.ts";
import requestConfig, {ContentType, Method} from "../configurations/axios.config.ts";
import {CategoryModel} from "../models/category.model.ts";
import {ResponseSuccess} from "../dtos/responses/response.success.ts";

export const createCategory = async (categoryDto: CategoryDto): Promise<ResponseSuccess<CategoryModel>> => {
    try {
        const response = await requestConfig(
            'categories',
            Method.POST,
            categoryDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getAllCategories = async (): Promise<ResponseSuccess<CategoryModel[]>> => {
    try {
        const response = await requestConfig(
            'categories',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateCategory = async (id: number = -1, categoryDto : CategoryDto): Promise<ResponseSuccess<CategoryModel>> => {
    try {
        const response = await requestConfig(
            'categories/' + id,
            Method.PATCH,
            categoryDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteCategory = async (id: number = -1): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            'categories/' + id,
            Method.DELETE,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

