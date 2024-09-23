import axios, { AxiosInstance } from "axios";

const createAxiosInstance = (baseURL: string | undefined, params: any) => {
    const instance: AxiosInstance = axios.create({
        baseURL,
    });
    instance.interceptors.request.use(function (config) {
        config.params = { ...config.params, ...params  }
        return config;
    })
    return instance
}
export default createAxiosInstance