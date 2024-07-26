import axios from "axios";
import { apiUrl } from "./api-url";
import { getToken, saveToken } from "../services/token.service";
import { LoginResponse } from "../dtos/responses/login-response";
import { ResponseSuccess } from "../dtos/responses/response.success";
import { refreshToken } from "../services/auth.service";

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
}

export enum ContentType {
    JSON = 'application/json',
    FORM_DATA = 'multipart/form-data',
    TEXT_PLAIN = 'text/plain'
}

const requestConfig = <T>(endpoint: string, method: Method, data: T, contentType: ContentType, interceptor: boolean = false) => {
    const headers = {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
    }
    const instance = axios.create({
        baseURL: `${apiUrl}/api/v1/`,
        headers
    });
    if (interceptor) {
            instance.interceptors.request.use(config => {
                const loginResponse: LoginResponse | null = getToken();
                config.headers.Authorization = `Bearer ${loginResponse?.accessToken}`
                return config;
            }, error => {
                return Promise.reject(error);
            });
            instance.interceptors.response.use(function (response) {
                return response;
            }, async function (error) {
                const originalConfig = error.config;
                if (error.response && error.response.status === 401) {
                    console.log("token expired, refresh token will be");
                    const loginResponse: LoginResponse | null = getToken();
                    try {
                        const response: ResponseSuccess<LoginResponse> = await refreshToken(loginResponse?.refreshToken);
                        const newToken: LoginResponse = response.data;
                        saveToken(newToken);
                        console.log("refresh token successfully new token: ", newToken.accessToken);
                        originalConfig.headers['Authorization'] = `Bearer ${newToken.accessToken}`;
                        return instance(originalConfig); 
                   } catch (error) {
                        console.log(error);
                        console.log("refresh token failed");
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        location.href = '/auth/login';
                    }   
                }
            });
        
    }

    return instance.request(
        {
            method,
            url: `${endpoint}`,
            data,
            responseType: "json"
        }
    );
}

export default requestConfig;