<script setup>
import Logo from '@/layouts/full/logo/Logo.vue';
import { ref, computed } from 'vue';

/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';
import Footer from '@/components/landingpage/layout/Footer.vue';
import { useCustomerAddressStore } from '@/stores/customerAddress';
const userData = JSON.parse(localStorage.getItem('user'));
const store = useCustomerAddressStore();

const userProfile = ref('');
const companyName = ref('');
userProfile.value = computed(() => {
    return store.getCompanyLogo;
});
companyName.value = computed(() => {
    return store.getCompanyLogo;
});
</script>

<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100 auth">
            <v-col cols="12" lg="7" xl="8" class="d-lg-flex align-center justify-center authentication position-relative">
                <div class="auth-header pt-lg-6 pt-2 px-sm-6 px-3 pb-lg-6 pb-0">
                    <div class="position-relative text-capitalize d-flex">
                        <!-- <v-avatar size="35" class="border">
                            <img
                                v-if="userProfile"
                                :src="userProfile.value"
                                width="35"
                                alt="Julia"
                                height="35"
                                style="object-fit: cover !important"
                            />
                        </v-avatar> -->
                        <!-- <h4 class="text-h3 font-weight-bold font-serif" v-if="companyName.value">Systune Systems Services</h4> -->
                        <h4 class="text-h3 font-weight-bold font-serif">Systune Systems Services</h4>
                        <!-- <Logo /> -->
                    </div>
                </div>
                <div class="">
                    <img src="/assets/images/landinglogo.svg" class="position-relative d-none d-lg-flex" alt="login-background" />
                </div>
            </v-col>
            <v-col cols="12" lg="5" xl="4" class="d-flex align-center justify-center">
                <div class="mt-xl-0 mt-5 w-lg-75">
                    <!-- <v-avatar size="35" class="border">
                        <img
                            v-if="userProfile"
                            :src="userProfile.value"
                            width="35"
                            alt="Julia"
                            height="35"
                            style="object-fit: cover !important"
                        />
                    </v-avatar> -->
                    <!-- <h2 class="text-h3 font-weight-bold mb-2 text-capitalize" v-if="!userProfile">Welcome to Systune Systems Services</h2> -->
                    <h2 class="text-h3 font-weight-bold mb-2 text-capitalize">Welcome to Systune Systems Services</h2>
                    <!-- <div class="text-subtitle-1 mb-6">Your Admin Dashboard</div> -->
                    <LoginForm />
                </div>
            </v-col>
            <Footer />
        </v-row>
    </div>
</template>
