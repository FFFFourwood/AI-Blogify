import { verify } from "crypto";

const baseUrl = 'http://localhost:3033/api';
const authUrl = `${baseUrl}/auth`;

export const apiRequest = {
    auth: {
        login: `${authUrl}/login`,
        verify: `${authUrl}/verify`,
        logout: `${authUrl}/logout`,
        register: `${authUrl}/register`,
    }
}