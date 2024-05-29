<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { defineEmits } from 'vue';
const emit = defineEmits(['catchDescAndRating']);
const props = defineProps({
    reviewDataInit: Object,
    starsPreReview: Array
})

const reviewData = ref({
    description: null,
    rating: null
})

const starsClick = (index) => {
    let finalValue = null
    for (let i = 0; i <= index; i++) {
        props.starsPreReview[i].active = true;
        finalValue = props.starsPreReview[i].value
    }
    for (let i = index+1; i <=4; i++) {
        props.starsPreReview[i].active = false;
    }
    reviewData.value.rating = finalValue
}

const sendDataReviewToParent = () => {
    emit('catchDescAndRating', reviewData)
}
</script>

<template>
<div class="row mt-3">
    <div class="col-md-9 pe-0 me-0">
        <textarea id="w3review" name="w3review" rows="4" cols="50" v-model="reviewData.description"></textarea>
    </div>
    <div class="col-md-3 ps-0">
        <button 
        class="btn btn-primary btn-lg btn-block mt-4 ms-5 main-color" 
        :class="{'disabled-button' : !reviewData.rating || !reviewData.description }"
        @click="sendDataReviewToParent">Kirim</button>
    </div>
    <div class="star-pre-review fs-2">
        <i v-for="(star, index) in starsPreReview" :key="index" 
        :class="[star.active ? 'bi-star-fill' : 'bi-star', 'me-2']"
        @click="starsClick(index)"></i>
    </div>
</div>
</template>

<style scoped>
.comment {
    overflow-y: scroll; 
    height:400px;
}

.disabled-button {
    opacity: 0.6 !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
}

.bi-star-fill {
    color: 	#ffa534 !important;
}

</style>