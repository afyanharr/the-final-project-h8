import { defineStore } from "pinia";
import axios from 'axios'


export const useHistoryStore = defineStore('historyStore', () => {
    const getToken = localStorage.getItem('token')
    const getReviews = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/users/${id}/reviews`, {
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
            const response = await axios.post(`http://localhost:3000/api/v1/reviews`, payload, {
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
    }
    const editReview = async (id, payload) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/reviews/${id}`, payload, {
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
            const response = await axios.delete(`http://localhost:3000/api/v1/reviews/${id}`, {
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