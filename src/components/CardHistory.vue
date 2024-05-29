<script setup>
const props = defineProps({
    reviews: Array
})
</script>

<template>
<div class="row" v-if="reviews.id">
    <div class="col-md-4"  v-for="listReviews in reviews.reviews" :key="listReviews.id">
        <div class="card mt-5 p-1 history-card">
            <div class="card-body">
                <div class="row">
                    <div class="row">
                        <div class="" >
                            <p class="card-text">Anda berkomentar pada apotik surya</p>
                            <i class="bi bi-star-fill stars-text"></i>
                            <p class="card-text">{{ listReviews.description }}</p>
                            <p class="card-text">Anda berkomentar pada apotik surya</p>
                            <router-link :to="{ name: 'Detail' , params : {id : listReviews.service.id }}" tag="nav-link" class="nav-link active d-flex justify-content-end">
                                lihat
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.history-card {
    padding: 50px;
    transition: transform .1s;
    margin: 0 auto;
}

.history-card:hover {
    transform: scale(1.01);
    color: #10A8E5;
    border-color: #10A8E5;
    background-color: #10A8E5;
    color: white !important;
    font-weight: bold;
}
</style>