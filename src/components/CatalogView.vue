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
import { onMounted, ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import useAxios from '../composables/useAxios'
import ComicCard from '../components/ComicCard.vue';
import { useCatalogStore } from '../stores/store'

const catalogStore = useCatalogStore()
const storedCatalog = computed(() => catalogStore.catalog)
const storedCurrentPage = computed(() => catalogStore.currentPage)

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
  ([searchText.value, searchCharacter.value] = catalogStore.filter)
  currentPage.value = catalogStore.currentPage
  getCatalog()
})

watch(currentPage, (val: number) => {
  if (catalogStore.currentPage === val) return
  console.log("CAMBIA INTERNAL page", val);
  catalogStore.currentPage = val
})
watch(storedCurrentPage, (val: number) => {
  if (currentPage.value === val) return
  console.log("CAMBIA STORE page", val);
  currentPage.value = val
}, {immediate: true})

const isFiltered = computed(() => Boolean(searchText.value || searchCharacter.value))

const clearSearch = () => {
  searchText.value = ''
  searchCharacter.value = ''
  emit('clear-search')
  currentPage.value = 1
}

const handleGetNextPage = () => {
  currentPage.value ++
  getCatalog()
}

const getCatalog = async () => {
  isLoading.value = true
  const limit = 10
  const offset = (currentPage.value - 1) * limit

  // Devuelve catalogo del Store solo para pagina 1, resto de paginas hace la peticion y añade mas items a la lista
  if (storedCatalog.value?.length === currentPage.value * limit) {
    catalog.value = storedCatalog.value
    isLoading.value = false
    return
  }

  console.log("GET PAGE", currentPage.value);
  
  const url = "/v1/public/comics"
  const res = await $useAxios(url, { params: { limit, offset, orderBy: '-onsaleDate', formatType: 'comic', dateDescriptor: 'thisMonth' } }) 
  const result = res?.data?.data
    const currentComics = catalog.value as Comic[]
    catalog.value = [...currentComics, ...result.results]
  catalogStore.catalog = catalog.value
  catalogStore.filter = ['', '']
  isLoading.value = false
}

const getFilteredCatalog = async (title: string, character: string|number = '') => {
  console.log("FILTERED with", title, character);
  
  searchText.value = ''
  searchCharacter.value = ''
  catalogStore.catalog = []
  catalogStore.filter = ['', '']
  catalogStore.currentPage = 1
  currentPage.value = 1
  if (!title && !character) {
    getCatalog()
    return
  }
  const params: ComicsParams = { limit: 20 }
  if (title) {
    params.titleStartsWith = title
    searchText.value = title
    catalogStore.filter = [title, '']
  }
  if (character) {
    params.characters = character
    searchCharacter.value = String(character)
    catalogStore.filter = [title, String(character)]
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