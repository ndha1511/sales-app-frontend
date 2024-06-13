import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { SizeModel } from "../models/size.model";

export const getAllSizes = async (): Promise<ResponseSuccess<SizeModel[]>> => {
    try {
        const response = await requestConfig(
            'sizes',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}