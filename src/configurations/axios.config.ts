import axios from "axios";
import { apiUrl } from "./api-url";
import { getToken } from "../services/token.service";
import { LoginResponse } from "../dtos/responses/login-response";

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

const requestConfig = <T>(endpoint: string, method: Method, data: T,  contentType: ContentType, interceptor: boolean = false) => {
    const headers = {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
    }
    const instance = axios.create({
        baseURL: `${apiUrl}/api/v1/`,
        headers
    });
    if(interceptor) {
        const loginResponse: LoginResponse | null= getToken();
        if(loginResponse) {
            instance.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${loginResponse.accessToken}`
                return config;
            }, error => {
                return Promise.reject(error);
            });
        }  
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