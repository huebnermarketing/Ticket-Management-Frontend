<template>

    <div class="main">
        <!-- <UiParentCard :title="'hey'" :page='page' :breadcrumbs='breadcrumbs'>  -->
        <CompanySettingsTabs/>
       <!-- </UiParentCard> -->
    </div>
</template>
<script setup>
import { ref } from 'vue';
import CompanySettingsTabs from '@/views/company-settings/CompanySettingsTabs.vue'
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiTableCard from '@/components/shared/UiTableCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const page = ref({ title: 'Sample Page' })
const breadcrumbs = ref([
    {
        text: 'User Profile',
        disabled: true,
        href: '#'
    },
    {
        text: 'Company Settings',
        disabled: true,
        href: '#'
    }
]);
</script>
