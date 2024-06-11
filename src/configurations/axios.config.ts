import axios from "axios";

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
}

const requestConfig = <T>(endpoint: string, method: Method, data: T,  contentType: ContentType) => {
    const headers = {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*"
    }
    const instance = axios.create({
        baseURL: 'http://localhost:8080/api/v1/',
        headers
    });

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