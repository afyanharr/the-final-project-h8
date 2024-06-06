import {ref, computed } from 'vue';
import { defineStore } from 'pinia';
import serviceValidation from '../services/serviceValidations'
import { useRoute } from 'vue-router'
import axios from 'axios';
const route = useRoute()

export const useStoreAPI = defineStore('getAPIService', () => {
    const services = ref(null)
    const servicesDetail = ref(null)
    const reviews = ref(null)

    const getServicesData = async (tempQuery) => {
        try {
            let url = `${import.meta.env.VITE_APP_DOMAIN}/services` 
            if (tempQuery){
                const reqQuery = new URLSearchParams(tempQuery).toString();
                url += `?${reqQuery}`
            } else {
                const reqQueryDeafult = new URLSearchParams({
                    page: 1,
                    show: 12
                }).toString()
                url += `?${reqQueryDeafult}`
            }

            const response = await axios.get(url);
            const data = response.data
            return data
        } catch (error) {
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    }
    const getServicesDetailData = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/services/${id}`);
            // const response =  await fetch('data.json').then(response => response.json());
            const data = response.data
            if (data.code !== 200) {
                throw data
            }
            return data
        } catch (error) {
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    }
    const getReviewsData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/reviews`);
            const data = response.data
            return data
        } catch (error) {
            console.error('Error fetching data: ', error)
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    }
    const getServicesDataSearch = async (keyword) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/services?keyword=${keyword}`);
            // const response =  await fetch('data.json').then(response => response.json());
            const data = await response.json();
            services.value = data;
            return data
        } catch (error) {
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    }
    const getServicesDataSortBy = async (query) => {
        try {
            const key = Object.keys(query)[0];
            const value = query[key];
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/services?sortBy=${key}&sortingMethod=${value}`);
            // const response =  await fetch('data.json').then(response => response.json());
            const data = await response.json();
            services.value = data;
            return data
        } catch (error) {
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    }

    const getServiceType = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/service-types/select`)
            const data = response.data
            return data
        } catch (error) {
            const errorMessageFunction = serviceValidation.getErrorMessage(error.message)
            throw errorMessageFunction
        }
    } 

    const getRelatedServices = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_DOMAIN}/services/${id}/related`)
            const data = response.data
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
        getServicesDataSortBy,
        getServiceType,
        getRelatedServices
    }
})