<template>
    <div class="search-container" :class="{'is-disabled': isComicRoute}">
        <sl-input label="Search by title" placeholder="comic title" :value="searchText" @sl-input="handleChangeInput"></sl-input>
        <sl-select v-if="characters.results?.length" clearable label="Search by character" :value="searchCharacter" @sl-change="handleChangeSelect">
            <sl-option v-for="character in characters.results" :key="character.id" :value="character.id">{{ character.name }}</sl-option>
        </sl-select>
        <div class="button-group">
            <sl-button size="medium" pill @click="handleChangeSearch">Search</sl-button>
            <sl-button size="medium" pill @click="handleResetSearch">Reset</sl-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { Ref } from 'vue'
import useAxios from '../composables/useAxios'
const $useAxios = useAxios()
import { useRoute } from 'vue-router'
const route = useRoute()

const searchText: Ref<string> = ref('')
const searchCharacter: Ref<number> = ref(0)
const characters: Ref<CharacterCatalog> = ref({})

const emit = defineEmits<{
  (e: 'change', {text, character}: CharacterEmitData): void;
}>()

onMounted( () => {
    getCharacters()
} )

const isComicRoute = computed(() => {
    return route.path.includes('/comic')
})

const handleChangeInput = (event: any) => {
    searchText.value = event.target.value
}
const handleChangeSelect = (event: any) => {
    searchCharacter.value = event.target.value
}
const handleChangeSearch = () => {
    emit('change', {text: searchText.value, character: searchCharacter.value})
}
const handleResetSearch = () => {
    cleanSearch()
    handleChangeSearch()
}

const cleanSearch = () => {
    searchText.value = ''
    searchCharacter.value = 0
}

const getCharacters = async () => {
  const url = "/v1/public/characters"
  const res = await $useAxios(url, { params: { limit:50, orderBy: 'modified' } }) 
  const result = res?.data?.data ?? {} 
  characters.value = result
}

defineExpose({
    cleanSearch
})

</script>

<style lang="scss">
.search-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 0.6rem 2rem;
    .button-group {
        display: flex;
        gap: 1rem; 
    }
    padding-bottom: 1.4rem;
    border-bottom: 1px solid #cdcdcd;
    &.is-disabled {
        opacity: 0.4;
        pointer-events: none;
    }
}

</style>