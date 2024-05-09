<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router'
const route = useRoute()
const tempFunction = (params) => {
  return params
}
</script>

<template>

  <router-view/>
</template>

<style scoped>
.text-blue {
  color: #10A8E5;
}
</style>
