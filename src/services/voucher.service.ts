import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { VoucherModel } from "../models/voucher.model";

export const getVouchersByEmail = async (email?: string): Promise<ResponseSuccess<VoucherModel[]>> => {
    try {
        const response = await requestConfig(
            `vouchers/${email}`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}