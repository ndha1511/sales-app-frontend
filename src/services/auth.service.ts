import { apiUrl } from "../configurations/api-url"
import requestConfig, { ContentType, Method } from "../configurations/axios.config";
import { LoginRequestDto } from "../dtos/requests/login-request.dto"
import { ResetPasswordRequest } from "../dtos/requests/reset-password-request";
import { UserRegisterDto } from "../dtos/requests/user-register.dto";
import { VerifyEmailDto } from "../dtos/requests/verify-email.dto";
import { LoginResponse } from "../dtos/responses/login-response";
import { ResponseSuccess } from "../dtos/responses/response.success";

export const login = async (loginRequestDto: LoginRequestDto): Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            `auth/login`,
            Method.POST,
            loginRequestDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const register = async (userRegisterDto: UserRegisterDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/register`,
            Method.POST,
            userRegisterDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const verifyEmail = async (verifyEmailDto: VerifyEmailDto): Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            `auth/verify-email`,
            Method.POST,
            verifyEmailDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getVeriryCode = async (email: string): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/get-verify-code/${email}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
 
export const verifyResetPassword = async (verifyEmailDto: VerifyEmailDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/verify-reset-password-code`,
            Method.POST,
            verifyEmailDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const resetPassword = async (resetPasswordRequest: ResetPasswordRequest): Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            `auth/reset-password`,
            Method.POST,
            resetPasswordRequest,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const loginWithSocial = (provider: string) => {
    window.location.href = `${apiUrl}/oauth2/authorization/${provider}`
}

export const lougout = async (accessToken: string) : Promise<ResponseSuccess<string | null>> => {
    try {
        const response = await requestConfig(
            `auth/logout`,
            Method.POST,
            accessToken,
            ContentType.TEXT_PLAIN
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

