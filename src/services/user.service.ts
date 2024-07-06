import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { Role, UserModel } from "../models/user.model";

export const getUserByEmail = async (email: string): Promise<ResponseSuccess<UserModel>> => {
    try {
        const response = await requestConfig(
            `users/${email}`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const saveUserToLocalStorage = (user: UserModel) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const isLogin = (role: Role) : boolean => {
    const userStr : string | null = localStorage.getItem('user');
    if(userStr) {
        const user : UserModel = JSON.parse(userStr);
        return user.role === role;
    }
    return false;
}
