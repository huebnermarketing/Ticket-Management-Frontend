<script setup>
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

//Table
// import Table1 from '@/components/table/Table1.vue';
// import Table2 from '@/components/table/Table2.vue';
// import Table3 from '@/components/table/Table3.vue';
// import Table4 from '@/components/table/Table4.vue';
// import Table5 from '@/components/table/Table5.vue';
import DataTable from '@/components/global/table/DataTable.vue';

// theme breadcrumb
const page = ref({ title: 'Basic Table' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Basic Table',
        disabled: true,
        href: '#'
    }
]);
const columns1 = [
    {
        text: 'Col 1',
        key: 'prop1'
    },
    {
        text: 'Col 2',
        key: 'prop2'
    },
    {
        text: 'Col 3',
        key: 'prop3'
    }
];
const rows1 = [
    {
        id: 'rowId1',
        prop1: 1,
        prop2: 1,
        prop3: { color: 'primary' }
    }
];
// ==========================================
const columns2 = [
    {
        text: 'Col 1',
        key: 'prop1',
        sortable: true
    },
    {
        text: 'Col 2',
        key: 'prop2'
    },
    {
        text: 'Col 3',
        key: 'prop3'
    },
    {
        text: 'Col 4',
        key: 'prop4'
    }
];
const rows2 = [
    {
        id: 'rowId1',
        prop1: 12,
        prop2: -54,
        prop3: 0,
        prop4: 100
    },
    {
        id: 'rowId2',
        prop1: 1.2,
        prop2: 0.001,
        prop3: -5.4,
        prop4: 136
    },
    {
        id: 'rowId3',
        prop1: -0.009,
        prop2: 9e-2,
        prop3: 1e10,
        prop4: 8088
    },
    {
        id: 'rowId4',
        prop1: 127.1,
        prop2: 67,
        prop3: 1e-10,
        prop4: 110
    }
];
</script>

<template>
    <v-row>
        <v-col cols="12">
            <!-- <UiParentCard title="Basic Table"> -->
            <h3>Basic Table</h3>
            <DataTable :columns="columns1" :rows="rows1">
                <template #[`column_prop2`]="{ column }">Custom Header for {{ column.text }}</template>
                <template #[`row_rowId1_col_prop2`]>This is how you customize a cell</template>
                <template #[`row_rowId1_col_prop3`]="{ item, column, row }">
                    <v-chip closable rounded="md" class="font-weight-bold" :color="item.color" size="small" label> Custom </v-chip>
                </template>
            </DataTable>
            <h3>Checkbox</h3>
            <DataTable :columns="columns2" :rows="rows2" selection> </DataTable>
            <h3>Dense</h3>
            <DataTable :columns="columns2" :rows="rows2" density="compact"> </DataTable>
            <!-- </UiParentCard> -->
        </v-col>
    </v-row>
</template>
<style scoped>
h3 {
    margin: 1em 0;
}
</style>
