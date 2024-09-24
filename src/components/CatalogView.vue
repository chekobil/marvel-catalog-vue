<template>
  <div v-if="isLoading">
    Loading ...
  </div>
  <div v-else-if="catalog.count === 0">
    Catalog has no items with this criteria
  </div>
  <div v-else>
    Catalog has {{ catalog.count }} items
    <span v-if="searchText">filtered by "{{ searchText }}"
      <button @click="clearSearch">Clear</button>
    </span>
    <span v-if="searchCharacter">filtered by "{{ searchCharacter }}"
      <button @click="clearSearch">Clear</button>
    </span>
    <div class="catalog-container">
      <ComicCard v-for="comic in catalog.results" :key="comic.id" :comic />
    </div>
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

  const emit = defineEmits<{
  (e: 'clear-search'): void
}>()

onMounted( () => {
  getCatalog()
})

const clearSearch = () => {
  searchText.value = ''
  searchCharacter.value = ''
  emit('clear-search')
  getCatalog()
}

const getCatalog = async () => {
  const url = "/v1/public/comics"
  const res = await $useAxios(url, { params: { limit:10, orderBy: '-onsaleDate', formatType: 'comic', dateDescriptor: 'thisMonth' } }) 
  const result = res?.data?.data ?? {} 
  isLoading.value = true
  catalog.value = result
  isLoading.value = false
}

const getFilteredCatalog = async (title: string, character: CharacterValue = {}) => {
  if (!title && !character) {
    getCatalog()
    return
  }
  searchText.value = title
  searchCharacter.value = character?.name ?? ''
  const params: ComicsParams = { limit: 10 }
  if (title) params.titleStartsWith = title
  if (character) params.characters = character.id
  const url = "/v1/public/comics"
  const res = await $useAxios(url, { params }) 
  const result = res?.data?.data ?? {} 
  isLoading.value = true
  catalog.value = result
  isLoading.value = false
}

defineExpose({
  getFilteredCatalog
})

</script>

<style lang="scss">
.catalog-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;
  gap: 3rem 2rem;
}
</style>