<script setup>
const props = defineProps({
    message : String
});
</script>

<template>
    <i class="bi bi-exclamation-triangle-fill d-flex justify-content-center text-danger icon-size"></i>
    <p class="pt-2 d-flex justify-content-center">{{ message }}</p>
</template>

<style scoped>
.icon-size {
    font-size: 100px;
}
</style>