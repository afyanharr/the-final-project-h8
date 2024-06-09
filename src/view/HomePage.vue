<script setup>
import NavbarAuth from '../components/NavbarAuth.vue'
import ErrorHandling from '../components/ErrorHandling.vue';
import { useStoreAPI } from '../stores/index';
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const getAPIService = useStoreAPI();
const services = ref([])
const servicesType = ref([])
const query = ref(router.query)
const tempQuery = ref({})
const sortValue = ref('Urutkan')
const filterValue = ref('Filter')
const errorMessage = ref(null)
const parentMessage = ref('')
const sortValue1 = ref('')
const sortValue2 = ref('')
const keywordSearch = ref('')
const currentPagination = ref(1)
const starsPreReview = ref([
    { 
        active: false,
        value: 1,
    },
    { 
        active: false,
        value: 2,
    },
    { 
        active: false,
        value: 3,
    },
    { 
        active: false,
        value: 4
    },
    { 
        active: false,
        value: 5
    }
])

const fetchData = async () => {
  try {
    services.value = await getAPIService.getServicesData()
    servicesType.value = await getAPIService.getServiceType()
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

const updateQuerySort = (value1, value2, label) => {
  sortValue1.value = value1
  sortValue2.value = value2
  sortValue.value = label
  const sortValue11 = 'sortBy'
  const sortValue22 = 'sortingMethod'
  tempQuery.value = { ...tempQuery.value, [sortValue11]: value1, [sortValue22]: value2, ['page']: currentPagination.value, ['show']: 12}
  
}

const updateQueryFilter = (key, value, label) => {
  filterValue.value = label
  tempQuery.value = { ...tempQuery.value, [key]: value, ['page']: currentPagination.value, ['show']: 12};
}

const submitQuery = async (tempQueryParams) => {
  services.value = await getAPIService.getServicesData(tempQueryParams)
  router.push({ query: { ...tempQuery.value }})
  tempQuery.value = {}
}

const getDetail = async (id) => {
  router.push({ name: 'Detail', params: { id: id }})
}

const submitSearch = async () => {
  tempQuery.value = { ...tempQuery.value, ['keyword']: keywordSearch.value, ['page']: currentPagination.value, ['show']: 12}
  router.push({query: { ...tempQuery.value }})
  services.value = await getAPIService.getServicesData(tempQuery.value)
  tempQuery.value = {}
}

const countPaginate = async (params) => {
  if (params == 'increment') {
    currentPagination.value++
    tempQuery.value = { ...tempQuery.value, ['page']: currentPagination.value, ['show']: 12}
    services.value = await getAPIService.getServicesData(tempQuery.value)
  } else if (params == 'decrement') {
    currentPagination.value--
    tempQuery.value = { ...tempQuery.value, ['page']: currentPagination.value, ['show']: 12}
    services.value = await getAPIService.getServicesData(tempQuery.value)
  }
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
        <div class="row container d-flex justify-content-center">
          <div class="col-md-6">
            <h3 class="d-flex justify-content-center fw-bold">H8Service</h3>
            <p class="d-flex justify-content-center text-center text-secondary">Temukan Services terbaik bersama H8GroupConnect!</p>
          </div>
          <div class="col-md-6">
            <div class="d-flex">
              <div class="row">
                <div class="col-md-4 pe-0 me-0 d-flex justify-content-center">
                  <input class="form-control search-input" type="search" placeholder="Temukan services..." aria-label="Search" v-model="keywordSearch">
                  <button class="btn main-color btn-sm text-white me-4" @click.prevent="submitSearch()">Cari</button>
                </div>
                <div class="col-md-8 d-flex justify-content-center">
                  <button class="btn dropdown-toggle filter-and-sort-text" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ filterValue }}</button>
                  <ul class="dropdown-menu dropdown-menu-end">
                      <li v-for="servicesTypeData in servicesType.data" :key="servicesTypeData.id">
                          <a class="dropdown-item" href="#" @click="updateQueryFilter('serviceTypeId', servicesTypeData.id, servicesTypeData.name)">
                              {{ servicesTypeData.name }}
                          </a>
                      </li>
                  </ul>
                  <button class="btn dropdown-toggle filter-and-sort-text" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ sortValue }}</button>
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
                  <button type="button" class="btn main-color btn-sm text-white me-3" @click="submitQuery(tempQuery)">Terapkan</button>
                </div>
              </div>
            </div>
          </div>        
        </div>
        <div class="row container">
          <div v-if="errorMessage" class="mt-5">
            <ErrorHandling :message="errorMessage"/>
          </div>
          <div class="d-flex justify-content-center mt-5 text-secondary"  v-if="services && services.data && services.data.data.length < 1">
            <h5>Service tidak ditemukan</h5>
          </div>
        </div>        
        <!-- card type 1 not remove because there is stil option
          <div class="row container d-flex justify-content-center">
          <div v-if="services.data" v-for="service in services.data.data" :key="service.id" :to="{ name: 'Detail', params: { id: service.id } }" tag="div" class="card p-2 m-3 zoom shadow">
            <img src="https://www.apotek-k24.com/images/post/16777494720230211014631yunita.isnaciri-ciri%20pengusaha%20yang%20berhasil.jpg.webp" class="card-img-top" alt="Service Image">
            <div class="card-body">
              <h5 class="card-title">{{ service.name }}</h5>
              <p class="card-text">{{ service.rating }}</p>
              <button class="btn btn-primary main-color" @click="getDetail(service.id)">Detail</button>
            </div>
          </div>
        </div> -->
        <!-- card type 2 -->
        <div id="app" class="container">
          <div class="row mt-4">
            <div class="col-lg-2 col-6 mb-3" v-if="services.data" v-for="service in services.data.data" :key="service.id" :to="{ name: 'Detail', params: { id: service.id } }">
              <div class="card card-style zoom p-1 d-flex" @click="getDetail(service.id)">
                <img :src="service.imageUrl" class="card-img-top" alt="Service Image">
                <div class="card-body">
                  <div class="title-container">
                    <h5 class="card-title">{{ service.name }}</h5>
                  </div>
                  <p class="card-text">{{ service.serviceType.name }}</p>
                  <div class="star-review">
                    <i v-for="(, index) in starsPreReview" :key="index" 
                    :class="[index < service.rating ? 'bi-star-fill' : 'bi-star', 'me-2']"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="container d-flex justify-content-center mt-6 mb-5" v-if="services.data">
      <nav aria-label="...">
        <ul class="pagination" v-if="services.data.data.length > 0">
          <li class="page-item" :class="{'disabled': services.data.meta.previousPage == null}" @click="countPaginate('decrement')">
            <span class="page-link">Previous</span>
          </li>
          <li class="page-item" v-if="services.data.meta.previousPage !== null"><a class="page-link" href="#" @click="countPaginate('decrement')">{{ services.data.meta.previousPage }}</a></li>
          <li class="page-item active">
            <span class="page-link">
              {{ services.data.meta.currentPage }}
            </span>
          </li>
          <li class="page-item"><a class="page-link" href="#" @click="countPaginate('increment')" v-if="services.data.meta.nextPage !== null">{{ services.data.meta.nextPage }}</a></li>
          <li class="page-item">
            <a class="page-link" href="#" :class="{'disabled': services.data.meta.nextPage == null}" @click="countPaginate('increment')">Next</a>
          </li> 
        </ul>
      </nav>
    </div>
    <br>
    <br>
    <br>
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
  width: 10rem;
  text-decoration: none;
  height: 80%;
}

.zoom:hover {
  transform: scale(1.1);
  color: #10A8E5;
}

.main-color {
    background-color: #10A8E5;
}

.search-input {
  width: 200px;
}

.filter-icon {
  font-size: 30px;
}

.button-terapkan {
  height: 40px;
}

.card:hover {
  background-color: #10A8E5;
  color: white;
  cursor: pointer;
}

.card-style {
  height: 100%;
}

.card-title {
  width: 120px; 
}
.title-container {
  height: 90px;
}

.card-text {
  text-overflow: ellipsis;
  width: 110px;
  max-height: 50px;
  overflow: hidden;
  white-space: nowrap;
}

.bi-star-fill {
  color: 	#ffa534 !important;
}

.star-review {
  font-size: 15px;
}
.card-img-top {
  max-height: 88px
}
.filter-and-sort-text {
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  width: 100px; 
  border: 1px solid #ccc;
}

@media (max-width: 576px) {
  .card-style {
    width: auto;
  }
  .card-title {
    /* white-space: nowrap;  */
    overflow: hidden; 
    text-overflow: ellipsis;
    width: 100px; 
    /* border: 1px solid #ccc; */
  }
  .star-review {
    font-size: 10px;
  }
  .title-container {
    height: 120px;
  }
  .card-img-top {
    max-height: 85px
  }
}
</style>
