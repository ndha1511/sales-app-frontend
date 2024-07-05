import { LoginResponse } from "../dtos/responses/login-response";

export const saveToken = (loginResponse: LoginResponse) => {
    localStorage.setItem('token', JSON.stringify(loginResponse));
}

export const getToken = (): LoginResponse | null => {
    const token = localStorage.getItem('token');
    if (token) {
        return JSON.parse(token);
    }
    return null;
}