import { CommentMediaModel, CommentModel } from "../../models/comment.model"

export type CommentResponse = {
    comment: CommentModel;
    commentMedia?: CommentMediaModel[];
}