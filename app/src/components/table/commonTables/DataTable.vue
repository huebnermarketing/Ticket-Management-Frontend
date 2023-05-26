<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard :title="'Ticket List'" :breadcrumbs="breadcrumbs" :page="page">
                <v-row justify="space-between" class="align-center mb-3">
                    <v-col cols="12" lg="4" md="6">
                        <v-text-field density="compact" v-model="searchValue" label="Search" hide-details variant="outlined"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <div class="d-flex gap-2 justify-end">
                            <v-btn btn color="primary" @click="redirectAddTicket()">
                                <PlusIcon stroke-width="1.5" size="20" class="text-white" />Add Ticket
                            </v-btn>
                            <v-btn btn color="primary">
                                <FilterIcon stroke-width="1.5" size="20" class="text-white" />
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                <EasyDataTable :headers="headers" :items="items" :theme-color="themeColor" table-class-name="customize-table" >
                    <!-- slot name for item is #item-{headername.value} = {"items from items array"} -->
                    <template #item-name="{ name }">
                        {{ name }}
                    </template>
                    <template #item-height="{ height }">
                        <div class="player-wrapper">
                            {{ height }}
                        </div>
                    </template>
                    <template #item-weight="{ weight }">
                        <div class="player-wrapper">
                            {{ weight }}
                        </div>
                    </template>
                    <template #item-city="{ city }">
                        <div class="player-wrapper">
                            {{ city }}
                        </div>
                    </template>
                    <template #item-age="{ age }">
                        <div class="player-wrapper">
                            {{ age }}
                        </div>
                    </template>
                    <template #item-status="{ status }">
                        <div class="player-wrapper">
                        <v-chip color="green" size="small" label>{{ status }}</v-chip>
                        </div>
                    </template>
                    <template #item-action>
                        <div class="d-flex align-center">
                            <v-tooltip text="View">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="table-icons-common" icon flat @click="editItem(item)" v-bind="props"
                                        ><EyeIcon stroke-width="1.5" size="20" class="text-success"
                                    /></v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip text="Edit">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="table-icons-common" icon flat @click="editItem(item)" v-bind="props"
                                        ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                    /></v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip text="Delete">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="table-icons-common" icon flat @click="deleteItem(item)" v-bind="props"
                                        ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                    /></v-btn>
                                </template>
                            </v-tooltip>
                        </div>
                    </template>

                    <!-- <template #item-operation="item">
                        <div class="operation-wrapper">
                            <v-btn icon variant="text">
                                <DotsIcon size="18" />
                            </v-btn>
                        </div>
                    </template> -->
                </EasyDataTable>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import 'vue3-easy-data-table/dist/style.css';
const themeColor = ref('rgb(var(--v-theme-secondary))');
const searchField = ref('name');
const searchValue = ref('');
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

const headers = ref([
    { text: 'Name', value: 'name', sortable: true },
    { text: 'Height (cm)', value: 'height', sortable: true },
    { text: 'Weight (kg)', value: 'weight', sortable: true },
    { text: 'Age', value: 'age', sortable: true },
    { text: 'City', value: 'city', sortable: true },
    { text: 'Status', value: 'status' },
    { text: 'Action', value: 'action' }
]);

const items = ref([
    { name: 'Curry', height: 178, weight: 77, age: 20,city:'ahmedabad', status: 'active' },
    { name: 'James', height: 180, weight: 75, age: 21,city:'ahmedabad', status: 'pending' },
    { name: 'Jordan', height: 181, weight: 73, age: 22,city:'ahmedabad', status: 'done' }
]);
</script>
<style>
.vue3-easy-data-table__footer {
    display: none !important;
}
/* .table-icons-common{
    justify-content: start !important;
} */
</style>
