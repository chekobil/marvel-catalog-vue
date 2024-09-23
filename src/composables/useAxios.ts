import { inject } from 'vue';
import { AxiosInstance } from "axios";
import { axiosKey } from '../plugins/keys'
const useAxios = () => {
    return inject(axiosKey) as AxiosInstance
}
export default useAxios