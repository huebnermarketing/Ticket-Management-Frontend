<template>
    <v-row>
        <v-col cols="12">
            <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->

            <TopCards :topCardsData="topCardsData" />
        </v-col>
        <v-col cols="12">
            <v-card elevation="10">
                <v-card-text>
                    <DataTable  />
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script setup>
import { ref } from 'vue';
import UserListing from '@/views/users/UserListing.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import DataTable from '@/components/table/commonTables/DataTable.vue';

import TopCards from '@/components/cards/TopCards.vue';
const headers = [
    { title: 'Actions1', key: 'actions1', sortable: true },
    { title: 'Actions2', key: 'actions2', sortable: true },
    { title: 'Actions3', key: 'actions3', sortable: true },
    { title: 'Actions4', key: 'actions4', sortable: true },
    { title: 'Actions5', key: 'actions5', sortable: true },
    { title: 'Actions6', key: 'actions6', sortable: true }
];

const items =  [
  {
    id: "#123",
    avatar: 'user1',
    userinfo: "Hanna Gover",
    usermail: "hgover@gmail.com",
    phone: "+123 456 789",
    jdate: "12-10-2014",
    role: "Designer",
    rolestatus: "primary"
  },
    {
    id: "#452",
    avatar: 'user2',
    userinfo: "Daniel Kristeen",
    usermail: "hgover@gmail.com",
    phone: "+234 456 789",
    jdate: "10-09-2014",
    role: "Developer",
    rolestatus: "secondary"
  },
  {
    id: "#565",
    avatar: 'user3',
    userinfo: "Julian Josephs",
    usermail: "hgover@gmail.com",
    phone: "+345 456 789",
    jdate: "01-10-2013",
    role: "Accountant",
    rolestatus: "error"
  },]
const userDetails = ref({
    addButton: 'Add Ticket',
    addIcon: 'mdi-plus',
    headers: headers,
    items:items
});

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
