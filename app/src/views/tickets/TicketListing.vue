<template>
    <v-row>
        <v-col cols="12">
            <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->

            <TopCards :topCardsData="topCardsData" />
        </v-col>
        <v-col cols="12">
            <v-card elevation="10">
                <v-card-text>
                    <userListing />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script setup>
import { ref } from 'vue';
import UserListing from '@/views/users/UserListing.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

import TopCards from '@/components/cards/TopCards.vue';

const page = ref({ title: 'Users' });
const breadcrumbs = ref([
    {
        text: 'tickets',
        disabled: false,
        href: '/tickets'
    },
    {
        text: 'Ticket Listing Table',
        disabled: true,
        href: '#'
    }
]);
const topCardsData = ref([
    {
        title: 'Total Open Ticket',
        number: '96',
        bgcolor: 'lightprimary',
        textcolor: 'primary'
    },
    {
        title: 'Estimated Amount',
        number: '3,650',
        bgcolor: 'lightwarning',
        textcolor: 'warning'
    },
    {
        title: 'Remaining Amount',
        number: '96',
        bgcolor: 'lightprimary',
        textcolor: 'primary'
    },
    {
        title: 'Open Contract Ticket',
        number: '3,650',
        bgcolor: 'lightwarning',
        textcolor: 'warning'
    }
]);
</script>
