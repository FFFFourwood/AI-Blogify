
const baseUrl = 'http://localhost:3033/api';
const authUrl = `${baseUrl}/auth`;
const usersUrl = `${baseUrl}/users`;
const articlesUrl = `${baseUrl}/articles`;

export const apiRequest = {
    auth: {
        login: `${authUrl}/login`,
        verify: `${authUrl}/verify`,
        logout: `${authUrl}/logout`,
        // register: `${authUrl}/register`,
    },
    users: {
        getPermissionsByRole: `${usersUrl}/getPermissionsByRole/:id`,
        // getAll: `${usersUrl}/all`,
        // getById: `${usersUrl}/:id`,
        // update: `${usersUrl}/:id`,
        // delete: `${usersUrl}/:id`
    },
    articles: {
        getAll: `${articlesUrl}/`,
        // getById: `${articlesUrl}/:id`,
        // create: `${articlesUrl}/create`,
        // update: `${articlesUrl}/:id`,
        // delete: `${articlesUrl}/:id`,
        // getArticlesByCategory: `${articlesUrl}/getArticlesByCategory/:id`,
        // getArticlesByTag: `${articlesUrl}/getArticlesByTag/:id`
    }
}