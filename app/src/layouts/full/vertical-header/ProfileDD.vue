<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="true">
        <template v-slot:activator="{ props }">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="@/assets/images/profile/user-1.jpg" width="35" alt="Julia" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="px-8 pt-6">
                <h6 class="text-h5 font-weight-medium">User Profile</h6>
                <div class="d-flex align-center mt-4 pb-6">
                    <v-avatar size="80">
                        <img src="@/assets/images/profile/user-1.jpg" width="80" />
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-h6 mb-n1">Mathew Anderson</h6>
                        <span class="text-subtitle-1 font-weight-regular textSecondary">Designer</span>
                        <div class="d-flex align-center mt-1">
                            <MailIcon size="18" stroke-width="1.5" />
                            <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">info@modernize.com</span>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>
            <!-- <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px"> -->
            <perfect-scrollbar>
                <v-list class="py-0 theme-list" lines="two">
                    <v-list-item v-for="item in profileDD" :key="item.title" class="py-4 px-8 custom-text-primary" :to="item.href">
                        <template v-slot:prepend>
                            <v-avatar size="48" color="lightprimary" class="mr-3" rounded="md">
                                <v-img :src="item.avatar" width="24" height="24" :alt="item.avatar" />
                            </v-avatar>
                        </template>
                        <div>
                            <h6 class="text-subtitle-1 font-weight-bold mb-2 custom-title">{{ item.title }}</h6>
                        </div>
                        <p class="text-subtitle-1 font-weight-regular textSecondary">{{ item.subtitle }}</p>
                    </v-list-item>
                </v-list>
            </perfect-scrollbar>
            <!-- <div class="px-8 py-3">
                <div class="bg-lightprimary rounded-md pa-5 overflow-hidden position-relative">
                    <h5 class="text-h6">
                        Unlimited<br />
                        Access
                    </h5>
                    <v-btn variant="flat" color="primary" class="mt-3">Upgrade</v-btn>
                    <img src="@/assets/images/backgrounds/unlimited-bg.png" alt="bg-img" class="right-pos-img" />
                </div>
            </div> -->
            <div class="pt-4 pb-6 px-8 text-center">
                <v-btn color="primary" variant="outlined" block @click="loggedout()">Logout</v-btn>
            </div>
        </v-sheet>
    </v-menu>
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" :top="'top'" v-if="isSnackbar">
        <v-icon left>{{ icon }}</v-icon>
        {{ message }}
    </v-snackbar>
</template>
<script setup>
import {ref} from 'vue';
import { MailIcon } from 'vue-tabler-icons';
import proUser1 from '@/assets/images/svgs/icon-account.svg';
import proUser2 from '@/assets/images/svgs/icon-inbox.svg';
import { baseURlApi } from '@/api/axios';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
const { logout } = useAuthStore();

const route = useRoute();
const router = useRouter();

const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const profileDD = [
    {
        avatar: proUser1,
        title: 'Account settings',
        href: '/apps/user/profile'
    },
    {
        avatar: proUser2,
        title: 'Company Setting',
        href: '/pages/company-settings'
    }
];
function loggedout() {
      logout()
        .then((res) => {
            message.value = res.data.message;
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
            localStorage.clear()
            location.href = '/login';
        })
        .catch((error) => {
            isSnackbar.value = true;
            message.value = error.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
};
</script>
<style scoped>
.maxWidth {
    max-width: 100% !important;
}
.v-snackbar__content {
    text-align: right !important;
    font-size: 16px !important;
    text-transform: capitalize !important;
}
</style>
