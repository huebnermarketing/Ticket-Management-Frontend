<template>

    <div class="main">
        <!-- <UiParentCard :title="'hey'" :page='page' :breadcrumbs='breadcrumbs'>  -->
        <NestedList/>
       <!-- </UiParentCard> -->
    </div>
</template>
<script setup>
import { ref } from 'vue';
import NestedList from '@/components/ui-components/list/NestedList.vue';
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
