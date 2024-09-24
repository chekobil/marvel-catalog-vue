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
  const validImage = props.comic.images[0] ?? props.comic.thumbnail
  return `${validImage.path}/portrait_incredible.${validImage.extension}`
})

const handleNavigateToComic = () => {
  const path = `/comic/${props.comic.id}` 
  router.push({path, replace: true})
}

</script>

<style lang="scss">
.comic-card-container {
  width: min(290px, 80%);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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