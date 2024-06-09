<script setup>
import NavbarNonAuth from '../components/NavbarNonAuth.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import AuthValidation from'../services/AuthValidations'
import { useAuthStore } from '../stores/auth';
import Swal from 'sweetalert2'
const router = useRouter()
const getAuthService = useAuthStore()
const formDataLogin = ref({
    email: '',
    password: ''
})
const message = ref('') 
const isSuccessLogin = ref(null)

const login = async () => {
    try {
        AuthValidation.loginValidation(formDataLogin.value.email, formDataLogin.value.password)
        const payload = {
            email: formDataLogin.value.email,
            password: formDataLogin.value.password
        }
        const response = await getAuthService.login(payload)
        if (response.code == 200) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('username', response.data.username)
            Swal.fire({
                title: "Berhasil Login",
                text: response.message,
                icon: "success",
                timer: 2000
            });
            router.push({name: 'Services'})
        } else if (error.response.data.code == 404) {
            Swal.fire({
                title: 'Email belum terdaftar',
                text: error.response.data.message,
                icon: "error",
                timer: 2000
            })
        } else if (error.response.data.code == 400) {
            Swal.fire({
                title: 'Username atau password salah',
                text: error.response.data.message,
                icon: "error",
                timer: 2000
            })
        }
        
    } catch (error) {
        if (error.response) {
            if (error.response.data.code == 404) {
            Swal.fire({
                title: 'Email belum terdaftar',
                text: error.response.data.message,
                icon: "error",
                timer: 2000
            })
            } else if (error.response.data.code == 400) {
                Swal.fire({
                    title: 'Username atau password salah',
                    text: error.response.data.message,
                    icon: "error",
                    timer: 2000
                })
            }
        }
    }
}

</script>

<template>
    <NavbarNonAuth />
    <div class="container d-flex justify-content-center login-page">
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
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="formDataLogin.email" required>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" v-model="formDataLogin.password" required>
                </div>
                <button type="button" class="btn btn-blue"  data-bs-target="#exampleModal"  @click.prevent="login" @keydown.enter="login">Submit</button>
                
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

@media (max-width: 576px) {
    .login-page {
        height: 844px;
    }
}
</style>