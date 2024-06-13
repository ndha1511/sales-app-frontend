import { AddressModel } from "./address.model";
import { Status } from "./enums/status.enum";

export type ProviderModel = {
    id?: number;
    providerName?: string;
    address?: AddressModel;
    phoneNumber?: string;
    email?: string;
    status?: Status;
}