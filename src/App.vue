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

const handleChangeSearch = ({text, character}: CharacterEmitData) => {
  if (viewElement.value && typeof viewElement.value.getFilteredCatalog === 'function') {
    viewElement.value.getFilteredCatalog(text ?? '', character ?? {})
  }
}

const handleClearSearch = () => {
  if (searchElement.value && typeof searchElement.value.cleanSearch === 'function')
  searchElement.value.cleanSearch()
}
</script>

<template>
  <main>
    <button @click="handleGoTo('/')">inicio</button>
    <ComicSearch ref="searchElement" @change="handleChangeSearch"/>
    <RouterView v-slot="{ Component }">
      <component ref="viewElement" :is="Component" @clear-search="handleClearSearch" />
    </RouterView>
  </main>
</template>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>