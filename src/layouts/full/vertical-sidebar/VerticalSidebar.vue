<script setup>
import { ref, shallowRef,computed } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';

import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Profile from './profile/Profile.vue';
import Logo from '../logo/Logo.vue';
import RtlLogo from '../logo/RtlLogo.vue';
const userData = JSON.parse(localStorage.getItem('user'));
import { useCustomerAddressStore } from '@/stores/customerAddress';
const store = useCustomerAddressStore();

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);

const userProfile = ref('');
const companyName = ref('')
userProfile.value = computed(() => {
    return store.getCompanyLogo;
});
companyName.value = computed(() => {
    return store.getCompanyName;
});
</script>

<template>
    <v-navigation-drawer
        left
        v-model="customizer.Sidebar_drawer"
        elevation="0"
        rail-width="75"
        mobile-breakpoint="960"
        app
        class="leftSidebar"
        :rail="customizer.mini_sidebar"
        expand-on-hover
        width="270"
    >
                <div class="d-none">{{userProfile}}</div>
                <div class="d-none">{{companyName}}</div>

        <!---Logo part -->
        <v-locale-provider v-if="customizer.setRTLLayout" rtl>
            <div class="pa-5">
                <!-- <RtlLogo /> -->
            </div>
        </v-locale-provider>
        <v-locale-provider v-else>
            <div class="pa-5 d-flex">
                <v-avatar size="35" class="border mr-3">
                            <img
                                v-if="userProfile || userData.profile_photo"
                                :src="userProfile.value ? userProfile.value:userData.profile_photo"
                                width="35"
                                alt="Julia"
                                height="35"
                                style="object-fit: cover !important"
                            />
                        </v-avatar>
                    <h6 class="text-h6 font-weight-bold font-serif">{{companyName ? companyName.value :userData.company_name }}</h6>

                <!-- <Logo /> -->
            </div>
        </v-locale-provider>

        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <v-list class="pa-6">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <NavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
            <div class="pa-6 userbottom">
                <Profile />
            </div>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
