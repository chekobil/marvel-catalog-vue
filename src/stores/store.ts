import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

  export const useCatalogStore = defineStore('catalog', () => {
    const catalog: Ref<Comic[]> = ref([])
    function setCatalog(data: Comic[]) {
        catalog.value = data
    }
  
    return { catalog, setCatalog }
  })