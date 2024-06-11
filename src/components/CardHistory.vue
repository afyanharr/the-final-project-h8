<script setup>
import { ref,} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
    reviews: Array,
})

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

const getDetail = (id) => {
    router.push({ name: 'Detail', params: { id: id }})
}
</script>

<template>
<div class="row" v-if="reviews">
    <div class="col-md-4"  v-for="listReviews in reviews.data.reviews" :key="listReviews.id">
        <div class="card mt-2 p-1 history-card">
            <div class="card-body" @click="getDetail(listReviews.serviceId)">
                <div class="row">
                    <div class="row">
                        <div class="">
                            <p class="card-title">Anda berkomentar pada {{ listReviews.services.name }}</p>
                            <!-- <i class="bi bi-star-fill stars-text"></i> -->
                            <div class="star-pre-review fs-2">
                                <i v-for="(, index) in starsPreReview" :key="index" 
                                :class="[index+1 <= listReviews.rating ? 'bi-star-fill' : 'bi-star', 'me-2']"
                                ></i>
                            </div>
                            <p class="card-text-history">{{ listReviews.description }}</p>
                            <!-- <router-link :to="{ name: 'Detail' , params : {id : listReviews.service }}" tag="nav-link" class="nav-link active d-flex justify-content-end">
                                lihat
                            </router-link> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.history-card {
    padding: 50px;
    transition: transform .1s;
    margin: 0 auto;
}

.history-card:hover {
    transform: scale(1.01);
    color: #10A8E5;
    border-color: #10A8E5;
    background-color: #10A8E5;
    color: white !important;
    font-weight: bold;
}

.bi-star-fill {
    color: 	#ffa534 !important;
}
.card {
    height: 220px
}
.card-text-history {
    /* height: 20px;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

</style>