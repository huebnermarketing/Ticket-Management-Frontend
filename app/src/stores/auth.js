import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import {baseURlApi} from '@/api/axios'
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: null,
        returnUrl: null
    }),
    actions: {
         async login(body) {
            // const {data} = await baseURlApi.post(`${baseUrl}/login`, body);
            const data =  await baseURlApi.post(`${baseUrl}/auth/login?permission=user-auth`, body);
            console.log("dttdd",data)
            // update pinia state
            this.user = data.data;
            
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(this.user));
            localStorage.setItem('auth-token', data.data.access_token);    
            return Promise.resolve(data)
            // redirect to previous url or default to home page
            // router.push('/dashboard');
        },
       async logout() {
            const auth_token = localStorage.getItem('auth-token');
            const headers = { 'Authorization': `Bearer ${auth_token}` };
            const data = await baseURlApi.post(`${baseUrl}/auth/logout`,{},{headers});
            
            return Promise.resolve(data)
        }
    }
});
