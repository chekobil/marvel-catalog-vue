<template>
    <div>
        <sl-breadcrumb>
            <sl-breadcrumb-item @click="handleGoTo('/')">Homepage</sl-breadcrumb-item>
            <sl-breadcrumb-item v-if="isComicRoute">Comics</sl-breadcrumb-item>
        </sl-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const handleGoTo = (path: string) => {
  router.push({path, replace: true})
}
const isComicRoute = computed(() => {
    return route.path.includes('/comic')
})
</script>

<style scoped>

</style>