<script setup>
import NavbarAuth from '../components/NavbarAuth.vue';
import CardHistory from '../components/CardHistory.vue';
import { useHistoryStore } from '../stores/history';
import { useStoreAPI } from '../stores/index';
import { ref, onMounted, onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const getAPIHistory = useHistoryStore();
const getAPIService = useStoreAPI();
const getId = localStorage.getItem('userId')
const reviews = ref({});
const currentPagination = ref(parseInt(route.query.page))
const sortValue1 = ref('')
const sortValue2 = ref('')
const sortValue = ref('Urutkan')
const tempQuery = ref({})
const keywordSearch = ref('')
const servicesType = ref([])

const fetchData =  async () => {
    reviews.value = await getAPIHistory.getReviews(getId)
    servicesType.value = await getAPIService.getServiceType()
}

const updateQuerySort = (value1, value2, label) => {
  sortValue1.value = value1
  sortValue2.value = value2
  sortValue.value = label
  const sortValue11 = 'sortBy'
  const sortValue22 = 'sortingMethod'
  tempQuery.value = { ...tempQuery.value, [sortValue11]: value1, [sortValue22]: value2, ['page']: currentPagination.value, ['show']: 12}
  
}

const submitSearch = async () => {
  tempQuery.value = { ...tempQuery.value, ['keyword']: keywordSearch.value, ['page']: currentPagination, ['show']: 12}
  await router.push({query: { ...tempQuery.value }})
  tempQuery.value = {}
  fetchData()
}

const submitQuery = async (tempQueryParams) => {
  router.push({ query: { ...tempQuery.value }})
  tempQuery.value = {}
  fetchData()
}

const countPaginate = async (params) => {
    try {
        if (params == 'increment') {
            currentPagination.value++;
        } else if (params == 'decrement') {
            currentPagination.value = Math.max(currentPagination.value - 1, 1);
        }
        const tempQuery = { page: currentPagination.value, show: 12 };
        await router.push({ name: 'History', query: tempQuery });
        fetchData()
    } catch (error) {
        console.log('Error fetching data', error);
    }
};

onMounted(async () => {
    await fetchData();
});
</script>

<template>
    <NavbarAuth/>
    <div class="container-fluid history-page">
        <div class="container">
            <h4 class="d-flex justify-content-center mt-5 mb-3">Riwayat ulasanmu ada disini</h4>
            <div class="row container d-flex up-content justify-content-end">
                <div class="col-md-4 pe-0 me-0 mb-2 d-flex justify-content-end up-content-item">
                    <input class="form-control search-input" type="search" placeholder="Temukan riwayat komentar..." aria-label="Search" v-model="keywordSearch">
                    <button class="btn main-color btn-sm text-white me-4" @click.prevent="submitSearch()">Cari</button>
                </div>
                <div class="d-flex justify-content-end up-content-item">
                    <button class="btn dropdown-toggle filter-and-sort-text" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ sortValue }}</button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('rating', 'asc' , 'Rating Tertinggi')" >Rating Tertinggi</a></li>
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('rating', 'desc', 'Rating Terendah')" >Rating Terendah</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('updatedAt', 'asc', 'Terbaru')" >Terbaru</a></li>
                        <li><a class="dropdown-item" href="#" @click="updateQuerySort('createdAt', 'asc', 'Terlama')" >Terlama</a></li>
                    </ul>   
                    <button type="button" class="btn main-color btn-sm text-white me-3" @click="submitQuery(tempQuery)">Terapkan</button>
                </div>
                <!-- <div>
                    <button class="btn dropdown-toggle filter-and-sort-text" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ filterValue }}</button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li v-for="servicesTypeData in servicesType.data" :key="servicesTypeData.id">
                            <a class="dropdown-item" href="#" @click="updateQueryFilter('serviceTypeId', servicesTypeData.id, servicesTypeData.name)">
                                {{ servicesTypeData.name }}
                            </a>
                        </li>
                    </ul>
                </div> -->
            </div>
            <div class="d-flex justify-content-center mt-5" v-if="reviews.data">
                <div class="d-flex justify-content-center" v-if="reviews.data.data.reviews.length < 1">
                    <p class="fw-bolder">Tidak ada Data</p>
                </div>
            </div>
            <CardHistory
                :reviews="reviews.data"
            />
        </div>
        <div class="container d-flex justify-content-center mt-6 pt-5 mb-5" v-if="reviews.data">
        <nav aria-label="...">
            <ul class="pagination" v-if="reviews.data.meta.total !== 0">
                <li class="page-item" :class="{'disabled': reviews.data.meta.previousPage == null}" @click="countPaginate('decrement')">
                    <span class="page-link">Previous</span>
                </li>
                <li class="page-item" v-if="reviews.data.meta.previousPage !== null"><a class="page-link" href="#" @click="countPaginate('decrement')">{{ reviews.data.meta.previousPage }}</a></li>
                <li class="page-item active">
                    <span class="page-link">
                        {{ reviews.data.meta.currentPage }}
                    </span>
                </li>
                <li class="page-item"><a class="page-link" href="#" @click="countPaginate('increment')" v-if="reviews.data.meta.nextPage !== null">{{ reviews.data.meta.nextPage }}</a></li>
                <li class="page-item">
                    <a class="page-link" href="#"  :class="{'disabled': reviews.data.meta.nextPage == null}" @click="countPaginate('increment')">Next</a>
                </li> 
            </ul>
        </nav>
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

.filter-and-sort-text {
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  border: 1px solid #ccc;
}
@media (max-width: 576px) {
    .history-page {
        height: 844px;
    }
}
</style>


