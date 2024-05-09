<script setup>
import NavbarNonAuth from '../components/NavbarNonAuth.vue';
</script>

<template>
    <NavbarNonAuth />
    <div class="container d-flex justify-content-center">
        <div class="card mt-4" style="width: 30rem;">
            <div class="mt-1 mb-2">
                <div class="d-flex justify-content-center">
                    <h3>Selamat Datang</h3>
                </div>
                <div class="d-flex justify-content-center">
                    <p>Silahkan login terlebih dahulu</p>
                </div>
            </div>
            <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <!-- <button type="submit" class="btn btn-blue">Submit</button> -->
            <router-link :to="{ name: 'Services' }" tag="button" class="btn btn-blue">
            Submit
            </router-link>
            </form>
            <div class="mt-3 mb-1">
                <p class="mb-1">Belum punya akun ?</p>
            </div>
            <div class="mt-0">
                <router-link class="nav-link text-blue fw-bold" :to="{ name: 'Register' }" exact>Register</router-link>
            </div> 
        </div> 
    </div>
</template>

<style scoped>
.btn-blue {
  background-color: #10A8E5;
  color: white;
}

.text-blue {
  color: #10A8E5;
}

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
    font-family: "Roboto";
}
</style>