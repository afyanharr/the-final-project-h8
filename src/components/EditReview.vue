<script setup>
import { ref, watch } from 'vue';
import { useHistoryStore } from '../stores/history';
import Swal from 'sweetalert2';
import { useStoreAPI } from '../stores';

const useHistoryAPI = useHistoryStore();
const getAPIService = useStoreAPI();

const props = defineProps({
    reviewData: Object,
    servicesDetail: Object
});

const emit = defineEmits(['reInitData'])

const starsPreReview = ref([
    { active: false, value: 1 },
    { active: false, value: 2 },
    { active: false, value: 3 },
    { active: false, value: 4 },
    { active: false, value: 5 }
]);

const newDesc = ref(props.reviewData ? props.reviewData.description : '');
const newRate = ref(props.reviewData ? props.reviewData.rating : 0);
const finalValue = ref(null)
watch(() => props.reviewData, (newValue) => {
    if (newValue && newValue.description && newValue.rating) {
        newDesc.value = newValue.description;
        newRate.value = newValue.rating;
        updateStarsPreReview();
    }
});

const starsClick = (index) => {
    // let finalValue = null;
    for (let i = 0; i <= index; i++) {
        starsPreReview.value[i].active = true;
        finalValue.value = starsPreReview.value[i].value;
    }
    for (let i = index + 1; i <= 4; i++) {
        starsPreReview.value[i].active = false;
    }
    newRate.value = finalValue.value;
};

const resetValue = () => {
  newDesc.value = props.reviewData ? props.reviewData.rating : 0
  for (let i = 0; i < starsPreReview.value.length; i++) {
    starsPreReview.value[i].active = false
  }
}

const updateStarsPreReview = () => {
    for (let i = 0; i < newRate.value; i++) {
        starsPreReview.value[i].active = true;
        finalValue.value = starsPreReview.value[i].value;
    }
    for (let i = newRate.value; i <= 4; i++) {
        starsPreReview.value[i].active = false;
    }
    newRate.value = finalValue.value;
};

const updateReview = async () => {
    try {
        const payload = {
          // id: props.reviewData.id,
          userId: localStorage.getItem('userId'),
          serviceId: props.servicesDetail.serviceId,
          description: newDesc.value,
          rating: newRate.value,
        };
        const reviewId = props.servicesDetail.id;
        const response = await useHistoryAPI.editReview(props.reviewData.id, payload);
        if (response.code === 200) {
            Swal.fire({
                title: "Berhasil Update Review",
                text: response.message,
                icon: "success",
                timer: 2000
            });
            emit('reInitData')
        } else {
            Swal.fire({
                title: "Terjadi kesalahan",
                text: response.message,
                icon: "error",
                timer: 2000
            });
        }
    } catch (error) {
      throw error;
    }
};

const submitReview = () => {
    updateReview();
};
</script>

<template>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Ubah Komentar</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetValue()"></button>
      </div>
      <div class="modal-body">
        <div class="star-pre-review fs-2">
            <i v-for="(star, index) in starsPreReview" :key="index" 
            :class="[star.active ? 'bi-star-fill' : 'bi-star', 'me-2']"
            @click="starsClick(index)"></i>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Rating</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="newDesc"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="submitReview">Update review</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.bi-star-fill {
    color: 	#ffa534 !important;
}
</style>