import { SizeType } from "./enums/size-type.enum";

export type SizeModel = {
    id?: number;
    sizeType?: SizeType;
    numberSize?: number;
    textSize?: string;
}