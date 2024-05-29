<script setup>
const props = defineProps({
    servicesDetail: Object
})
</script>

<template>
<div class="col-md-6" v-if="servicesDetail.data">
    <div class="row">
        <h2 class="d-flex justify-content-center">{{ servicesDetail.data.name }}</h2>
        <h4 class="d-flex justify-content-center mt-3">{{ servicesDetail.data.address }}</h4>
        <h4 class="d-flex justify-content-center mt-3">{{ servicesDetail.data.phoneNumber }}</h4>
    </div>
    <div class="row">
        <p class="ms-3 ps-3 me-3 pe-3 mt-3 mb-0">Tentang Service ini :</p>
    </div>
    <div class="row">
        <p class="fs-5 ms-3 ps-3 me-3 pe-3 mt-3">{{ servicesDetail.data.description }}</p>
    </div>
</div>
</template>

<style scoped>
</style>