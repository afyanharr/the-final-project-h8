<script setup>
import NavbarAuth from '../components/NavbarAuth.vue';
</script>

<template>
    <NavbarAuth/>
    <div class="container-fluid">
        <div class="container">
            <h4 class="d-flex justify-content-center mt-5">Riwayat ulasanmu ada disini</h4>
            <div class="card mt-5">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-3">
                                    <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" class="mt-3" style ="width: 100px; height: 80px; border-radius: 50%; object-fit: cover;">
                                </div>
                                <div class="col-md-9">
                                    <h5 class="card-title">John Doe</h5>
                                    <i class="bi bi-star-fill"></i>
                                    <p class="card-text">Tempat yang sangat bersih</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-8 mt-4 pt-1">
                                    <p class="text-end">Apotik Surya</p>
                                </div>
                                <div class="col-md-4 mt-4">
                                    <router-link :to="{ name: 'Detail' }" tag="button" class="btn btn-primary main-color">
                                        Lihat
                                    </router-link>
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
</style>