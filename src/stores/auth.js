import { defineStore } from "pinia";
import axios from 'axios'


export const useAuthStore = defineStore('authStore', () => {
    const register = async (payload) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/register', payload)
            const data = response.data
            return data
        } catch (error) {
            throw error
        }
    }

    const login = async (payload) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/login', payload)
            const data = response.data
            return data
        } catch (error) {
            throw error
        }
    }

    return {
        register,
        login
    }
})