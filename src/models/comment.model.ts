import { MediaType } from "./enums/media-type.enum";
import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";



export type CommentModel = {
    id: number;
    user: UserModel;
    product: ProductModel;
    commentDate: Date;
    textContent: string;
    rating: number;

}

export type CommentMediaModel = {
    id: number;
    path: string;
    mediaType: MediaType;
    comment: CommentModel;
}