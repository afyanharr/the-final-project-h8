import { defineStore } from "pinia";
import axios from 'axios'
import { useRoute } from "vue-router";


export const useHistoryStore = defineStore('historyStore', () => {
    const getToken = localStorage.getItem('token')
    const route = useRoute()
    const getReviews = async (id) => {
        try {
            const getReqQuery = route.query
            let url = `${import.meta.env.VITE_APP_DOMAIN}/users/${id}/reviews`
            if (getReqQuery) {
                const reqQuery = new URLSearchParams(getReqQuery).toString();
                url +=`?${reqQuery}`
            }
            const response = await axios.get(url, {
                headers : {
                    'Authorization' : `Bearer ${getToken}`
                }
            })
            const data = response.data
            return data
        } catch (error) {
            console.log('Error fetching data', error)
            throw error
        }
    };
    const submitReview = async (payload) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_DOMAIN}/reviews`, payload, {
                headers : {
                    'Authorization' : `Bearer ${getToken}`
                }
            })
            const data = response.data
            return data
        } catch (error) {
            throw error
        }
    }
    const editReview = async (id, payload) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_APP_DOMAIN}/reviews/${id}`, payload, {
                headers : {
                    'Authorization' : `Bearer ${getToken}`
                }
            })
            const data = response.data
            return data
        } catch (error) {
            throw error
        }
    }

    const deleteReview = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_APP_DOMAIN}/reviews/${id}`, {
                headers : {
                    'Authorization' : `Bearer ${getToken}`
                }
            })
            const data = response.data
            return data
        } catch (error) {
            throw error
        }
    }
    return {
        getReviews,
        submitReview,
        editReview,
        deleteReview
    }
})