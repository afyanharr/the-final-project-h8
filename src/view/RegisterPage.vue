<script setup>
import NavbarNonAuth from '../components/NavbarNonAuth.vue';
import AuthValidation from '../services/AuthValidations';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import Swal from 'sweetalert2'

const router = useRouter()
const getAuthService = useAuthStore()

const messageSuccess = ref(null)

const formDataRegister = ref({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}) 

const register = async () => {
    try {
    AuthValidation.passwordValidations(formDataRegister.value.password, formDataRegister.value.confirmPassword)

    const payload = {
        username: formDataRegister.value.username,
        email: formDataRegister.value.email,
        password: formDataRegister.value.password,
        phoneNumber: formDataRegister.value.phoneNumber.toString()
    }
    const response = await getAuthService.register(payload)
    if (response.code == 201) {
        messageSuccess.value = response.message
        Swal.fire({
            title: 'Akun berhasil dibuat',
            text: messageSuccess.value,
            icon: 'success',
            timer: 2000
        })
        router.push({name: 'Login'})
    }
    } catch (error) {
        throw error
    }
}
</script>

<template>
    <NavbarNonAuth/>
    <div class="container d-flex justify-content-center">
        <div class="card mt-4" style="width: 30rem;">
            <div class="mt-1 mb-2">
                <div class="d-flex justify-content-center">
                    <h3>Belum punya akun ?</h3>
                </div>
                <div class="d-flex justify-content-center">
                    <p>Daftar dulu yuk dibawah</p>
                </div>
            </div>
            <form>
            <div class="mb-3">
                <label for="exampleInputName1" class="form-label">Username</label>
                <input type="text" class="form-control" id="exampleInputUsername" aria-describedby="emailHelp" v-model="formDataRegister.username" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputName1" class="form-label">Nama Lengkap</label>
                <input type="text" class="form-control" id="exampleInputName" aria-describedby="emailHelp" v-model="formDataRegister.name" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Alamat Email</label>
                <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" v-model="formDataRegister.email" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword" v-model="formDataRegister.password" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputConfirmPassword1" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputConfirmPassword" v-model="formDataRegister.confirmPassword" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputConfirmPassword1" class="form-label">Nomor HP</label>
                <input type="number" class="form-control" id="exampleInputPhonenumber" v-model="formDataRegister.phoneNumber" required>
            </div>
            <button type="submit" class="btn btn-blue" @click.prevent="register">Submit</button>
            </form>
            <div class="mt-3 mb-1">
                <p class="mb-1">Sudah punya akun ?</p>
            </div>
            <div class="mt-0">
                <router-link class="nav-link text-blue fw-bold" :to="{ name: 'Login' }" exact>Login</router-link>
            </div>
        </div> 
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.btn-blue {
  background-color: #10A8E5;
  color: white;
}

.text-blue {
  color: #10A8E5;
}

* {
    font-family: "Roboto";
}
</style>../services/AuthValidations