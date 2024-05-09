
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: '',
        component: () => import('../view/LoginPage.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../view/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../view/RegisterPage.vue')
    },
    {
        path: '/services',
        name: 'Services',
        component: () => import('../view/HomePage.vue')
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import('../view/DetailPage.vue')
    },
    {
        path: '/history',
        name: 'History',
        component: () => import('../view/HistoryPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router