<script setup>
import NavbarAuth from '../components/NavbarAuth.vue'
import ErrorHandling from '../components/ErrorHandling.vue';
import InformationSection from '../components/InformationSection.vue';
import FormSection from '../components/FormSection.vue';
import ReviewSection from '../components/ReviewSection.vue';
import { useStoreAPI } from '../stores/index';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'; 
import { useHistoryStore } from '../stores/history';
import Swal from 'sweetalert2'

const getAPIService = useStoreAPI();
const useHistoryAPI = useHistoryStore();
const servicesDetail = ref({});
const route = useRoute()
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
                icon: "success"
            });
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}
async function fetchData() {
    try {
        servicesDetail.value = await getAPIService.getServicesDetailData(route.params.id)
    } catch (error) {
        errorMessage.value = error
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
    <div class ="row mt-5" >
        <div class="col-md-6">
            <div class="row">
                <img src="https://www.apotek-k24.com/images/post/16777494720230211014631yunita.isnaciri-ciri%20pengusaha%20yang%20berhasil.jpg.webp" alt="image dummy" style ="width: 650px;">
            </div>
            <div class="row d-flex justify-content-evenly">
                <div class="col-md-3 p-3">
                    <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" style ="width: 150px;">
                </div>
                <div class="col-md-3 p-3">
                    <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" style ="width: 150px;">
                </div>
                <div class="col-md-3 p-3">
                    <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" style ="width: 150px;">
                </div>
            </div>
        </div>
        <InformationSection :services-detail="servicesDetail" />
    </div>
    <div class="row mt-5">
        <div class="col-md-6">
            <div class="row">
                <h5>Berikan Ulasanmu</h5>
            </div>
            <FormSection 
                :starsPreReview="starsPreReview"
                @catchDescAndRating="submitReview"
            />
        </div>
    </div>
    <ReviewSection 
        :services-detail="servicesDetail"
        :starsPreReview="starsPreReview"
    />
    <div class="row mt-5">
        <div class="container">
            <div class="row">
                <h3>Layanan Terkait</h3>
            </div>
            <!-- <div class="row">
                <router-link v-for="relatedService in servicesDetail.relatedServices" :key="relatedService.id" :to="{ name: 'Detail', params: { id: relatedService.id } }" tag="div" class="card p-2 m-3 zoom shadow" style="width: 12rem; text-decoration: none;">
                <img :src="relatedService.image" class="card-img-top" alt="Service Image">
                <div class="card-body">
                    <h5 class="card-title">{{ relatedService.name }}</h5>
                    <p class="card-text">{{ relatedService.address }}</p>
                    <router-link :to="{ name: 'Detail' }" tag="button" class="btn btn-primary main-color">
                        Detail
                    </router-link>
                </div>
                </router-link>
            </div> -->
            <div class="row"></div>
        </div>
    </div>
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
</style>

