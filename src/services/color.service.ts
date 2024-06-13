import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { ColorModel } from "../models/color.model";

export const getAllColors = async (): Promise<ResponseSuccess<ColorModel[]>> => {
    try {
        const response = await requestConfig(
            'colors',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}