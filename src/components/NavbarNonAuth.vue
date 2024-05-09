<script setup>
import { RouterView, RouterLink, useRoute } from 'vue-router'

const route = useRoute()

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" id="NavbarNonAuth">
    <div class="container">
      <a class="navbar-brand text-blue" id="button" href="#">H8GroupConnect</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-blue" :to="{ name: 'Login' }" exact>Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Register' }" exact>Register</router-link>
          </li>
        </ul>  
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<style scoped>
.text-blue {
  color: #10A8E5;
}
</style>
