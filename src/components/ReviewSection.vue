<script setup>
import { ref } from 'vue';
import { useHistoryStore } from '../stores/history';
import Swal from 'sweetalert2'
const useHistoryAPI = useHistoryStore();
const props = defineProps({
    starsPreReview: Array,
    servicesDetail: Object
})
const getUserId = localStorage.getItem('userId')

const deleteComment = async (id) => {
    try {
        const response = await useHistoryAPI.editReview(id)
        if (response.code == 200) {
            Swal.fire({
                title: "Berhasil Menghapus review",
                text: response.message,
                icon: "success"
            });
        }
    } catch (error) {
        throw error
    }
}

const showModal = () => {
    $('#exampleModal').modal('show')
}
</script>

<template>
<div class="row mt-3" v-if="servicesDetail.data">
    <div class="col-md-6">
        <div class="container comment">
            <div class="row mt-5" v-for="servicesDetail in servicesDetail.data.reviews" :key="servicesDetail.id">
                <div class="col-md-2">
                    <img src="https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip" alt="image dummy" class="mt-3" style ="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;">
                </div>
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-8">
                            <b>{{ servicesDetail.user.username }}</b>
                        </div>
                        <div class="col-md-4">
                            <i class="bi bi-three-dots-vertical d-flex justify-content-end" @click="dropdownReview"></i>
                        </div>
                    </div>
                    
                    <div class="star-pre-review fs-2">
                        <i v-for="(, index) in props.starsPreReview" :key="index" 
                        :class="[index < servicesDetail.rating ? 'bi-star-fill' : 'bi-star', 'me-2']"
                        ></i>
                    </div>
                    <div class="row">
                        <p clas="fw-lighter">{{ servicesDetail.description }}</p>
                    </div>
                    <div class="row" style="display: flex; align-items: center;" v-if="servicesDetail.userId == getUserId">
                        <div class="edit-comment" @click="showModal">
                            <i class="bi bi-pen-fill text-primary"></i>
                            <p>Edit Komentar</p>
                        </div>
                        <div class="delete-comment" @click="deleteComment(servicesDetail.id, servicesDetail.userId)">
                            <i class="bi bi-trash3-fill text-danger"></i>
                            <p>Hapus komentar</p>
                        </div>
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