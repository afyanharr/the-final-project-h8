<script setup>
import NavbarAuth from '../components/NavbarAuth.vue'
import ErrorHandling from '../components/ErrorHandling.vue';
import InformationSection from '../components/InformationSection.vue';
import FormSection from '../components/FormSection.vue';
import ReviewSection from '../components/ReviewSection.vue';
import RelatedServices from '../components/RelatedServices.vue'
import { useStoreAPI } from '../stores/index';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'; 
import { useHistoryStore } from '../stores/history';
import Swal from 'sweetalert2'

const getAPIService = useStoreAPI();
const useHistoryAPI = useHistoryStore();
const servicesDetail = ref({});
const servicesRelated = ref( null);
const route = useRoute()
const router = useRouter()
const errorMessage = ref(null)
const getUserId = localStorage.getItem('userId')

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
const reviewDataInit = ref({
    userId: localStorage.getItem('userId'),
    serviceId: route.params.id,
    rating: null,
    description: null,
})

const submitReview = async (data) => {
    try {
        if(!getUserId) {
            Swal.fire({
                title: "Kamu belum login?",
                text: "Login dulu yuk untuk berkomentar",
                icon: "question",
            });
            router.push({name: 'Login'})
        }
        reviewDataInit.value.rating =  data.value.rating
        reviewDataInit.value.description = data.value.description
        const payload = {
            userId: reviewDataInit.value.userId,
            serviceId: reviewDataInit.value.serviceId,
            rating: reviewDataInit.value.rating,
            description: reviewDataInit.value.description
        }
        const response = await useHistoryAPI.submitReview(payload)
        if (response.code == 201) {
            Swal.fire({
                title: "Berhasil Memberikan Review",
                text: response.message,
                icon: "success",
                timer: 2000
            });
            await fetchData();
            reviewDataInit.value.rating =  null
            reviewDataInit.value.description = null
        } else {
            Swal.fire({
                title: "Terjadi kesalahan",
                text: response.message,
                icon: "error",
                timer: 2000
            });
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

const fetchData = async () =>  {
    try {
        servicesDetail.value = await getAPIService.getServicesDetailData(route.params.id)
        servicesRelated.value = await getAPIService.getRelatedServices(route.params.id)
    } catch (error) {
        errorMessage.value = 'Service Tidak ditemukan'
    }
};

onMounted(async () => {
    await fetchData();
});

</script>

<template>
<NavbarAuth />
<div v-if="errorMessage" class="mt-5">
    <ErrorHandling :message="errorMessage"/>
</div>
<div class="container" v-else>
    <div class ="row mt-5" v-if="servicesDetail.data">
        <div class="col-md-6">
            <div class="row">
                <img :src="servicesDetail.data.data.images[0].imageUrl" alt="main image" id="main-image" class="ps-3 pe-3">
            </div>
            <div class="row justify-content-around ps-2 pe-">
                <div class="col-md-3 ps-0 pe-0 pt-3 pb-0 d-flex justify-content-center">
                    <img :src="servicesDetail.data.data.images[1].imageUrl" alt="child image" class="child-image d-flex justify-content-center">
                </div>
                <div class="col-md-3 ps-0 pe-0 pt-3 pb-0 d-flex justify-content-center">
                    <img :src="servicesDetail.data.data.images[2].imageUrl" alt="child image" class="child-image d-flex justify-content-center">
                </div>
                <div class="col-md-3 ps-0 pe-0 pt-3 pb-0 d-flex justify-content-center">
                    <img :src="servicesDetail.data.data.images[3].imageUrl" alt="child image" class="child-image d-flex justify-content-center">
                </div>
            </div>
        </div>
        <InformationSection :services-detail="servicesDetail.data" />
    </div>
    <div class="row mt-5">
        <div class="col-md-6">
            <FormSection 
                :starsPreReview="starsPreReview"
                @catchDescAndRating="submitReview"
            />
        </div>
    </div>
    <ReviewSection 
        :services-detail="servicesDetail.data"
        :starsPreReview="starsPreReview"
        :serviceId="servicesDetail.data"
        @updatetrigger="fetchData"
        @reInitData="fetchData"
    />
    <relatedServices 
        :servicesRelated = servicesRelated
        @reInitData="fetchData"
    />
    <br>
    <br>
    <br>
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

.comment {
    overflow-y: scroll; 
    height:400px;
}

/* .bi {
    margin-right: 5px; 
    font-size: 50px;
} */


.card-title {
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis;
  width: 150px; 
  /* border: 1px solid #ccc; */
}

.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px; 
}

.bi-star-fill {
    color: 	#ffa534 !important;
}
.disabled-button {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
}

.edit-comment:hover {
    font-weight: 600;
    cursor: pointer;
}

.delete-comment:hover {
    font-weight: 600;
    cursor: pointer;
}

/* #main-image {
    border-radius: 20px;
} */

.child-image {
    width: 180px;
    height: auto;
}

.zoom:hover {
  transform: scale(1.1);
  color: #10A8E5;
}

@media (max-width: 576px) {
    .child-image {
        width: 50px;
        height: auto;
    }
    .child-image {
        width: 220px;
        height: auto;
    }

}


</style>

