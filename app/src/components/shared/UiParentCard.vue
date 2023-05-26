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
            <div class="align-center justify-space-between">
                <div class="mb-4">
                    <v-card-title class="text-h4">{{ title }}</v-card-title>
                </div>
                <div>
                    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
                </div>

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
