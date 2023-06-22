<script setup>
import Logo from '@/layouts/full/logo/Logo.vue';
/* Reset form */
import ResetForm from '@/components/auth/ResetForm.vue';
import Footer from '@/components/landingpage/layout/Footer.vue';
</script>

<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100 auth">
            <v-col cols="12" lg="7" xl="8" class="d-lg-flex align-center justify-center authentication position-relative">
                <div class="auth-header pt-sm-6 pt-2 px-sm-6 px-3 pb-sm-6 pb-0">
                    <div class="position-relative"><h4 class="text-h3 font-weight-bold text-capitalize">Systune Systems Services</h4></div>
                </div>
                <div class="">
                    <img src="/assets/images/landinglogo.svg" class="position-relative d-none d-lg-flex" alt="login-background" />
                </div>
            </v-col>
            <v-col cols="12" lg="5" xl="4" class="d-flex align-center justify-center">
                <div class="mt-xl-0 mt-5 w-75 w-md-50 fg-pwd">
                    <h2 class="text--darken-2 text-h4 font-weight-bold">Forgot your password?</h2>
                    <p class="text-subtitle-1 py-4 text-10 mt-2">
                        Please enter the email address associated with your account and We will email you a link to reset your password.
                    </p>
                    <ResetForm/>
                    <v-btn size="large" color="lightprimary" to="/login" block class="mt-5 text-primary" flat>Back to Login</v-btn>
                </div>
            </v-col>
            <Footer />
        </v-row>
    </div>
</template>
<style scoped>
@media only screen and (max-width:1279px) {
    .fg-pwd{
        width: 36% !important;
    }
    
}
</style>
