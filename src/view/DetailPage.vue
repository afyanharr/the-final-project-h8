<script setup>
import NavbarAuth from '../components/NavbarAuth.vue'
import { useStoreAPI } from '../stores/index';
import { ref, onMounted } from 'vue'

const getAPIService = useStoreAPI();


const servicesDetail = ref([])
async function fetchData() {
    servicesDetail.value = await getAPIService.getServicesDetailData()
}
onMounted(async () => {
    await fetchData();
});

</script>

<template>
<NavbarAuth />
<div class="container">
    <div class ="row mt-5">
        <div class="col-md-6">
            <div class="row">
                <img :src=servicesDetail.image alt="image dummy" style ="width: 650px;">
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-3 p-3">
                    <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" style ="width: 150px;">
                </div>
                <div class="col-md-3 p-3">
                    <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" style ="width: 150px;">
                </div>
                <div class="col-md-3 p-3">
                    <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" style ="width: 150px;">
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class ="row">
                <h2 class="d-flex justify-content-center">{{ servicesDetail.name }}</h2>
                <h3 class="d-flex justify-content-center mt-4">{{ servicesDetail.address }}</h3>
                <h3 class="d-flex justify-content-center mt-4">{{ servicesDetail.phoneNumber }}</h3>
            </div>
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-md-6">
            <div class="row">
                <h2>Berikan Ulasanmu</h2>
            </div>
            <div class="row mt-3">
                <div class="col-md-9 pe-0 me-0">
                    <textarea id="w3review" name="w3review" rows="4" cols="50"></textarea>
                </div>
                <div class="col-md-3 ps-0">
                    <button class="btn btn-primary btn-lg btn-block mt-4 ms-5 main-color">Kirim</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-5" v-for="servicesDetail in servicesDetail.reviews" :key="servicesDetail.id">
        <div class="col-md-1">
            <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" class="mt-3" style ="width: 70px; border-radius: 50%; object-fit: cover;">
        </div>
        <div class="col-md-11">
            <div class="row">
                <b>{{ servicesDetail.user.name }}</b>
            </div>
            <div class="row">
                <i class="bi bi-star-fill"></i>
            </div>
            <div class="row">
                <p clas="fw-lighter">{{ servicesDetail.description }}</p>
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
</style>