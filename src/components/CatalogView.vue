<template>
  <div v-if="isLoading" class="catalog-results">
    Loading ...
  </div>
  <div v-else-if="catalog?.length === 0" class="catalog-results">
    Catalog has no items with this criteria
  </div>
  <div v-else  class="catalog-results">
    Catalog has {{ catalog?.length }} items
  </div>
  <div class="catalog-container">
      <ComicCard v-for="comic in catalog" :key="comic.id" :comic />
  </div>
  <div v-if="!isFiltered" class="catalog-container">
    <sl-button @click="handleGetNextPage">Load more ...</sl-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { Ref } from 'vue'
import useAxios from '../composables/useAxios'
import ComicCard from '../components/ComicCard.vue';
import { useCatalogStore } from '../stores/store'

const catalogStore = useCatalogStore()
const storedCatalog = computed(() => catalogStore.catalog)

const $useAxios = useAxios()
const catalog: Ref<Comic[]> = ref([])
const isLoading: Ref<boolean> = ref(false)
const searchText: Ref<string> = ref('')
const searchCharacter: Ref<string> = ref('')
const currentPage: Ref<number> = ref(1)

  const emit = defineEmits<{
  (e: 'clear-search'): void
}>()

onMounted( () => {
  currentPage.value = 1
  getCatalog()
})

const isFiltered = computed(() => Boolean(searchText.value || searchCharacter.value))

const clearSearch = () => {
  searchText.value = ''
  searchCharacter.value = ''
  emit('clear-search')
  currentPage.value = 1
  // getCatalog()
}

const handleGetNextPage = () => {
  currentPage.value ++
  getCatalog()
}

const getCatalog = async () => {
  isLoading.value = true

  // Devuelve catalogo del Store solo para pagina 1, resto de paginas hace la peticion y añade mas items a la lista
  if (storedCatalog.value?.length && currentPage.value === 1) {
    catalog.value = storedCatalog.value
    isLoading.value = false
    return
  }

  const url = "/v1/public/comics"
  const limit = 10
  const offset = (currentPage.value - 1) * limit
  const res = await $useAxios(url, { params: { limit, offset, orderBy: '-onsaleDate', formatType: 'comic', dateDescriptor: 'thisMonth' } }) 
  const result = res?.data?.data
  if (currentPage.value === 1) catalog.value = result?.results ?? []
  else {
    const currentComics = catalog.value as Comic[]
    catalog.value = [...currentComics, ...result.results]
  }
  catalogStore.catalog = catalog.value
  isLoading.value = false
}

const getFilteredCatalog = async (title: string, character: string|number = '') => {
  console.log("FILTERED with", title, character);
  
  searchText.value = ''
  searchCharacter.value = ''
  catalogStore.catalog = []
  currentPage.value = 1
  if (!title && !character) {
    getCatalog()
    return
  }
  const params: ComicsParams = { limit: 20 }
  if (title) {
    params.titleStartsWith = title
    searchText.value = title
  }
  if (character) {
    params.characters = character
    searchCharacter.value = String(character)
  }
  isLoading.value = true
  const url = "/v1/public/comics"
  const res = await $useAxios(url, { params }) 
  const result = res?.data?.data 
  catalog.value = result?.results ?? []
  isLoading.value = false
  catalogStore.catalog = catalog.value
}

defineExpose({
  getFilteredCatalog,
  clearSearch
})

</script>

<style lang="scss">
.catalog-results {
  box-sizing: border-box;
  font-size: 0.8rem;
  width: 100%;
  padding: 0 3rem;
  display: flex;
  justify-content: flex-end;
}
.catalog-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  align-items: flex-end;
  gap: 3rem 2rem;
}
</style>