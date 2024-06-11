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