<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-form class="mt-5" ref="resetpass">
                    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email Address</v-label>
                    <VTextField v-model="email" :rules="emailrule" required></VTextField>
                    <v-btn size="large" color="primary" disabled block flat v-if="isClicked" class="mt-2">Forgot Password </v-btn>
                    <v-btn size="large" type="submit" color="primary" @click="forgotPassword()" block flat v-if="!isClicked" class="mt-2"
                        >Forgot Password</v-btn
                    >
                    <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" :top="'top'" v-if="isSnackbar">
                        <v-icon left>{{ icon }}</v-icon>
                        {{ message }}
                    </v-snackbar>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Logo from '@/layouts/full/logo/Logo.vue';
import { baseURlApi } from '@/api/axios';
import { formValidationsRules } from '@/mixins/formValidationRules.js';

const { emailrule } = formValidationsRules();

const show1 = ref(false);
const email = ref('');
const showSnackbar = ref(false);
const message = ref('');
const isClicked = ref(false);
const color = ref('');
const icon = ref('mdi-check-circle');
const timer = ref(5000);
const isSnackbar = ref(false);
const resetpass = ref();

async function forgotPassword() {
    const { valid } = await resetpass.value?.validate();

    if (valid) {
        isClicked.value = true;
        baseURlApi
            .post('auth/forgot-password?permission=user-auth', { email: email.value })
            .then((res) => {
                resetpass.value?.reset();
                resetpass.value?.resetValidation();
                isClicked.value = false;
                message.value = res.data.message;
                isSnackbar.value = true;
                showSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
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
</script>
<style scoped>
.v-snackbar__content {
    text-align: right !important;
    font-size: 16px !important;
    text-transform: capitalize !important;
}
</style>
