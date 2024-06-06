<script setup> //ini composition api pake cara script setup
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const logout = () => {
  localStorage.setItem('authenticated', false)
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  router.push({name: 'Login'})
}
const props = defineProps({
  message : String,
})

const getId = localStorage.getItem('userId')
const getUsername = localStorage.getItem('username')
</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary" id="NavbarAuth">
  <div class="container">
    <a class="navbar-brand text-blue" href="#">H8GroupConnect</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link :to="{ name: 'Services', query: {order : 'desc'}}" tag="button" class="nav-link active fw-bolder">
            Home
          </router-link>
        </li>
        <li class="nav-item" v-if="getId">
          <router-link :to="{ name: 'History', params: {id : getId}, query: {page: 1, show: 12}}" tag="button" class="nav-link active">
            History
          </router-link>
        </li>
      </ul>
      <router-link :to="{ name: 'Login' }" tag="span" class="nav-link active fw-bolder text-blue" v-if="!getId">
        <span class="pe-2" @click="logout">Login</span>
      </router-link>
      <router-link class="nav-link" :to="{ name: 'Register' }" exact v-if="!getId">Register</router-link>
      <ul class="navbar-nav" v-if="getId">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle fw-bolder" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Hallo {{ getUsername }}
          </a>
          <ul class="dropdown-menu">
            <router-link :to="{ name: 'Login' }" tag="span" class="nav-link active fw-bolder" v-if="getId">
              <span class="pe-2 ms-2" @click="logout">Logout</span>
              <i class="bi bi-box-arrow-right"></i>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<style scoped>

* {
  font-family: "Roboto";
}

.text-blue {
  color: #10A8E5;
}
</style>