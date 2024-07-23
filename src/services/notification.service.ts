import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { PageResponse } from "../dtos/responses/page-response";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { NotificationModel } from "../models/notification.model";

export const getNotificationsByUserId = async (userId: number, pageNo: number = 1, pageSize: number = 10): Promise<ResponseSuccess<PageResponse<NotificationModel[]>>> => {
    try {
        const response = await requestConfig(
            `notifications/${userId}?pageNo=${pageNo}&pageSize=${pageSize}`,
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

