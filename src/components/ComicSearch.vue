<template>
    <div>
        Busca por titulo de Comic
        <input v-model="searchText" type="text" placeholder="comic title" @change="handleChangeSearch">
        <select v-if="characters.results?.length" v-model="searchCharacter" name="select" @change="handleChangeSearch">
            <option v-for="character in characters.results" :key="character.id" :value="{id: character.id, name: character.name}">{{ character.name }}</option>
        </select>
        <button @click="searchCharacter = {}">clear</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import useAxios from '../composables/useAxios'
const $useAxios = useAxios()

const searchText: Ref<string> = ref('')
const searchCharacter: Ref<CharacterValue> = ref({})
const characters: Ref<CharacterCatalog> = ref({})

const emit = defineEmits<{
  (e: 'change', {text, character}: CharacterEmitData): void;
}>()

onMounted( () => {
    getCharacters()
} )

const handleChangeSearch = () => {
    emit('change', {text: searchText.value, character: searchCharacter.value})
}

const cleanSearch = () => {
    searchText.value = ''
    searchCharacter.value = {}
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

<style scoped>

</style>