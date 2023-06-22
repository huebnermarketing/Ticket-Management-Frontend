<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="true">
        <template v-slot:activator="{ props }">
            <div class="d-none">{{userProfile}}</div>
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35" class="border">
                    <img
                        v-if="userProfile || userData.profile_photo"
                        :src="userProfile.value ? userProfile.value:userData.profile_photo"
                        width="35"
                        alt="Julia"
                        height="35"
                        style="object-fit: cover !important"
                    />
                    <img
                        v-if="!userData.profile_photo && userProfile.value == ''"
                        src="@/assets/images/profile/user.png"
                        width="35"
                        alt="Julia"
                        height="35"
                        style="object-fit: cover !important"
                    />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="px-8 pt-6">
                <h6 class="text-h5 font-weight-medium">User Profile</h6>
                <div class="d-flex align-center mt-4 pb-6">
                    <v-avatar size="80" class="border">
                        <img
                            v-if="userData.profile_photo"
                            :src="userData.profile_photo"
                            width="80"
                            height="80"
                            style="object-fit: cover !important"
                        />
                        <img
                            v-if="!userData.profile_photo"
                            src="@/assets/images/profile/user.png"
                            width="80"
                            height="80"
                            style="object-fit: cover !important"
                        />
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-h6 mb-n1">{{ userData.first_name }} {{ userData.last_name }}</h6>
                        <span class="text-subtitle-1 font-weight-regular textSecondary">{{ userData.roles[0].display_name }}</span>
                        <div class="d-flex align-center mt-1">
                            <MailIcon size="18" stroke-width="1.5" />
                            <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">{{ userData.email }}</span>
                        </div>
                    </div>
                </div>
                <!-- <v-divider></v-divider> -->
                <hr class="v-divider v-theme--BLUE_THEME" aria-orientation="horizontal" role="separator" />
            </div>
            <!-- <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px"> -->
            <perfect-scrollbar class="list-main">
                <v-list class="py-0 p-0 theme-list" lines="two">
                    <v-list-item
                        v-for="(item, i) in profileDD"
                        :key="item.title"
                        class="custom-text-primary p-0 list-items"
                        :to="item.href"
                    >
                        <template v-slot:prepend>
                            <!-- <v-avatar size="48" class="mr-3" rounded="md">
                                <SettingsIcon size="18" stroke-width="1.5" />
                            </v-avatar> -->
                            <v-avatar size="48" color="lightprimary" class="mr-3" rounded="md" v-if="i == 1">
                                <UserIcon size="18" stroke-width="1.5" />
                            </v-avatar>
                            <v-avatar size="48" color="lightprimary" class="mr-3" rounded="md" v-if="i == 0">
                                <SettingsIcon size="18" stroke-width="1.5" />
                            </v-avatar>
                        </template>
                        <div class="mb-2">
                            <h6 class="text-subtitle-1 font-weight-bold custom-title">{{ item.title }}</h6>
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
import { ref, computed,onMounted } from 'vue';
import { MailIcon, SettingsIcon, UserIcon } from 'vue-tabler-icons';
import proUser1 from '@/assets/images/svgs/icon-account.svg';
import proUser2 from '@/assets/images/svgs/icon-inbox.svg';
import { baseURlApi } from '@/api/axios';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { useCustomerAddressStore } from '@/stores/customerAddress';
const store = useCustomerAddressStore();
const { logout } = useAuthStore();

const route = useRoute();
const router = useRouter();

const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const userData = JSON.parse(localStorage.getItem('user'));
const userProfile = ref('');
const profileDD = [
    {
        // avatar: JSON.parse(localStorage.getItem('user')).profile_photo,
        title: 'Company Setting',
        href: '/pages/company-settings',
        subtitle: 'Manage organizational level settings',
        icon: SettingsIcon
    },
    {
        // avatar: JSON.parse(localStorage.getItem('user')).profile_photo,
        title: 'User Profile',
        href: '/apps/user/profile',
        subtitle: ' Account Settings',
        icon: UserIcon
    }
];
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
// onMounted(()=>{
//    console.log('updatedd', store.getUserProfile)
// })
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
.list-main {
    padding: 16px 32px !important;
}
.list-items {
    padding-left: 0 !important;
}
</style>
