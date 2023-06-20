<template>
    <v-sheet rounded="md" color="lightsecondary" class="px-4 py-3 ExtraBox">
        <div class="d-none">{{ userProfile }}</div>
        <div class="d-flex align-center hide-menu">
            <v-avatar size="40">
                <img
                    v-if="userProfile || userData.profile_photo"
                    :src="userProfile.value ? userProfile.value : userData.profile_photo"
                    alt="user"
                    height="40"
                    style="object-fit: cover !important"
                />
                <img
                    v-if="!userData.profile_photo && userProfile.value == ''"
                    src="@/assets/images/profile/user.png"
                    alt="user"
                    height="40"
                    style="object-fit: cover !important"
                />
            </v-avatar>
            <div class="ml-4">
                <h4 class="mb-n1 text-h6 textPrimary">{{ userData.first_name }}</h4>
                <span class="text-subtitle-2 textSecondary">{{ userData.roles[0].display_name }}</span>
            </div>
            <div class="ml-auto">
                <v-btn variant="text" icon rounded="md" color="primary" @click="loggedout()">
                    <PowerIcon />
                    <v-tooltip activator="parent" location="top">Logout</v-tooltip>
                </v-btn>
            </div>
        </div>
    </v-sheet>
    <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" :top="'top'" v-if="isSnackbar">
        <v-icon left>{{ icon }}</v-icon>
        {{ message }}
    </v-snackbar>
</template>
<script setup>
import { ref, computed} from 'vue';
import { baseURlApi } from '@/api/axios';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { useCustomerAddressStore } from '@/stores/customerAddress';
const store = useCustomerAddressStore();
const route = useRoute();
const router = useRouter();
const { logout } = useAuthStore();
const userData = JSON.parse(localStorage.getItem('user'));
const userProfile = ref('');


const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

// const auth_token = localStorage.getItem('auth-token');

// const headers = { Authorization: `Bearer ${auth_token}` };
function loggedout() {
    logout()
        .then((res) => {
            message.value = res.data.message;
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
            localStorage.clear();
            location.href = '/login';
        })
        .catch((error) => {
            isSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
 userProfile.value = computed(() => {
    return store.getUserProfile;
});
</script>
<style lang="scss">
.ExtraBox {
    position: relative;
    overflow: hidden;
}
.line-height-none {
    line-height: normal;
}
.v-snackbar__content {
    text-align: right !important;
    font-size: 16px !important;
    text-transform: capitalize !important;
}
</style>
