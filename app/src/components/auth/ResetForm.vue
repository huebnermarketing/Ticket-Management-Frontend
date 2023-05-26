<template>
    <v-form ref="form" v-model="valid" lazy-validation class="mt-sm-13 mt-8">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email Address</v-label>
        <VTextField v-model="email" :rules="emailRules" required></VTextField>
        <v-btn size="large" color="primary" @click="forgotPassword()" block flat>Forgot Password</v-btn>
    </v-form>
    <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" :top="'top'" v-if="isSnackbar">
        <v-icon left>{{ icon }}</v-icon>
        {{ message }}
    </v-snackbar>
</template>
<script setup>
import { ref } from 'vue';
import Logo from '@/layouts/full/logo/Logo.vue';
import { baseURlApi } from '@/api/axios';

const valid = ref(true);
const show1 = ref(false);
const email = ref('');
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('mdi-check-circle');
const timer = ref(5000);
const isSnackbar = ref(false);

const emailRules = ref([(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
function forgotPassword() {
    baseURlApi
        .post('/forgot-password', { email: email.value })
        .then((res) => {
            message.value = res.data.message;
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
        })
        .catch((error) => {
            isSnackbar.value = true;
            message.value = error.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
</script>
<style scoped>
.v-snackbar__content {
    text-align: right !important;
    font-size: 16px !important;
    text-transform: capitalize !important;
}
</style>
