<template>
  <div class="comic-card-container">
      <img :src="thumbnailUrl" :alt="comic.title" @click="handleNavigateToComic">
      {{ comic.title }}
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
comic: Comic
}>()
const thumbnailUrl = computed( () => {
  if (!props.comic) return ''
  return `${props.comic.thumbnail.path}/portrait_medium.${props.comic.thumbnail.extension}`
})

const handleNavigateToComic = () => {
  const path = `/comic/${props.comic.id}` 
  router.push({path, replace: true})
}

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
      opacity: 0.85;
      transition: scale 300ms ease-in-out, opacity 200ms ease;
  }
  &:hover {
    img {
      cursor: pointer;
      opacity: 1;
      scale: 106%;
    }
  }
}
</style>