<template>
  <div v-if="isLoading" class="catalog-results">
    Loading ...
  </div>
  <div v-else-if="catalog.results?.length === 0" class="catalog-results">
    Catalog has no items with this criteria
  </div>
  <div v-else  class="catalog-results">
    Catalog has {{ catalog.results?.length }} items
    <span v-if="searchText">filtered by "{{ searchText }}"
      <button @click="clearSearch">Clear</button>
    </span>
    <span v-if="searchCharacter">filtered by "{{ searchCharacter }}"
      <button @click="clearSearch">Clear</button>
    </span>
  </div>
  <div class="catalog-container">
      <ComicCard v-for="comic in catalog.results" :key="comic.id" :comic />
  </div>
  <div class="catalog-container">
  <sl-button @click="handleGetNextPage">Load more ...</sl-button>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import useAxios from '../composables/useAxios'
import ComicCard from '../components/ComicCard.vue';

const $useAxios = useAxios()
const catalog: Ref<Catalog> = ref({})
const isLoading: Ref<boolean> = ref(false)
const searchText: Ref<string> = ref('')
const searchCharacter: Ref<string> = ref('')
const currentPage: Ref<number> = ref(1)

  const emit = defineEmits<{
  (e: 'clear-search'): void
}>()

onMounted( () => {
  clearSearch()
})

const clearSearch = () => {
  searchText.value = ''
  searchCharacter.value = ''
  emit('clear-search')
  currentPage.value = 1
  getCatalog()
}

const handleGetNextPage = () => {
  currentPage.value ++
  getCatalog()
}

const getCatalog = async () => {
  isLoading.value = true
  const url = "/v1/public/comics"
  const limit = 10
  const offset = (currentPage.value - 1) * limit
  const res = await $useAxios(url, { params: { limit, offset, orderBy: '-onsaleDate', formatType: 'comic', dateDescriptor: 'thisMonth' } }) 
  const result = res?.data?.data ?? {} 
  if (currentPage.value === 1) catalog.value = result
  else {
    const currentComics = catalog.value.results as Comic[]
    catalog.value.results = [...currentComics, ...result.results]
  }
  isLoading.value = false
}

const getFilteredCatalog = async (title: string, character: number = 0) => {
  if (!title && !character) {
    currentPage.value = 1
    getCatalog()
    return
  }
  const params: ComicsParams = { limit: 10 }
  if (title) params.titleStartsWith = title
  if (character) params.characters = character
  isLoading.value = true
  const url = "/v1/public/comics"
  const res = await $useAxios(url, { params }) 
  const result = res?.data?.data ?? {} 
  catalog.value = result
  isLoading.value = false
}

defineExpose({
  getFilteredCatalog
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