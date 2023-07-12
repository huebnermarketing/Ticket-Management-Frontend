
<template>
    <v-container v-scroll="onScroll" fluid class="pa-0">
        <v-row no-gutters>
            <v-col cols="12" md="12">
                <v-row justify="space-between" class="align-center mb-3">
                    <v-col cols="12" lg="4" md="4" sm="4" v-for="card in topCardsData" :key="card.title">
                        <div
                            :class="
                                'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6  bg-' + card.bgcolor
                            "
                        >
                            <div :class="'bg-' + card.bgcolor">
                                <div
                                    :class="'text-subtitle-1 text-capitalize font-weight-bold mt-3 text-' + card.textcolor"
                                    v-text="card.title"
                                ></div>
                                <h4
                                    :class="'text-h4 mt-1 text-' + card.textcolor"
                                    v-text="card.prefix ? card.prefix + card.number : card.number"
                                ></h4>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row justify="space-between" class="align-center mb-3">
                    <v-col cols="12" lg="4" md="6" class="d-flex align-center">
                        <label class="mr-5 text-h5">Contracts -{{ contractClientName }} ({{ ActiveContractsNum }})</label>
                    </v-col>
                    <v-col cols="12" md="3">
                        <div class="d-flex gap-2 justify-end align-center">
                            <v-select
                                v-model="contractFilter"
                                :items="contractFilterOptions"
                                item-title="status_name"
                                item-value="id"
                                @update:modelValue="updateFilterVal()"
                                return-object
                                single-line
                                variant="outlined"
                                style="min-width: 150px !important"
                                class="activefilter"
                            ></v-select>
                            <v-btn btn color="primary" @click="openCreateContract()" class="ml-2" style="height: 44px">
                                <PlusIcon stroke-width="1.5" size="22" class="text-white" />Create Contract
                            </v-btn>
                            <!-- <v-btn btn color="primary">
                            <FilterIcon stroke-width="1.5" size="20" class="text-white" />
                        </v-btn> -->
                        </div>
                    </v-col>
                </v-row>
                <div id="infinite-list">
                    <!-- :search-value="searchValue" -->
                    <EasyDataTable
                        sticky
                        fixed
                        id="ticketlist"
                        responsive
                        :headers="headers"
                        :fixed-headers="true"
                        :hide-footer="true"
                        :items="items"
                        :search-value="searchValue"
                        :theme-color="themeColor"
                        :search="searchField"
                        table-class-name="customize-table"
                        ref="refTicketListTable"
                        :loading="isLoading && current_page === 1"
                        :sort-by="sortBy"
                        :sort-type="sortType"
                        must-sort
                    >
                        {{ items }}
                        <!-- slot name for item is #item-{headername.value} = {"items from items array"} -->
                        <template #item-id="{ id }">
                            <div class="player-wrapper text-capitalize">#{{ id }}</div>
                        </template>
                        <template #item-contract_title="{ contract_title }">
                            <div class="player-wrapper text-capitalize">
                                {{ contract_title }}
                            </div>
                        </template>
                        <template #item-company_name="{ customer_location }">
                            <div class="player-wrapper text-capitalize">
                                {{ customer_location.company_name ? customer_location.company_name : '-' }}
                            </div>
                        </template>
                        <template #item-area="{ customer_location }">
                            <div class="player-wrapper text-capitalize">
                                {{ customer_location.area }}
                            </div>
                        </template>
                        <template #item-start_date="{ start_date }">
                            <div class="player-wrapper text-capitalize">
                                {{ start_date }}
                            </div>
                        </template>
                        <template #item-end_date="{ end_date }">
                            <div class="player-wrapper text-capitalize">
                                {{ end_date }}
                            </div>
                        </template>
                        <template #item-open_tickets="{ open_tickets, tickets_count }">
                            <div class="player-wrapper text-capitalize text-primary cursor-pointer" @click="redirectToContracts(id)">
                                {{ `${open_tickets} (${tickets_count})` }}
                            </div>
                        </template>
                        <template #item-service_type="{ contract_services_types }">
                            <div class="player-wrapper text-capitalize">
                                <v-chip v-for="(data, i) in contract_services_types" :key="i" color="warning">
                                    {{ data.contract_types.contract_name }}
                                </v-chip>
                                <!-- <ArrowNarrowUpIcon v-if="ticket_priority.id == 1" stroke-width="1.5" size="20" class="text-error" /> -->
                                <!-- <ArrowNarrowDownIcon v-if="ticket_priority.id == 2" stroke-width="1.5" size="20" class="text-success" /> -->
                            </div>
                        </template>
                        <template #item-amount="{ amount }">
                            <div class="player-wrapper text-capitalize">{{ amountFormat?.prefix }} {{ amount }}</div>
                        </template>
                        <template #item-remaining_amount="{ remaining_amount }">
                            <div class="player-wrapper text-capitalize">{{ amountFormat?.prefix }} {{ remaining_amount }}</div>
                        </template>
                        <!--------------------------- actions ------------------------------>
                        <template #item-action="{ id }">
                            <div class="d-flex align-center">
                                <v-tooltip text="Edit">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="table-icons-common" icon flat @click="openEditDialog(id)" v-bind="props"
                                            ><PencilIcon stroke-width="1.5" size="20" class="text-secondary"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Invoice">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="table-icons-common" icon flat @click="openInvoiceDialog(id)" v-bind="props">
                                            <ReceiptIcon stroke-width="1.5" size="20" class="text-primary" />
                                            <!-- <PencilIcon stroke-width="1.5" size="20" class="text-secondary"
                                        /> -->
                                        </v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                        </template>
                    </EasyDataTable>
                </div>
            </v-col>

            <dialogBox
                ref="deleteDialog"
                @confirClk="confirmClick()"
                @cancelClk="cancelClick()"
                :dialogText="dialogText"
                :confirmText="confirmText"
                :dialogTitle="dialogTitle"
                :cancelText="cancelText"
                :title="title"
            />

            <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
                <v-icon left>{{ icon }}</v-icon>
                {{ message }}
            </v-snackbar>
        </v-row>
    </v-container>
    <TicketInvoice ref="invoiceTicketRef" />
</template>
<script setup>
import { onMounted, ref, watch, defineExpose, onUpdated, computed } from 'vue';
import { baseURlApi } from '@/api/axios';
import TopCards from '@/components/cards/TopCards.vue';
import dialogBox from '@/components/TicketComponents/dialog.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import 'vue3-easy-data-table/dist/style.css';
import { useCustomizerStore } from '@/stores/customizer';
import useEventsBus from '@/mixins/eventBus';
import TicketInvoice from './TikcetInvoice.vue'

import { router } from '@/router';
import { useRoute } from 'vue-router';
import { TicketIcon } from 'vue-tabler-icons';
const { bus } = useEventsBus();

const themeColor = ref('rgb(var(--v-theme-secondary))');
const store = useCustomizerStore();
const route = useRoute();
const page = ref({ title: 'Users' });
const isOpenDialog = ref(false);

//dialog props
const dialogTitle = ref('Are you sure you want to delete this ticket ?');
const dialogText = ref('This will delete this ticket permanently, you can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Delete');
const title = ref('Delete Ticket');
const editId = ref(0);

//refs
const viewTicketRef = ref();
const deleteDialog = ref();
const refTicketListTable = ref();
const contractDashboard = ref({});
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
const amountFormat = ref({
    prefix: ' ',
    masked: false
});

const topCardsData = ref([]);

const contractClientName = ref('');
const ActiveContractsNum = ref(0);
const headers = ref([
    { text: 'Id', value: 'id' },
    { text: 'Contract Name', value: 'contract_title' },
    { text: 'Company Name', value: 'company_name' },
    { text: 'Location(area)', value: 'area' },
    { text: 'Start Date', value: 'start_date' },
    { text: 'End Date', value: 'end_date' },
    { text: 'Ticket', value: 'open_tickets' },
    { text: 'Service Type', value: 'service_type' },
    { text: 'Amount', value: 'amount' },
    { text: 'Unpaid Amount', value: 'remaining_amount' },
    { text: 'Action', value: 'action' }
]);
const serverItemsLength = ref(50);
const current_page = ref(1);
const customerID = ref(0);
const sortBy = 'first_name';
const sortType = 'desc';
const items = ref([]);
const searchField = ref('name', 'mobile', 'email');
const searchValue = ref('');
const total_record = ref();
const isLoading = ref(false);
const isFromAdd = ref(false);

//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

const tableHeight = ref(0);
const totalItems = ref(0);
const invoiceTicketRef = ref()

//************************************* contacts ****************************************//
const contractFilter = ref({
    id: 1,
    status_name: 'Active'
});
const contractFilterOptions = ref([]);
//get users
function searchUser() {
    const fd = new FormData();
    if (searchValue.value.length > 0) {
        const requestBody = {
            search_text: searchValue.value
        };
        baseURlApi.post(`contract/search`), requestBody.then((res) => {}).catch((error) => {});
    }
}
function updateTopCardValues() {
    topCardsData.value.forEach((e) => {
        e.number = contractDashboard.value[e.key];
    });
}
function onScroll(e) {
    const el = e.target?.scrollingElement;
    if (!el) return;
    if (current_page.value > 1 && items.value.length >= totalItems.value) return;
    const scrollPercent = (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight);
    if (scrollPercent > 50) {
        getContracts();
    }
}

function updateFilterVal() {
    getContracts();
}
function redirectToContracts(id) {
    router.push({
        name: 'ContractList',
        params: { id }
    });
}
function getContracts() {
    if ((current_page.value > 1 && items.value.length >= totalItems.value) || isLoading.value) return;
    isLoading.value = true;
    const requestbody = {
        customer_id: parseInt(customersId.value),
        status_type: contractFilter.value.status_name
    };

    baseURlApi
        .post(`contract/contract-list`, requestbody)
        .then((res) => {
            isLoading.value = false;
            contractDashboard.value = res.data.data.contract_dashboard;
            updateTopCardValues();
            contractClientName.value = res.data.data.contract_dashboard.client_name;
            ActiveContractsNum.value = res.data.data.contract_dashboard.client_total_active_contract;
            items.value = res.data.data.contract_list;
        })
        .catch((error) => {
            isLoading.value = false;
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function getFilterData() {
    baseURlApi
        .get(`contract/get-details`)
        .then((res) => {
            contractFilterOptions.value = res.data.data.contract_statuses;
            contractFilter.value = res.data.data.contract_statuses.filter((e) => e.status_name.toLowerCase() === 'active');
        })
        .catch((error) => {
            isLoading.value = false;
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function addCustomerData(addedData) {
    isFromAdd.value = true;
    getContracts();
}
const customersId = computed(() => route.params.id);
//open modal
function openCreateContract() {
    let id = parseInt(customersId.value);
    router.push({
        name: 'AddContract',
        params: { id }
    });
}
function openEditDialog(id) {
    const custId = customersId.value;
    router.push({
        name: 'EditContract',
        params: { id, custId }
    });
}
function openInvoiceDialog(contractID) {
    // invoiceTicketRef.value?.getCurrency()
    invoiceTicketRef.value?.getUsersData(contractID);
    invoiceTicketRef.value?.open();
}
function getCurrency() {
    baseURlApi
        .get('settings/company/get-currency')
        .then((res) => {
            amountFormat.value.prefix = res.data.data.currency.symbol + ' ';
            topCardsData.value.push(
                {
                    title: 'Active Contract Amount',
                    key: 'active_contract_amount',
                    number: contractDashboard.value.active_contract_amount,
                    bgcolor: 'lightprimary',
                    textcolor: 'primary',
                    prefix: amountFormat.value?.prefix
                },
                {
                    title: 'Remaining Amount',
                    key: 'remaining_amount',
                    number: contractDashboard.value.remaining_amount,
                    bgcolor: 'lightwarning',
                    textcolor: 'warning',
                    prefix: amountFormat.value?.prefix
                },
                {
                    title: 'Open Contract Ticket',
                    key: 'open_contract_ticket',
                    number: contractDashboard.value.open_contract_ticket,
                    bgcolor: 'lightprimary',
                    textcolor: 'primary'
                }
            );
        })
        .catch((error) => {
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
onMounted(() => {
    getContracts();
    getFilterData();
    getCurrency();
});

// TODO: split routes & remove block below
watch(
    () => route.name,
    (e) => {
        if (e === 'Contracts') {
            current_page.value = 1;
            items.value = [];
            getContracts();
        }
    }
);
</script>

<style >
.activefilter .v-input__details {
    display: none !important;
}
.vue3-easy-data-table__footer {
    display: none !important;
}
.vue3-easy-data-table__message {
    min-height: calc(100vh - 600px) !important;
}
.loading {
    text-align: center;
    position: absolute;
    color: #fff;
    z-index: 100 !important;
    background: rgb(93, 135, 255);
    padding: 8px 18px;
    border-radius: 5px;
    left: calc(50% - 45px);
    top: calc(50% - 18px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
#ticketlist div table {
    overflow: scroll !important;
}
</style>
