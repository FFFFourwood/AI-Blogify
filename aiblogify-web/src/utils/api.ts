import { verify } from "crypto";

const baseUrl = 'http://localhost:3033/api';
const authUrl = `${baseUrl}/auth`;
const usersUrl = `${baseUrl}/users`;

export const apiRequest = {
    auth: {
        login: `${authUrl}/login`,
        verify: `${authUrl}/verify`,
        logout: `${authUrl}/logout`,
        register: `${authUrl}/register`,
    },
    users: {
        getPermissionsByRole: `${usersUrl}/getPermissionsByRole/:id`,
        getAll: `${usersUrl}/all`,
        getById: `${usersUrl}/:id`,
        update: `${usersUrl}/:id`,
        delete: `${usersUrl}/:id`
    }
}