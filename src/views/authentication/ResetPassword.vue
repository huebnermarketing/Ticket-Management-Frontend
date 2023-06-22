<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100 auth">
            <v-col cols="12" lg="8" xl="8" xxl="9" class="d-lg-flex align-center justify-center authentication position-relative">
                <div class="auth-header pt-sm-6 pt-2 px-sm-6 px-3 pb-sm-6 pb-0">
                    <div class="position-relative">
                        <h2 class="text-h3 font-weight-bold mb-2 text-capitalize">Welcome to Systune Systems Services</h2>
                    </div>
                </div>
                <div class="">
                    <img src="/assets/images/landinglogo.svg" class="position-relative d-none d-lg-flex" alt="login-background" />
                </div>
            </v-col>
            <v-col cols="12" lg="4" xl="4" xxl="3" class="d-flex align-center justify-center">
                <div class="mt-xl-0 mt-5 w-75">
                <v-form ref="resetpwd" @submit.prevent="resetPassword">
                    <div class="pa-sm-7 pa-4">
                        <h2 class="text--darken-2 text-h4 font-weight-bold">Change Password</h2>
                        <p class="text-subtitle-1 py-4 text-10">To change your password please confirm here</p>
                        <div class="mt-5">
                            <v-label class="mb-2 font-weight-medium">New Password</v-label>
                            <v-text-field color="primary" variant="outlined" type="password" v-model="newpwd" :rules="passwordrule" />
                            <v-label class="mb-2 font-weight-medium">Confirm Password</v-label>
                            <v-text-field
                                color="primary"
                                variant="outlined"
                                type="password"
                                v-model="confirmpwd"
                                :rules="confirmpasswordrule"
                            />
                        </div>
                        <v-btn size="large" color="lightprimary" disabled block class="mt-5 text-primary" flat v-if="isClicked"
                            >Reset Password</v-btn
                        >
                        <v-btn size="large" type="submit" color="primary" block class="mt-5 text-primary" flat v-if="!isClicked"
                            >Reset Password</v-btn
                        >
                    </div>
                </v-form>
                </div>
            </v-col>
            <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" :top="'top'" v-if="isSnackbar">
                <v-icon left>{{ icon }}</v-icon>
                {{ message }}
            </v-snackbar>
        </v-row>    
    </div>
 <Footer />         

</template>
<script setup>
import { ref, onMounted } from 'vue';
import Logo from '@/layouts/full/logo/Logo.vue';
import { baseURlApi } from '@/api/axios';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import Footer from '@/components/landingpage/layout/Footer.vue';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
const route = useRoute();
const router = useRouter();
const isClicked = ref(false);
const { confirmpwd, newpwd, confirmpasswordrule, passwordrule } = formValidationsRules();
// const newpwd = ref('');
// const confirmpwd = ref('');

const auth_token = localStorage.getItem('auth-token');
const token = route.query.token;
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('mdi-check-circle');
const timer = ref(5000);
const isSnackbar = ref(false);
const resetpwd = ref();

async function resetPassword() {
    const resetDetails = JSON.parse(localStorage.getItem('reset-object'));

    const { valid } = await resetpwd.value?.validate();
    const requestBody = {
        email: resetDetails.email,
        password: newpwd.value,
        password_confirmation: confirmpwd.value,
        reset_token: resetDetails.reset_token,
        token: resetDetails.token
    };
    if (valid) {
        isClicked.value = true;
        isSnackbar.value = false;
        baseURlApi
            .post('auth/reset-password?permission=user-auth', requestBody)
            .then((res) => {
                resetpwd.value?.reset();
                resetpwd.value?.resetValidation();
                isClicked.value = false;
                message.value = res.data.message;
                showSnackbar.value = true;
                isSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
                router.push('/login');
            })
            .catch((error) => {
                isClicked.value = false;
                showSnackbar.value = true;
                isSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}

onMounted(() => {
    baseURlApi
        .post('/auth/reset-password-details?permission=user-auth', { token: token })
        .then((res) => {
            localStorage.setItem('reset-object', JSON.stringify(res.data.data));
            message.value = res.data.message;
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
        })
        .catch((error) => {
            isSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
});
</script>
<style scoped>
/* .v-snackbar__content {
    text-align: right !important;
    font-size: 16px !important;
    text-transform: capitalize !important;
} */
</style>
