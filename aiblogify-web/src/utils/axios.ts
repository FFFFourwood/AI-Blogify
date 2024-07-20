import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
    const apiIndex: number | undefined = config?.url?.indexOf('/api/');
    if (config.method === 'get' && config.url && config.params && apiIndex && apiIndex > -1) {
        const tempUrl = config.url.substring(apiIndex);
        const baseUrl = config.url.substring(0, apiIndex);
        config.url = baseUrl + tempUrl.replace(/:(\w+)/g, (_, key) => config.params[key]);
    }
    return config;
}, error => {
    return Promise.reject(error);
});


export const axiosFetch = {
    get: (url: string, params?: object) => axiosInstance.get(url, { params }),
    post: (url: string, data?: object, config?: any) => axiosInstance.post(url, data, config)
};



