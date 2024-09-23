import { App } from "vue";
import createAxiosInstance from './axiosInstance'
import { axiosKey } from './keys'

const instance = createAxiosInstance('http://gateway.marvel.com', { apikey: import.meta.env.VITE_MARVEL_APIKEY })

export default {
    install: async (app: App) => {
        app.provide(axiosKey, instance)
    }
  }