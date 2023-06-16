import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuthStore } from '@/stores/auth';

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/authentication/Error.vue')
        },
        MainRoutes,
        AuthRoutes
    ]
});

router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login'];
    const auth = useAuthStore();
    const authRequired = !publicPages.includes(to.path);

    if (auth.user && publicPages.includes(to.path || to.fullPath)) {
        return next('/tickets');
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (authRequired) {
            if (!auth.user) {
                auth.returnUrl = to.fullPath;
                return next('/login?redirect=' + to.fullPath);
            } else {
                return next();
            }
        } else {
            return next('/tickets');
        }
    } else {
        return auth.user ? next('/tickets') : next();
    }
});
