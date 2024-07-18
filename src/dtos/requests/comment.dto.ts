export type CommentDto = {
    email: string;
    content: string;
    productId: number;
    rating: number;
    media?: File[];
}