<template>
    <div>
        <button @click="handleGoTo('/')">inicio</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const handleGoTo = (path: string) => {
  router.push({path, replace: true})
}
</script>

<style scoped>

</style>