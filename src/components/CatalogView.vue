<template>
  <div v-if="isLoading">
    Loading ...
  </div>
  <div v-else-if="catalog.count === 0">
    Catalog has no items
  </div>
  <div v-else>
    Catalog has {{ catalog.count }} items
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

onMounted( async () => {
  isLoading.value = true
  catalog.value = await getCatalog()
  isLoading.value = false
})

const getCatalog = async () => {
  const url = "/v1/public/comics"
  const res = await $useAxios(url, { params: { limit:12, orderBy: '-onsaleDate' } }) 
  return res?.data?.data ?? {} 
}
</script>

<style scoped>

</style>