import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { OrderDto } from "../dtos/requests/order.dto";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { OrderModel } from "../models/order.model";

export const createOrder = async (orderDto: OrderDto): Promise<ResponseSuccess<OrderModel>> => {
    try {
        const response = await requestConfig(
            `orders`,
            Method.POST,
            orderDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}