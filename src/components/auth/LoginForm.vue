<template>
    <div>
        <v-row>
         <v-col cols="12">   
        <v-form @submit.prevent="Login" ref="loginForm" class="mt-5">
            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label>
            <VTextField v-model="email" :rules="emailrule" class="mb-8" required hide-details="auto"></VTextField>
            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Password</v-label>
            <VTextField v-model="password" :rules="passwordrule" required hide-details="auto" type="password" class="pwdInput"></VTextField>
            <div class="d-flex flex-wrap align-center my-3 ml-n2">
                <div class="ml-sm-auto">
                    <RouterLink to="/forgot-password" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                        >Forgot Password ?</RouterLink
                    >
                </div>
            </div>
            <v-btn size="large" color="primary" block type="submit" flat v-if="isLogin" disabled>Sign In</v-btn>
            <v-btn size="large" color="primary" v-if="!isLogin" block type="submit" flat>Sign In</v-btn>
        </v-form>
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" :top="'top'" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
         </v-col>
                </v-row>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import { baseURlApi } from '@/api/axios';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const { login } = useAuthStore();
const loginForm = ref('');

const { newpwd, emailrule, passwordrule } = formValidationsRules();

/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';

const checkbox = ref(false);
const isLogin = ref(false);
const show1 = ref(false);
const password = ref(newpwd);
const email = ref('');

const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(200005);
const isSnackbar = ref(false);

async function Login() {
    const { valid } = await loginForm.value?.validate();
    const requestBody = {
        email: email.value,
        password: password.value
    };
    // baseURlApi
    //     .post('/login', requestBody)
    if (valid) {
        isLogin.value = true;
        login(requestBody)
            .then((res) => {
                message.value = res.data.message;
                console.log("res",res)
                loginForm.value?.reset();
                loginForm.value?.resetValidation();
                isSnackbar.value = true;
                isLogin.value = false;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
                localStorage.setItem('auth-token', res.data.data.access_token);
                localStorage.setItem('user', JSON.stringify(res.data.data.user));
                router.push(location.search.substr(1).split('redirect=')[1] || '/dashboard');
            })
            .catch((error) => {
                loginForm.value?.reset();
                loginForm.value?.resetValidation();
                isLogin.value = false;
                isSnackbar.value = true;
                message.value = error.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
</script>
