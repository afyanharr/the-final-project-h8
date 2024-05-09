import {ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStoreAPI = defineStore('getAPIService', () => {
    const services = ref(null)
    const servicesDetail = ref(null)

    async function getServicesData() {
        try {
            const response = await fetch('http://localhost:3000/services');
            // const response =  await fetch('data.json').then(response => response.json());
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            services.value = data;
            return data
        } catch (error) {
            console.error('Error fetching data: ', error)
            return null
        }
    }
    async function getServicesDetailData() {
        try {
            const response = await fetch('http://localhost:3000/serviceDetail');
            // const response =  await fetch('data.json').then(response => response.json());
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            servicesDetail.value = data;
            return data
        } catch (error) {
            console.error('Error fetching data: ', error)
            return null
        }
    }

    return {
        getServicesData,
        services,
        getServicesDetailData,
        servicesDetail
    }
})