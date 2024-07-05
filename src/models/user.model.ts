import { AddressModel } from "./address.model";

export enum Gender {
    MALE = "MALE", 
    FEMALE = "FEMALE",
}
export enum Role {
    ROLE_USER = "ROLE_USER",
    ROLE_ADMIN = "ROLE_ADMIN",
}
export type UserModel = {
    name: string;
    email: string;
    phoneNumber?: string;
    gender?: Gender;
    dateOfBirth?: Date;
    role: Role;
    address?: AddressModel;
    facebookAccountId?: string;
    googleAccountId?: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;

}