import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { CommentDto } from "../dtos/requests/comment.dto";
import { CommentResponse } from "../dtos/responses/comment-response";
import { PageResponse } from "../dtos/responses/page-response";
import { ResponseSuccess } from "../dtos/responses/response.success";

export const sendCommentApi = async (commentDto: CommentDto): Promise<ResponseSuccess<any>> => {
    const formData : FormData = new FormData();
    formData.append("email", commentDto.email);
    formData.append("content", commentDto.content);
    formData.append("productId", commentDto.productId.toString());
    formData.append("rating", commentDto.rating.toString());
    if(commentDto.media) {
        for(const media of commentDto.media) {
            formData.append("media", media);
        }
    }
    try {
        const response = await requestConfig(
            `comments/send`,
            Method.POST,
            commentDto,
            ContentType.FORM_DATA,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getPageCommentsByProductId = async (pageNo: number = 1, pageSize: number = 10, productId?: number): Promise<ResponseSuccess<PageResponse<CommentResponse[]>>> => {
    try {
        const response = await requestConfig(
            `comments/page-comment?pageNo=${pageNo}&pageSize=${pageSize}&sort=commentDate%3Adesc&search=product.id-${productId}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}