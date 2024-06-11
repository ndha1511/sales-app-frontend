export type ResponseSuccess<T> = {
    status: number;
    data: T;
    message: string;
}