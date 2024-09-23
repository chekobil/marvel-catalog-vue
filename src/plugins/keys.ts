import { InjectionKey } from "vue";
import { AxiosInstance } from "axios";

export const axiosKey = Symbol() as InjectionKey<AxiosInstance>