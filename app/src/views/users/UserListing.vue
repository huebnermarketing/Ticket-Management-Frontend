<template>
    <UiParentCard :page="page" :breadcrumbs="breadcrumbs" title="Users Listing Table">
        <EditableTable :userDetails="userDetails"/>
    </UiParentCard>
</template>
<script setup>
import { ref } from 'vue';
import EditableTable from '@/components/table/EditableTable.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

 const userDetails = ref({
    addButton : 'Add User',
    addIcon: 'mdi-plus'
 })
const page = ref({ title: 'Users' });
const breadcrumbs = ref([
    {
        text: 'Users',
        disabled: false,
        href: '/users'
    },
    {
        text: 'Users Listing Table',
        disabled: true,
        href: '#'
    }
]);
</script>
