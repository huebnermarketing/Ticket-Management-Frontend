
<template>
    <v-container v-scroll="onScroll" fluid class="pa-0">
        <v-row no-gutters>
            <v-col cols="12" md="12">
                <v-row justify="space-between" class="align-center mb-3">
                    <v-col cols="12" lg="3" md="3" sm="3" v-for="card in topCardsData" :key="card.title">
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
                                <h4 :class="'text-h4 mt-1 text-' + card.textcolor" v-text="card.number"></h4>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row justify="space-between" class="align-center mb-3">
                    <v-col cols="12" lg="4" md="6" class="d-flex align-center">
                        <label class="mr-5 text-h5">Contracts ({{ totalItems }})</label>
                        <v-text-field
                            density="compact"
                            @input="searchUser()"
                            v-model="searchValue"
                            label="Search"
                            hide-details
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <div class="d-flex gap-2 justify-end align-center">
                            <v-select
                                v-model="contractFilter"
                                :items="contractFilterOptions"
                                item-title="status"
                                item-value="id"
                                @update:modelValue="updateFilterVal()"
                                return-object
                                single-line
                                variant="outlined"
                                class="activefilter mr-2"
                            ></v-select>
                            <v-btn btn color="primary" @click="openAddUserDialog()">
                                <PlusIcon stroke-width="1.5" size="20" class="text-white" />Create Contract
                            </v-btn>
                            <!-- <v-btn btn color="primary">
                            <FilterIcon stroke-width="1.5" size="20" class="text-white" />
                        </v-btn> -->
                        </div>
                    </v-col>
                </v-row>
                <!-- style="height:300px !important; overflow-y: scroll !important" -->

                <!-- <div v-if="current_page > 1">
                    <transition name="fade">
                        <div class="loading" v-if="isLoading">
                            <v-progress-circular indeterminate color="white"></v-progress-circular> <span class="ml-2">Loading</span>
                        </div>
                    </transition>
                </div> -->
                <div id="infinite-list">
                    <!-- :search-value="searchValue" -->
                    <EasyDataTable
                        sticky
                        fixed
                        id="ticketlist"
                        responsive
                        :server-items-length="serverItemsLength"
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
                        <!-- slot name for item is #item-{headername.value} = {"items from items array"} -->
                        <template #item-id="{ id }">
                            <div class="player-wrapper text-capitalize">#{{ id }}</div>
                        </template>
                        <template #item-customer_name="{ first_name, last_name }">
                            <div class="player-wrapper text-capitalize">
                                {{ first_name + ' ' + last_name }}
                            </div>
                        </template>
                        <template #item-active_contract="{ contract_count }">
                            <div class="player-wrapper text-capitalize">
                                {{ contract_count }}
                            </div>
                        </template>
                        <!-- <template #item-company_name="{ company_name }">
                            <div class="player-wrapper">
                                {{ company_name }}
                            </div>
                        </template> -->
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
    <!-- <viewTicket ref="viewTicketRef" /> -->
</template>
<script setup>
import { onMounted, ref, watch, defineExpose, onUpdated, computed } from 'vue';
import { baseURlApi } from '@/api/axios';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import TopCards from '@/components/cards/TopCards.vue';
// import viewTicket from './ViewTicket.vue';
// import filterTicket from './FilterTicket.vue';

import dialogBox from '@/components/TicketComponents/dialog.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import 'vue3-easy-data-table/dist/style.css';
import { useCustomizerStore } from '@/stores/customizer';
import useEventsBus from '@/mixins/eventBus';

import { router } from '@/router';
import { useRoute } from 'vue-router';
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
const ticketDashboard = ref({});
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
        title: 'Active Contract',
        key: 'unresolved',
        number: ticketDashboard.value.unresolved,
        bgcolor: 'lightprimary',
        textcolor: 'primary'
    },
    {
        title: 'Paid Amount',
        key: 'overdue',
        number: ticketDashboard.value.overdue,
        bgcolor: 'lightwarning',
        textcolor: 'warning'
    },
    {
        title: 'Remaining Amount',
        key: 'due_today',
        number: ticketDashboard.value.due_today,
        bgcolor: 'lightprimary',
        textcolor: 'primary'
    },
    {
        title: 'Open Contract Ticket',
        key: 'due_this_week',
        number: ticketDashboard.value.due_this_week,
        bgcolor: 'lightwarning',
        textcolor: 'warning'
    }
]);

const headers = ref([
    { text: 'Id', value: 'id' },
    { text: 'Customer Name', value: 'customer_name' },
    { text: 'Active Contract', value: 'active_contract' }
]);
const serverItemsLength = ref(50);
const current_page = ref(1);
const sortBy = 'first_name';
const sortType = 'desc';
const items = ref([]);
const searchField = ref('name', 'mobile', 'email');
const searchValue = ref('');
const total_record = ref();
const deleteId = ref(0);
const isLoading = ref(false);
const resizableDiv = ref();
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
const filters = ref(null);
const computedResult = ref(null);
const is_filter = ref(false);

const name = ref();

//************************************* contacts ****************************************//
const contractFilter = ref(
    {
        id: 1,
        status: 'Active'
    }
);
const contractFilterOptions = ref([
    {
        id: 1,
        status: 'Active'
    },
    {
        id: 2,
        status: 'Inactive'
    }
]);
//get users
function searchUser() {
    const fd = new FormData();
    if (searchValue.value.length > 0) {
        fd.append('search_text', searchValue.value);
        baseURlApi
            .post(`ticket/search?total_record=${current_page.value}`, fd)
            .then((res) => {})
            .catch((error) => {});
    }
}
function updateTopCardValues() {
    topCardsData.value.forEach((e) => {
        e.number = ticketDashboard.value[e.key];
    });
}
function onScroll(e) {
    // if (e.scrollTop + e.clientHeight >= e.scrollHeight) {
    //     current_page.value = current_page.value + 1;
    //     isFromAdd.value = false;
    //     getContracts();
    // }
    const el = e.target?.scrollingElement;
    if (!el) return;
    if (current_page.value > 1 && items.value.length >= totalItems.value) return;
    const scrollPercent = (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight);
    if (scrollPercent > 50) {
        getContracts();
    }
}

function updateFilterVal(){
            current_page.value = 1;
            items.value = [];
            getContracts()
}
function getContracts() {
    console.log("contarcts")
    if ((current_page.value > 1 && items.value.length >= totalItems.value) || isLoading.value) return;
    isLoading.value = true;
    const params = { total_record: 50, page: parseInt(current_page.value) };
    console.log("dataa",contractFilter.value.status)
    const requestbody = {
        type: contractFilter.value.status
    };

    baseURlApi
        .post(`contract/client-list`, requestbody, { params: params })
        .then((res) => {
            console.log('res dfata', res.data.data);
            isLoading.value = false;
            serverItemsLength.value = res.data.data.list.total;
            totalItems.value = res.data.data.list.total;
            // ticketDashboard.value = res.data.data.list.data;
            // updateTopCardValues();
            items.value.push(...res.data.data.list.data);
            current_page.value++;
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
function filterData(addedData) {
    // const existing = items.value.find((e) => e.id === editedData.id);
    // if (existing) Object.assign(existing, editedData);
    const existing = items.value.find((e) => e.id === addedData.id);
    if (existing) Object.assign(existing, addedData);
}
function addCustomerData(addedData) {
    isFromAdd.value = true;
    getContracts();
}

//set table height

//open modal
function openAddTicket() {
    router.push({
        name: 'AddTickets'
    });
}
function openEditDialog(id) {
    //  localStorage.setItem("ticketId",id)
    //  console.log("openn")
    router.push({
        name: 'EditTicket',
        params: { id }
    });
    // editcustomer.value?.addaddressData()
}
function openViewDrawer(id) {
    // viewTicketRef.value.openViewTicketDrawer();
    store.SET_TICKET_ID(id);
    store.SET_CUSTOMIZER_DRAWER(!store.Customizer_drawer);
    name.value = viewTicket;
    store.SET_COMPONENT_NAME(name.value);
    store.SET_DRAWER_WIDTH('1000');
}

function openFilterDrawer() {
    store.SET_CUSTOMIZER_DRAWER(!store.Customizer_drawer);
    name.value = filterTicket;
    store.SET_COMPONENT_NAME(name.value);
    store.SET_DRAWER_WIDTH('500');
}
function openChangePasswordDialog(id) {
    changePasswordFromUser.value?.open(id);
}
function cancelClick() {
    deleteDialog.value?.close();
}
function confirmClick() {
    baseURlApi
        .delete(`ticket/delete/${deleteId.value}`)
        .then((res) => {
            deleteDialog.value?.close();
            current_page.value = 1;
            items.value = [];
            getContracts();
            showSnackbar.value = true;
            isSnackbar.value = true;
            message.value = res.data.message;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
        })
        .catch((error) => {
            deleteDialog.value?.close();
            showSnackbar.value = true;
            isSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}

//delete user
function deleteTicket(id) {
    deleteId.value = id;
    deleteDialog.value?.open();
}
onMounted(() => {
    getContracts();
});

//  filters.value = computed(() => {
//       return bus.value.get('filterdata')
// })
// TODO: split routes & remove block below
watch(
    () => route.name,
    (e) => {
        if (e === 'Tickets') {
            current_page.value = 1;
            items.value = [];
            getContracts();
        }
    }
);
watch(
    () => bus.value.get('filterdata'),
    (val) => {
        console.log('val', val);
        //  if(val.is_filter){
        //     is_filter.value = true
        filters.value = val;
        current_page.value = 1;
        items.value = [];
        getContracts();
        //  }
    }
);
// watch(()=>filters.value,(val) => {
//     console.log("cs",val)
//     getContracts()
// })
</script>

<style >
.activefilter .v-input__details{
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
