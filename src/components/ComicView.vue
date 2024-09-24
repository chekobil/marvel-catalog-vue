<template>
    <div v-if="isError">
        Some error ocurred <br>
        <b v-if="errorMessage"> {{ errorMessage }}</b>
    </div>
    <div v-else class="comic-detail-container">
        <div class="comic-detail-image">
            <img :src="comicImage" alt="">
        </div>
        <div class="comic-detail-content">
        <h2>{{ comic.title }}</h2>
        <br>
        <br>
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
import { onMounted, ref, computed } from 'vue'
import type { Ref } from 'vue'
import useAxios from '../composables/useAxios'
import {useRoute} from 'vue-router'

const route = useRoute()

const $useAxios = useAxios()
const comic: Ref<Comic|EmptyComic> = ref({})
const isLoading: Ref<boolean> = ref(false)
const isError: Ref<boolean> = ref(false)
const errorMessage: Ref<string> = ref('')

const handleGoToMarvelPage = () => {
    window.open(detailUrl.value, '_blank');
}

const comicImage = computed(() => {
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
  try {
    const res = await $useAxios(url) 
    return res?.data?.data.results[0]
  } catch(err: any) {
    if (err.status === 404) {
        errorMessage.value = err.response.data.status ?? ''
    }
    isError.value = true
  }
}
</script>

<style scoped>
.comic-detail-container {
    display: flex;
    justify-content: space-around;
    gap: 2rem;
    .comic-detail-image {
        width: min(400px, 80%);
        img {
            max-width: 100%;
            height: auto;
        }
    }
    .comic-detail-content {
        max-width: 660px;
        flex: 1;
    }
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }

}
</style>