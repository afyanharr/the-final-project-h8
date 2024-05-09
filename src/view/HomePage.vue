<script setup>
import NavbarAuth from '../components/NavbarAuth.vue'
import { useStoreAPI } from '../stores/index';
import { ref, onMounted } from 'vue'

const getAPIService = useStoreAPI();

const services = ref([])
async function fetchData() {
    services.value = await getAPIService.getServicesData()
}

onMounted(async () => {
    await fetchData();
});
</script>

<!-- <template>
<NavbarAuth />
<div class="container d-flex justify-content-center">
    <div class="container mt-5 row d-flex justify-content-center" >
        <router-link v-for="service in services.data" :key="service.id" :to="{ name: 'Detail', params: { id: service.id } }" tag="div" class="card p-2 m-3" style="width: 12rem;">
            <div class="card p-2 m-3 zoom" style="width: 12rem;">
                <img :src="service.image" class="card-img-top" alt="Service Image">
                <div class="card-body">
                    <h5 class="card-title">{{ service.name }}</h5>
                    <p class="card-text">{{ service.description}}</p>
                    <router-link :to="{ name: 'Detail' }" tag="button" class="btn btn-primary">
                        Detail
                    </router-link>
                </div>
            </div>
        </router-link>
    </div>
</div>
</template> -->

<template>
    <NavbarAuth />
    <div class="container d-flex justify-content-center">
      <div class="container mt-5 row d-flex justify-content-center">
        <router-link v-for="service in services.data" :key="service.id" :to="{ name: 'Detail', params: { id: service.id } }" tag="div" class="card p-2 m-3 zoom" style="width: 12rem; text-decoration: none;">
          <img :src="service.image" class="card-img-top" alt="Service Image">
          <div class="card-body">
            <h5 class="card-title">{{ service.name }}</h5>
            <p class="card-text">{{ service.description }}</p>
            <router-link :to="{ name: 'Detail' }" tag="button" class="btn btn-primary main-color">
                Detail
            </router-link>
        </div>
        </router-link>
      </div>
    </div>
  </template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
    font-family: "Roboto";
}

.zoom {
  padding: 50px;
  transition: transform .1s;
  margin: 0 auto;
}

.zoom:hover {
  transform: scale(1.1);
  color: #10A8E5;
}

.main-color {
    background-color: #10A8E5;
}
</style>
