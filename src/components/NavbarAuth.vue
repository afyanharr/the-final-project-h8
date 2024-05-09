<script setup>
import '../style.css'

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
          <router-link :to="{ name: 'Services' }" tag="button" class="nav-link active">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'History' }" tag="button" class="nav-link active">
            History
          </router-link>
        </li>
      </ul>
      <form class="d-flex me-5 pe-5" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      </form>
      <router-link :to="{ name: 'Login' }" tag="span" class="nav-link active fw-bolder">
        Logout
      </router-link>
    </div>
  </div>
</nav>
</template>

<style scoped>
.text-blue {
  color: #10A8E5;
}
</style>