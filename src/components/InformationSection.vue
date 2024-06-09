<script setup>
const props = defineProps({
    servicesDetail: Object
})
</script>

<template>
<div class="col-md-6" v-if="servicesDetail">
    <div class="row">
        <h2 class="d-flex justify-content-center mt-2">{{ servicesDetail.data.name }}</h2>
        <h4 class="d-flex justify-content-center mt-3">{{ servicesDetail.data.address }}</h4>
        <h4 class="d-flex justify-content-center mt-3">{{ servicesDetail.data.phoneNumber }}</h4>
    </div>
    <div class="row">
        <p class="fs-5 ps-3 mt-3 mb-0">Tentang Service ini :</p>
    </div>
    <div class="row">
        <p class="fs-5 ps-3 mt-3">{{ servicesDetail.data.description }}</p>
    </div>
</div>
</template>

<style scoped>
@media (max-width: 576px) {
    .col-md-6 {
        margin-top: 30px;
    }
}
</style>