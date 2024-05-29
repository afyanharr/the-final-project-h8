<script setup>

const props = defineProps({
    message: String,
    isSuccessLogin: Boolean
});
</script>

<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Notifikasi</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" v-if="!isSuccessLogin">
                <i class="bi bi-exclamation-triangle-fill d-flex justify-content-center error-text icon-size"></i>
                <p class="pt-2 d-flex justify-content-center">{{ message }}</p>
            </div>
            <div class="modal-body" v-else>
                <i class="bi bi-check-circle-fill d-flex justify-content-center success-text icon-size"></i>
                <p class="pt-2 d-flex justify-content-center">{{ message }}</p>
            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div> -->
            </div>
        </div>
    </div>
</template>

<style>
.error-text {
    color: #ef5859;
}
.success-text {
    color: #3cb879;
}
.icon-size {
    font-size: 100px;
}
</style>