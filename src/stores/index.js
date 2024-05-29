import {ref, computed } from 'vue';
import { defineStore } from 'pinia';
import serviceValidation from '../services/serviceValidations'
import { useRoute } from 'vue-router'
const route = useRoute()

export const useStoreAPI = defineStore('getAPIService', () => {
    const services = ref(null)
    const servicesDetail = ref(null)
    const reviews = ref(null)

    async function getServicesData() {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/services`);
            // const response =  await fetch('data.json').then(response => response.json());
            const data = await response.json();
            services.value = data;
            return data
        } catch (error) {
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    }
    async function getServicesDetailData(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/services/${id}`);
            // const response =  await fetch('data.json').then(response => response.json());
            const data = await response.json();
            if (data.code == '404') {
                throw data
            }
            servicesDetail.value = data;
            
            return data
        } catch (error) {
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    }
    async function getReviewsData() {
        try {
            const response = await fetch('http://localhost:3000/reviews');
            // const response =  await fetch('data.json').then(response => response.json());

            const data = await response.json();
            reviews.value = data;
            return data
        } catch (error) {
            console.error('Error fetching data: ', error)
            return null
        }
    }
    async function getServicesDataSearch(keyword) {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/services?keyword=${keyword}`);
            // const response =  await fetch('data.json').then(response => response.json());
            const data = await response.json();
            services.value = data;
            return data
        } catch (error) {
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    }
    async function getServicesDataSortBy(query) {
        try {
            const key = Object.keys(query)[0];
            const value = query[key];
            const response = await fetch(`http://localhost:3000/api/v1/services?sortBy=${key}&sortingMethod=${value}`);
            // const response =  await fetch('data.json').then(response => response.json());
            const data = await response.json();
            services.value = data;
            return data
        } catch (error) {
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    }

    return {
        getServicesData,
        services,
        getServicesDetailData,
        servicesDetail,
        getReviewsData,
        reviews,
        getServicesDataSearch,
        getServicesDataSortBy
    }
})