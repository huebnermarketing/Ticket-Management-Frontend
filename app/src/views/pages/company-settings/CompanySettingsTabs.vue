<template>
    <v-card elevation="2">
        <v-tabs v-model="tab" bg-color="transparent" color="primary" stacked centered class="c-main-tabs">
            <v-tab v-for="(item, i) in items" :key="i" :value="item.value">
                <div class="d-flex">
                    <component v-bind:is="item.icon" size="20" stroke-width="1.5" class="mr-2"></component>
                    <span>{{ item.name }}</span>
                </div>
            </v-tab>
        </v-tabs>
        <v-tabs v-model="subtab" bg-color="transparent" color="primary" v-if="tab == 'contract and ticket'" align-tabs="start">
            <v-tab v-for="(data, i) in contracts" :key="i" :value="data.value">
                {{ data.name }}
            </v-tab>
        </v-tabs>
        <v-card elevation="0" class="mb-6 m-5 overflow-hidden c-inner-card" v-if="tab == 'contract and ticket'">
            <UiChildCard :title="subtab">
                <v-window v-model="subtab">
                    <v-window-item v-for="(item, i) in contracts" :key="i" :value="item.value">
                        <v-card color="text-primary" flat>
                            <component v-bind:is="item.component"></component>
                        </v-card>
                    </v-window-item>
                </v-window>
            </UiChildCard>
        </v-card>
        <v-card elevation="0" class="mb-6 m-5 overflow-hidden c-inner-card" v-if="tab !== 'contract and ticket'">
            <UiChildCard :title="tab == 'settings' ? 'Company Profile' : tab">
                <v-window v-model="tab">
                    <v-window-item v-for="(item, i) in items" :key="i" :value="item.value">
                        <v-card>
                            <component v-bind:is="item.component"></component>
                        </v-card>
                    </v-window-item>
                </v-window>
            </UiChildCard>
        </v-card>
    </v-card>
</template>
<script setup>
import { ref } from 'vue'
import UiParentCard from '@/components/shared/UiParentCard.vue'
import UiTableCard from '@/components/shared/UiTableCard.vue'
import UiChildCard from '@/components/shared/UiChildCard.vue'
import WidgetCard from '@/components/shared/WidgetCard.vue'
import UserListing from '@/views/users/UserListing.vue'
import CustomerListing from '@/views/customers/CustomerListing.vue'
import CompanyProfileSetting from '@/views/settings/CompanyProfileSetting.vue'
import ContractType from '@/views/contractAndTicket/contractType/ContractType.vue'
import ProblemType from '@/views/contractAndTicket/problemType/ProblemType.vue'
import TicketStatus from '@/views/contractAndTicket/ticketStatus/TicketStatus.vue'
import ProductServices from '@/views/contractAndTicket/productServices/ProductServices.vue'
import { UserIcon, SettingsIcon, UsersIcon, TicketIcon } from 'vue-tabler-icons';
const props = defineProps(['icon'], {
    title: String
});

const open = ref(['Users']);

//main tabs items
const items = ref([
    {
        name: 'Settings',
        value: 'settings',
        icon: 'SettingsIcon',
        component: CompanyProfileSetting
    },
    {
        name: 'Users',
        value: 'users',
        icon: 'UserIcon',
        component: UserListing
    },
    {
        name: 'Contract & Ticket',
        value: 'contract and ticket',
        icon: 'TicketIcon',
        component: UserListing
    },
    {
        name: 'Customers',
        value: 'customers',
        icon: 'UsersIcon',
        component: CustomerListing
    }
]);

const title = ref([]);

//sub tabs for contracts and tickets
const contracts = ref([
    {
        name: 'Contract Type',
        value: 'contract type',
        component: ContractType
    },
    {
        name: 'Problem Type',
        value: 'problem type',
        component: ProblemType
    },
    {
        name: 'Ticket Status',
        value: 'ticket status',
        component:TicketStatus
    },
    {
        name: 'Product Services',
        value: 'product services',
        component:ProductServices
    }
]);
const tab = ref(null);
const subtab = ref(null);
</script>

<style scoped>
.c-inner-card {
    margin: 20px 20px 10px 20px !important;
    width: auto !important;
    overflow: hidden !important;
    border: 0 !important;
}
.c-parent-card,
.c-child-card {
    margin-bottom: 20px !important;
}
.c-main-tabs {
    border-bottom: 1px solid rgb(var(--v-theme-borderColor)) !important;
}
</style>
