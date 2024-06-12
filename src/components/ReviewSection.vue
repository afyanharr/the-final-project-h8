<script setup>
import { ref, watch, onMounted } from 'vue';
import EditReview from '../components/EditReview.vue'
import { useHistoryStore } from '../stores/history';
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'; 
const useHistoryAPI = useHistoryStore();
const route = useRoute()
const router = useRouter()
const props = defineProps({
    starsPreReview: Array,
    servicesDetail: Object,
    serviceId: Object
})
const emit = defineEmits(['reInitData'])
const newData = ref(props.servicesDetail)
const reviewData = ref({})
const serviceId = ref(null)
const getUserId = localStorage.getItem('userId')
const scrollable = ref(null)
const page = ref(1)
// const currentPage = ref(newData.value.meta.currentPage)
// const lastPage = ref(newData.value.meta.lastPage)

watch(() => props.servicesDetail, (newValue) => {
    if (newValue) {
        newData.value = newValue;
    }
});

watch(() => props.serviceId, (newValue) => {
    if (newValue) {
        serviceId.value = newValue;
    }
});

const deleteComment = async (id) => {
    try {
        const response = await useHistoryAPI.deleteReview(id)
        if (response.code == 200) {
            Swal.fire({
                title: "Berhasil Menghapus review",
                text: response.message,
                icon: "success",
                timer: 2000
            });
            reInitData()
        }
    } catch (error) {
        throw error
    }
}

const reInitData = () => {
    emit('reInitData')
}

onMounted(() => {
})

const openEditModal = (data) => {
    reviewData.value = data
}

const handleScroll = async () => {
    // if (newData.value.data.reviews.length == props.servicesDetail.meta.total) {
    // if (props.servicesDetail.meta.currentPage == props.servicesDetail.meta.lastPage) {
       if (props.servicesDetail.meta.nextPage == null) {
        return
    } else {
        const el = scrollable.value;
        if (el.scrollHeight - el.clientHeight <= el.scrollTop) {           
            if (props.servicesDetail.meta.nextPage !== null) {
                page.value++
                router.push({query: {page: page.value}})
                emit('reInitData', {page: page.value, show: 10})
            } else {
                router.push({query: {page: page.value}})
                emit('reInitData', {page: page.value, show: newData.value.data.reviews.length})
            }

        }
    }
}
</script>

<template>
<div class="row mt-3" v-if="servicesDetail">
    <div class="col-md-6">
        <div class="mt-4">
            <p id="title-review">Apa Kata Mereka : </p>
        </div>
        <div class="container comment" ref="scrollable" @scroll="handleScroll">
            <div class="d-flex justify-content-center align-items-center mt-5 pt-5 fw-bolder" v-if="newData.data.reviews.length < 1">
                <p>Jadilah yang pertama berkomentar</p>
            </div>
            <div v-for="servicesDetail in newData.data.reviews" :key="servicesDetail.id">
                <div class="row mt-3 user-comment d-flex">
                    <div class="image-content">
                        <img :src="servicesDetail.user.imageUrl" alt="image dummy" class="mt-3 image-user">
                    </div>
                    <div class="row">
                        <b>{{ servicesDetail.user.username }}</b>
                        <div class="star-pre-review fs-2">
                            <i v-for="(, index) in props.starsPreReview" :key="index" 
                            :class="[index+1 <= servicesDetail.rating ? 'bi-star-fill' : 'bi-star', 'me-2']"
                            ></i>
                        </div>
                        <div class="description-comment">
                            <p clas="fw-lighter desc-comment">{{ servicesDetail.description }}</p>
                        </div>
                    </div>               
                </div>
                <div class="row action-section" v-if="servicesDetail.userId == getUserId">
                    <button type="button" class="button-edit" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="openEditModal(servicesDetail)">
                        <i class="bi bi-pen-fill text-primary content-button"></i>
                        <p class="content-button text-button">Edit Komentar</p>
                    </button>
                    <EditReview 
                        :reviewData="reviewData"
                        :starsPreReview="starsPreReview"
                        :services-detail="servicesDetail"
                        :serviceId="serviceId"
                        @reInitData="reInitData"
                    />
                    <button type="button" class="button-delete" data-bs-target="#exampleModal1" @click="deleteComment(servicesDetail.id, servicesDetail.userId)">
                        <i class="bi bi-trash-fill text-danger content-button content-button-icon"></i>
                        <p class="content-button text-button">Hapus komentar</p>
                    </button>
                </div>               
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.comment {
    overflow-y: scroll; 
    height:600px;
    /* background-color: #f0f0f0;
    padding: 20px; */
    border: 2px solid #333;
    /* /* box-shadow: 5px 5px; */
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

/* .edit-comment:hover {
    font-weight: 600;
    cursor: pointer;
}

.delete-comment:hover {
    font-weight: 600;
    cursor: pointer;
} */

.button-delete {
    width: 170px;
    height: 50px;
    padding: 0px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}

.button-edit {
    width: 170px;
    height: 50px;
    padding: 0px;
    background-color: white;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
}

.button-delete:hover {
    font-weight: 600;
    cursor: pointer;
    background-color: #dc3545;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white !important;
    border-color: white;
}

.button-edit:hover {
    font-weight: 600;
    cursor: pointer;
    background-color: #007bff;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white !important;
    border-color: white;
}

.action-section {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
}
.text-button {
    margin-top: 15px;
}
.content-button {
    padding-left: 2px;
    padding-right: 5px;
}
.content-button-icon:hover {
    color: #dc3545;
}

.button-delete:hover .bi-trash-fill {
    color: white !important;
}

.button-edit:hover .bi-pen-fill {
    color: white !important;
}
.user-comment {
    display: flex;
    flex-wrap: nowrap;
}

.image-content {
    width: 100px
}
.description-comment {
    max-width: 420px;
}
.image-user {
    width: 70px; 
    height: 70px; 
    border-radius: 50%; 
    object-fit: cover;
}
p {
    font-size: 16px;
}
#title-review {
    font-size: 20px;
}

@media (max-width: 576px) {
    .comment {
        overflow-y: scroll; 
        height:600px;
        /* background-color: #f0f0f0;
        padding: 20px; */
        border: 2px solid #333;
        /* /* box-shadow: 5px 5px; */
    }
    .profile-comment {
        display: flex;
        flex-direction: row;
    }
    .image-content {
        display: inline-block;
    }
    .description-comment {
        max-width: 250px;
    }
}
</style>