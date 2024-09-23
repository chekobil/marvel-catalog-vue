<template>
    <div class="comic-detail-container">
        <div class="comic-detail-image">
            <img :src="comicImage" alt="">
        </div>
        <div class="comic-detail-content">
        <b>{{ comic.title }}</b>
        <div v-if="comic.description">{{ comic.description }}</div>

        <div v-if="comic.characters?.items?.length">
            <h3>Characters</h3>
            <div v-for="character in comic.characters.items" :keys="character.name">
                <b>{{ character.name }}</b>
            </div>
        </div>

        <div v-if="comic.creators?.items?.length">
            <h3>Creators</h3>
            <div v-for="creator in comic.creators.items" :keys="creator.name">
                <b>{{ creator.name }}</b> <small>{{ creator.role }}</small>
            </div>
        </div>
        <button @click="handleGoToMarvelPage">Link to Marvel page</button>
    </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import type { Ref } from 'vue'
import useAxios from '../composables/useAxios'
import {useRoute} from 'vue-router'

const route = useRoute()

const $useAxios = useAxios()
const comic: Ref<Comic|EmptyComic> = ref({})
const isLoading: Ref<boolean> = ref(false)

const handleGoToMarvelPage = () => {
    window.open(detailUrl.value, '_blank');
}

const comicImage = computed(() => {
    console.log(comic.value.images?.length, comic.value.images);
    
    if (!comic.value.images?.length) return ''
    return `${comic.value.images[0].path}.${comic.value.images[0].extension}`
})
const detailUrl = computed( () => {
    if (!comic.value.urls?.length) return ''
    const findUrl = comic.value.urls?.find( url => url.type === "detail" )
    if (!findUrl) return ''
    return findUrl.url
})

onMounted( async () => {
  isLoading.value = true
  comic.value = await getComicDetails() as Comic
  isLoading.value = false
})

const getComicDetails = async () => {
  const url = `/v1/public/comics/${route.params.id}`
  const res = await $useAxios(url) 
  return res?.data?.data.results[0]
}
</script>

<style scoped>
.comic-detail-container {
    display: flex;
    gap: 2rem;
    .comic-detail-image {
        width: 430px;
        img {
            max-width: 100%;
            height: auto;
        }
    }
    .comic-detail-content {
        flex: 1;
    }
}
</style>