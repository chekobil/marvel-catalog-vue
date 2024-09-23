<template>
  <div class="comic-card-container">
      <img :src="thumbnailUrl" :alt="comic.title">
      {{ comic.title }}
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
const props = defineProps<{
comic: Comic
}>()
const thumbnailUrl = computed( () => {
  if (!props.comic) return ''
  return `${props.comic.thumbnail.path}/portrait_medium.${props.comic.thumbnail.extension}`} )
</script>

<style lang="scss">
.comic-card-container {
  width: 12rem;
  height: 100%;
  border: 2px solid red;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow: hidden;
  img {
      width: 100%;
      height: auto;
  }
}
</style>