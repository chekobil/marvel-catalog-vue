<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import ComicSearch from './components/ComicSearch.vue';
import CatalogView from './components/CatalogView.vue';
type viewElementType = InstanceType<typeof CatalogView>
type searchElementType = InstanceType<typeof ComicSearch>
const viewElement = useTemplateRef<viewElementType>('viewElement')
const searchElement = useTemplateRef<searchElementType>('searchElement')
const router = useRouter()
const handleGoTo = (path: string) => {
  router.push({path, replace: true})
}

const handleChangeText = (text: string) => {
  if (viewElement.value && typeof viewElement.value.getFilteredCatalog === 'function') {
    viewElement.value.getFilteredCatalog(text)
  }
}

const handleClearSearch = () => {
  if (searchElement.value && typeof searchElement.value.cleanSearch === 'function')
  searchElement.value.cleanSearch()
}
</script>

<template>
  <button @click="handleGoTo('/')">inicio</button>
  <ComicSearch ref="searchElement" @change="handleChangeText"/>
  <RouterView v-slot="{ Component }">
    <component ref="viewElement" :is="Component" @clear-search="handleClearSearch" />
  </RouterView>

</template>

<style lang="scss">
.catalog-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
}
</style>
