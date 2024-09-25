<template>
    <h2>Not found</h2>
    <sl-button @click="handleGoTo('/')">Go to homepage</sl-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const handleGoTo = (path: string) => {
  router.push({path, replace: true})
}
</script>