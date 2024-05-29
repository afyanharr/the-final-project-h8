<script setup>
import NavbarAuth from '../components/NavbarAuth.vue';
import { useHistoryStore } from '../stores/history';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter
const getAPIHistory = useHistoryStore();
const getId = localStorage.getItem('userId')
const reviews = ref({});
async function fetchData() {
    reviews.value = await getAPIHistory.getReviews(getId)
};
onMounted(async () => {
    await fetchData();
});
</script>

<template>
    <NavbarAuth/>
    <div class="container-fluid">
        <div class="container">
            <h4 class="d-flex justify-content-center mt-5">Riwayat ulasanmu ada disini</h4>
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
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
    font-family: "Roboto";
}

.main-color {
    background-color: #10A8E5;
}

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


