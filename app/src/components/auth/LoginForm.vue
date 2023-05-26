<template>
    <div>
        <v-row class="d-flex mb-3">
            <v-col cols="6" sm="6">
                <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                    <img :src="google" height="16" class="mr-2" alt="google" />
                    <span class="d-sm-flex d-none mr-1">Sign in with</span>Google
                </v-btn>
            </v-col>
            <v-col cols="6" sm="6">
                <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                    <img :src="facebook" width="25" height="25" class="mr-1" alt="facebook" />
                    <span class="d-sm-flex d-none mr-1">Sign in with</span>FB
                </v-btn>
            </v-col>
        </v-row>
        <Form @submit="Login" v-slot="{ errors, isSubmitting }" class="mt-5">
            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Username</v-label>
            <VTextField v-model="email" :rules="emailRules" class="mb-8" required hide-details="auto"></VTextField>
            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Password</v-label>
            <VTextField
                v-model="password"
                :rules="passwordRules"
                required
                hide-details="auto"
                type="password"
                class="pwdInput"
            ></VTextField>
            <div class="d-flex flex-wrap align-center my-3 ml-n2">
                <div class="ml-sm-auto">
                    <RouterLink to="/forgot-password" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                        >Forgot Password ?</RouterLink
                    >
                </div>
            </div>
            <v-btn size="large" :loading="isSubmitting" color="primary" :disabled="valid" block type="submit" flat>Sign In</v-btn>
            <div v-if="errors.apiError" class="mt-2">
                <v-alert color="error">{{ errors.apiError }}</v-alert>
            </div>
        </Form>
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" :top="'top'" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import { baseURlApi } from '@/api/axios';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const { login } = useAuthStore();
/*Social icons*/
import google from '@/assets/images/svgs/google-icon.svg';
import facebook from '@/assets/images/svgs/facebook-icon.svg';

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref('123456');
const email = ref('admin1@gmail.com');
const passwordRules = ref(['Password is required', 'Password must be less than 10 characters']);
const emailRules = ref(['E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

const requestBody = {
    email: email.value,
    password: password.value
};
function Login() {
    // baseURlApi
    //     .post('/login', requestBody)
    login(requestBody)
        .then((res) => {
            message.value = res.data.message;
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
            localStorage.setItem('auth-token', res.data.data.access_token);
            localStorage.setItem('user', JSON.stringify(res.data.data.user));
            router.push(location.search.substr(1).split('redirect=')[1] || '/dashboard');
        })
        .catch((error) => {
            isSnackbar.value = true;
            message.value = error.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
</script>
<style>
.v-snackbar__content {
    text-align: right !important;
    font-size: 16px !important;
    text-transform: capitalize !important;
}
</style>
