import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { ProviderModel } from "../models/provider.model";


export const getAllProviders = async (): Promise<ResponseSuccess<ProviderModel[]>> => {
    try {
        const response = await requestConfig(
            'providers',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}