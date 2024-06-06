
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
        path: '/services/:id',
        name: 'Detail',
        component: () => import('../view/DetailPage.vue')
    },
    {
        path: '/users/:id/reviews',
        name: 'History',
        component: () => import('../view/HistoryPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) =>  {
    const isAuthenticated = localStorage.getItem('token');
    if (to.name === 'Login' && isAuthenticated) {
        next({name: 'Services'});
    } else if (to.name === 'History' && !isAuthenticated) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router