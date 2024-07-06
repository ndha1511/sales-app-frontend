export type PageResponse<T> = {
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPage: number;
    data: T;
}