import {Status} from "./enums/status.enum.ts";

export type CategoryModel = {
    id?: number;
    categoryName?: string,
    status?: Status
}