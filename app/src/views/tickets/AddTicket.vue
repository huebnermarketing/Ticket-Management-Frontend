<template>
 <v-row>
        <v-col cols="12">
            <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> 
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
const page = ref({ title: 'Users' });
const breadcrumbs = ref([
    {
        text: 'Ticket Listing',
        disabled: false,
        href: '/tickets'
    },
    {
        text: 'Add Ticket',
        disabled: true,
        href: '#'
    }
]);
</script>