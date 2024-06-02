<script setup>
import { ref } from 'vue';
const emit = defineEmits(['catchDescAndRating']);
const props = defineProps({
    reviewDataInit: Object,
    starsPreReview: Array,
})

const alertFlagging = ref(false)
const reviewData = ref({
    description: null,
    rating: null,
})

if (!reviewData.value.description || !reviewData.value.rating) {
    alertFlagging.value = !alertFlagging.value
}

const starsClick = (index) => {
    if (!reviewData.value.description || !reviewData.value.rating) {
        alertFlagging.value = !alertFlagging.value
    }
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
<div class="row mt-3 ms-3 me-3 box-comment">
    <div class="row">
        <h5>Berikan Ulasanmu</h5>
    </div>
    <div class="row">
        <textarea id="w3review" name="w3review" rows="4" cols="50" v-model="reviewData.description"></textarea>
    </div>
    <div class="row">
        <div v-if="alertFlagging">
            <p class="text-danger">*harap isi komentar dengan rating</p>
        </div>
        <div class="star-and-button ps-0 pe-0 mt-3">
            <h5 id="rating-text">Rating : </h5>
            <div class="star-pre-review fs-2" id="stars-button">
                <i v-for="(star, index) in starsPreReview" :key="index" 
                :class="[star.active ? 'bi-star-fill' : 'bi-star', 'me-2']"
                @click="starsClick(index)"></i>
            </div>

            <button 
            class="btn" 
            id="button-style"
            :class="{'disabled-button' : !reviewData.rating || !reviewData.description }"
            @click="sendDataReviewToParent">
            <i class="bi bi-send-fill"></i>
            </button>
        </div> 
    </div>
</div>
</template>

<style scoped>

#button-style {
    background-color: #10A8E5;
    color: white;
    width: 100px;
}

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

#w3review {
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
}

.star-and-button {
    display: flex;
    justify-content: end;
}

#stars-button {
    margin-right: 30px;
}

.box-comment {
    background-color: #f0f0f0; /* You can replace #f0f0f0 with any color code or color name */
    padding: 20px;
    border-radius: 15px;
}

#rating-text {
    margin-top: 12px;
    margin-right: 12px;
}
</style>