<template>
    <div>
        Busca por titulo de Comic: {{ searchText }}
        <input v-model="searchText" type="text" placeholder="comic title" @change="handleChangeSearchText">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits<{
  (e: 'change', text: string): void
}>()

const searchText: Ref<string> = ref('')

const handleChangeSearchText = () => {
    emit('change', searchText.value)
}
const cleanSearch = () => {
    searchText.value = ''
}

defineExpose({
    cleanSearch
})

</script>

<style scoped>

</style>