<script setup>
import NavbarAuth from '../components/NavbarAuth.vue'
import ErrorHandling from '../components/ErrorHandling.vue';
import { useStoreAPI } from '../stores/index';
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const getAPIService = useStoreAPI();
const services = ref([])
const query = ref(router.query)
const tempQuery = ref({})
const keywordSearch = ref('')
const sortValue = ref('Urutkan')
const filterValue = ref('Filter')
const errorMessage = ref(null)
const parentMessage = ref('')

async function fetchData() {
  try {
    services.value = await getAPIService.getServicesData()

  } catch (error) {
    errorMessage.value = error
  }
}
onMounted(async () => {
    await fetchData();
    watch(
      () => router.query,
      (newQuery) => {
        query.value = newQuery
      },
      {immediate: true}
    )
});

const updateQuerySort = (key, value, label) => {
  sortValue.value = label
  tempQuery.value = { ...tempQuery.value, [key]: value};
  // router.push({query: {...router.query, [key]: value}})
  console.log(tempQuery.value, ' ini value tempquery')
  
}

const updateQueryFilter = (key, value, label) => {
  filterValue.value = label
  tempQuery.value = { ...tempQuery.value, [key]: value};
  // router.push({query: {...router.query, [key]: value}})
}

const submitQuery = async (tempQuery) => {
  services.value = await getAPIService.getServicesDataSortBy(tempQuery)
  router.push({ query: { ...router.query, ...tempQuery.value }})
  tempQuery.value = {}
}

const getDetail = (id) => {
  router.push({ name: 'Detail', params: { id: id }})
}

const submitSearch = async (keywordSearch) => {
  router.push({query: {keyword: keywordSearch.value}})
  services.value = await getAPIService.getServicesDataSearch(keywordSearch)
}
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
    <NavbarAuth :message="parentMessage" />
    <div class="container d-flex justify-content-center">
      <div class="container mt-5 row d-flex justify-content-center">
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <h3 class="d-flex justify-content-center fw-bold">H8Service</h3>
            <p class="d-flex justify-content-center text-center text-secondary">Temukan Services terbaik bersama H8GroupConnect!</p>
          </div>
          <div class="col-md-8 col-sm-8">
            <div class="d-flex">
              <div class="row">
                <div class="col-md-6 pe-0 me-0">
                  <form class="d-flex" role="search">
                      <input class="form-control search-input" type="search" placeholder="Temukan services..." aria-label="Search" v-model="keywordSearch">
                      <button class="btn main-color btn-sm text-white me-4" @click.prevent="submitSearch(keywordSearch)">Cari</button>
                      <button class="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ filterValue }}</button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" @click="updateQueryFilter('filter', 'apotik', 'Apotik')" >Apotik</a></li>
                        <li><a class="dropdown-item" href="#" @click="updateQueryFilter('filter', 'klinik', 'Klinik')" >Klinik</a></li>
                        <li><a class="dropdown-item" href="#" @click="updateQueryFilter('filter', 'puskesmas', 'Puskesmas')" >Puskesmas</a></li>
                        <li><a class="dropdown-item" href="#" @click="updateQueryFilter('filter', 'rumahsakit', 'Rumah sakit')" >Rumah Sakit</a></li>
                      </ul>       
                      <button class="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ sortValue }}</button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('name', 'asc', 'A-Z')" >A-Z</a></li>
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('name', 'desc', 'Z-A')" >Z-A</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('rating', 'asc' , 'Rating Tertinggi')" >Rating Tertinggi</a></li>
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('rating', 'desc', 'Rating Terendah')" >Rating Terendah</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('updatedAt', 'asc', 'Terbaru')" >Terbaru</a></li>
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('createdAt', 'asc', 'Terlama')" >Terlama</a></li>
                      </ul>   
                      <button type="button" class="btn main-color btn-sm text-white" @click="submitQuery(tempQuery)">Terapkan</button>
                  </form>
                </div>
              </div>
            </div>
            <!-- <form class="d-flex me-5 pe-5" role="search">
              <input class="form-control m-2 search-input" type="search" placeholder="Temukan services..." aria-label="Search">
            </form> -->
          </div>
          
        </div>
        <div v-if="errorMessage" class="mt-5">
          <!-- <i class="bi bi-exclamation-triangle-fill d-flex justify-content-center text-danger icon-size"></i>
          <p class="pt-2 d-flex justify-content-center">{{ errorMessage }}</p> -->
          <ErrorHandling :message="errorMessage"/>
        </div>
        <div class="d-flex justify-content-center mt-5 text-secondary"  v-if="services && services.data && services.data.length < 1">
          <h5>Service tidak ditemukan</h5>
        </div>
        <div v-for="service in services.data" :key="service.id" :to="{ name: 'Detail', params: { id: service.id } }" tag="div" class="card p-2 m-3 zoom shadow" style="width: 12rem; text-decoration: none;" >
          <!-- <img :src="service.image" class="card-img-top" alt="Service Image"> -->
          <img src="https://www.apotek-k24.com/images/post/16777494720230211014631yunita.isnaciri-ciri%20pengusaha%20yang%20berhasil.jpg.webp" class="card-img-top" alt="Service Image">
          <div class="card-body">
            <h5 class="card-title">{{ service.name }}</h5>
            <p class="card-text">{{ service.description }}</p>
            <!-- <router-link :to="{ name: 'Detail', params: { id : service.id }  }" tag="button" class="btn btn-primary main-color">
                Detail
            </router-link> -->
            <button class="btn btn-primary main-color" @click="getDetail(service.id)">Detail</button>
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

.search-input {
  width: 300px;
}

.filter-icon {
  font-size: 30px;
}

.button-terapkan {
  height: 40px;
}
</style>
