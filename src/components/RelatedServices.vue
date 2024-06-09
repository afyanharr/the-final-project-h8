<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useStoreAPI } from '../stores/index';
const getAPIService = useStoreAPI();
const router = useRouter()
const route = useRoute()
const props = defineProps({
    servicesRelated : Object
})
const emit = defineEmits(['reInitData'])
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
        servicesDetail.value = await getAPIService.getServicesDetailData(route.params.id)
        servicesRelated.value = await getAPIService.getRelatedServices(servicesDetail.value.data.data.serviceTypeId)
    } catch (error) {
        // errorMessage.value = 'Service Tidak ditemukan'
    }
};

onMounted(async () => {
    await fetchData();
});

const getDetail = async (id) => {
    await router.push({ name: 'Detail', params: { id: id }})
    emit('reInitData')
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
    <div class="row mt-5">
        <div class="container">
            <div class="row">
                <h3>Layanan Serupa</h3>
            </div>
            <div class="row content" v-if="servicesRelated">
                <div class="card p-2 m-3 zoom shadow" v-for="relatedService in servicesRelated.data" :key="relatedService.id" :to="{ name: 'Detail', params: { id: relatedService.id } }"  @click="getDetail(relatedService.id)">
                <img :src="relatedService.imageUrl" class="card-img-top" alt="Service Image">
                <div class="card-body">
                    <div class="title-container">
                        <h5 class="card-title">{{ relatedService.name }}</h5>
                    </div>
                    <div class="star-review">
                    <i v-for="(, index) in starsPreReview" :key="index" 
                    :class="[index < relatedService.rating ? 'bi-star-fill' : 'bi-star', 'me-2']"
                    ></i>
                    </div>
                </div>
            </div>
            </div>
            <div class="row"></div>
        </div>
    </div>
</template>

<style>
* {
    font-family: "Roboto";
}

.main-color {
    background-color: #10A8E5;
}

.card-title {
  overflow: hidden; 
  /* text-overflow: ellipsis; */
  width: 150px; 
  /* border: 1px solid #ccc; */
}

.card-text {
  overflow: hidden;
  /* text-overflow: ellipsis; */
  width: 150px; 
}

.zoom {
  transition: transform .1s;
  width: 12rem; 
  text-decoration: none;
}

.zoom:hover {
  transform: scale(1.1);
  color: white;
  cursor: pointer;
  background-color: #10A8E5;
}

.bi-star-fill {
  color: 	#ffa534 !important;
}

.title-container {
  height: 90px;
}

.card-img-top {
  max-height: 90px
}

@media (max-width: 576px) {
    .content {
        justify-content: center;
    }
    .zoom {
        transition: transform .1s;
        width: 10rem; 
        text-decoration: none;
    }
    .card-title {
        overflow: hidden; 
        width: 100px; 
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