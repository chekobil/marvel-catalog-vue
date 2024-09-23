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
  console.log("TEXT:", text, viewElement.value);
  if (viewElement.value && typeof viewElement.value.getFilteredCatalog === 'function') {
    viewElement.value.getFilteredCatalog(text)
  }
}
</script>

<template>
  <span @click="handleGoTo('/')">inicio</span>
  <ComicSearch ref="searchElement" @change="handleChangeText"/>
  <RouterView v-slot="{ Component }">
    <component ref="viewElement" :is="Component" />
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
