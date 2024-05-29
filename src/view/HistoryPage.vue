<script setup>
import NavbarAuth from '../components/NavbarAuth.vue';
import CardHistory from '../components/CardHistory.vue';
import { useHistoryStore } from '../stores/history';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter
const getAPIHistory = useHistoryStore();
const getId = localStorage.getItem('userId')
const reviews = ref({});

const fetchData =  async () => {
    reviews.value = await getAPIHistory.getReviews(getId)
}
onMounted(async () => {
    await fetchData();
});
</script>

<template>
    <NavbarAuth/>
    <div class="container-fluid">
        <div class="container">
            <h4 class="d-flex justify-content-center mt-5">Riwayat ulasanmu ada disini</h4>
            <CardHistory
                :reviews="reviews"
            />
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

</style>


