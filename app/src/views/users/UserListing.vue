<template>
      <EditableTable :userDetails="userDetails"/>
</template> 
<script setup>
import { ref, watch } from 'vue';
import EditableTable from '@/components/table/EditableTable.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

 const userDetails = ref({
    addButton : 'Add data',
    addIcon: 'mdi-plus'
 })


</script>
