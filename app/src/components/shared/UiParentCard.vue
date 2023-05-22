<script setup>
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const props = defineProps({
    title: String,
    breadcrumbs: Array,
    page: Object
});
</script>

// ===============================|| Ui Parent Card||=============================== //
<template>
    <v-card elevation="8" class="m-0 c-parent-card">
        <v-card-item class="py-4 px-6">
            <div class="d-sm-flex align-center justify-space-between">
                <v-card-title class="text-h5"
                    ><BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb
                ></v-card-title>
                <!-- <template v-slot:append> -->
                <slot name="action"></slot>
                <!-- </template> -->
            </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>
