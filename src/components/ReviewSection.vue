<script setup>
import { ref, watch, onMounted } from 'vue';
import EditReview from '../components/EditReview.vue'
import { useHistoryStore } from '../stores/history';
import Swal from 'sweetalert2'
const useHistoryAPI = useHistoryStore();
const props = defineProps({
    starsPreReview: Array,
    servicesDetail: Object,
    serviceId: Object
})

const newData = ref(props.servicesDetail)
const reviewData = ref({})
const serviceId = ref(null)
const getUserId = localStorage.getItem('userId')

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
            emit('reInitData')
        }
    } catch (error) {
        throw error
    }
}

onMounted(() => {
})

const openEditModal = (data) => {
    reviewData.value = data
    // selectedReviewId.value = event.currentTarget.dataset.id
}
</script>

<template>
<div class="row mt-3" v-if="servicesDetail">
    <div class="col-md-6 ms-2 me-2">
        <div class="mt-4">
            <h5>Apa Kata Mereka : </h5>
        </div>
        <div class="container comment">
            <div class="row mt-3" v-for="servicesDetail in newData.data.reviews" :key="servicesDetail.id">
                <div class="col-md-2">
                    <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" class="mt-3" style ="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;">
                </div>
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-8">
                            <b>{{ servicesDetail.user.username }}</b>
                        </div>
                    </div>               
                    <div class="star-pre-review fs-2">
                        <i v-for="(, index) in props.starsPreReview" :key="index" 
                        :class="[index+1 <= servicesDetail.rating ? 'bi-star-fill' : 'bi-star', 'me-2']"
                        ></i>
                    </div>
                    <div class="row">
                        <p clas="fw-lighter">{{ servicesDetail.description }}</p>
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
                        />
                        <button type="button" class="button-delete" data-bs-toggle="modal" data-bs-target="#exampleModal1" @click="deleteComment(servicesDetail.id, servicesDetail.userId)">
                            <i class="bi bi-trash-fill text-danger content-button content-button-icon"></i>
                            <p class="content-button text-button">Hapus komentar</p>
                        </button>
                    </div>
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

</style>