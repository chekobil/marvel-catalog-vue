import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

  export const useCatalogStore = defineStore('catalog', () => {
    const catalog: Ref<Comic[]> = ref([])
    const filter: Ref<[string, string]> = ref(['', ''])
    const currentPage: Ref<number> = ref(1)
    return { catalog, filter, currentPage }
  })