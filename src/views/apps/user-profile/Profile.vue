<script setup>

// components
import AccountSetting from '@/views/account-settings/AccountSettings.vue'
</script>

<template>
    <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->
    <!-- <ProfileBanner /> -->
    <v-row class="mt-4">
        <AccountSetting/>
        <!-- <v-col cols="12" lg="4" md="4">
            <IntroCard />
            <PhotosCard />
        </v-col>
        <v-col cols="12" lg="8" md="8">
            <AddPost />
            <PostListing />
        </v-col> -->
    </v-row>
</template>
