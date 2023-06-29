
<template>
    <v-container v-scroll="onScroll" fluid class="pa-0">
        <v-row no-gutters v-show="router.currentRoute.value.name === 'Tickets'">
            <v-col cols="12" md="12">
                <v-row justify="space-between" class="align-center mb-3">
                    <v-col cols="12">
                        <!-- <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb> -->

                        <TopCards :topCardsData="topCardsData" />
                    </v-col>
                    <!-- <v-col cols="12" lg="4" md="6">
                        <v-text-field
                            density="compact"
                            @input="searchUser()"
                            v-model="searchValue"
                            label="Search"
                            hide-details
                            variant="outlined"
                        ></v-text-field>
                    </v-col> -->
                    <v-col cols="12" md="12">
                        <div class="d-flex gap-2 justify-end">
                            <v-btn btn color="primary" @click="openAddTicket()">
                                <PlusIcon stroke-width="1.5" size="20" class="text-white" />Add Ticket
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
                        ref="refCustomerListTable"
                        :loading="isLoading && current_page === 1"
                        :sort-by="sortBy"
                        :sort-type="sortType"
                        must-sort
                    >
                        <!-- slot name for item is #item-{headername.value} = {"items from items array"} -->
                        <template #item-id="{ unique_id }">
                            <div class="player-wrapper text-capitalize">
                                #{{ unique_id }}
                            </div>
                        </template>
                        <template #item-customer_name="{ customer }">
                            <div class="player-wrapper text-capitalize">
                                {{ customer.first_name + ' ' + customer.last_name }}
                            </div>
                        </template>
                        <template #item-problem_title="{ problem_title }">
                            <div class="player-wrapper text-capitalize">
                                {{ problem_title }}
                            </div>
                        </template>
                        <template #item-mobile="{ customer }">
                            <div class="d-none">
                                {{
                                    customer.phones.map((data) => {
                                        if (data.is_primary == 1) {
                                            mobile = data.phone;
                                        }
                                    })
                                }}
                            </div>
                            <div class="player-wrapper">
                                {{ mobile }}
                            </div>
                        </template>
                        <template #item-company_name="{ customer_location }">
                            <div class="player-wrapper">
                                {{ customer_location.company_name }}
                            </div>
                        </template>
                        <template #item-due_date="{ due_date }">
                            <div class="player-wrapper">
                                {{ due_date }}
                            </div>
                        </template>
                        <template #item-engineer="{ assigned_engineer }">
                            <div class="player-wrapper">
                                <v-avatar size="35" class="border">
                                    <img
                                        v-if="assigned_engineer.profile_photo"
                                        :src="assigned_engineer.profile_photo"
                                        width="35"
                                        alt="Julia"
                                        height="35"
                                        style="object-fit: cover !important"
                                    />
                                    <img
                                        v-if="!assigned_engineer.profile_photo"
                                        src="@/assets/images/profile/user.png"
                                        width="35"
                                        alt="Julia"
                                        height="35"
                                        style="object-fit: cover !important"
                                    />
                                </v-avatar>
                                <span class="ml-2">{{ assigned_engineer.first_name + ' ' + assigned_engineer.last_name }}</span>
                            </div>
                        </template>
                        <template #item-appointment_type="{ appointment_type }">
                            <div class="player-wrapper">
                                {{ appointment_type.appointment_name }}
                            </div>
                        </template>
                        <template #item-priority="{ ticket_priority }">
                            <div class="player-wrapper">
                                <!-- :color="ticket_priority.id == 1 ? 'error' :ticket_priority.id == 3 ? 'warning' : 'success'" -->
                                <v-chip :color="'#fff'">
                                    <!-- <ArrowNarrowUpIcon v-if="ticket_priority.id == 1" stroke-width="1.5" size="20" class="text-error" /> -->
                                    <img src="@/assets/images/svgs/High.svg" alt="icon" v-if="ticket_priority.unique_id == 10001" />
                                    <img src="@/assets/images/svgs/Low.svg" alt="icon" v-if="ticket_priority.unique_id == 10002" />
                                    <img src="@/assets/images/svgs/Medium.svg" alt="icon" v-if="ticket_priority.unique_id == 10003" />

                                    <!-- <ArrowNarrowDownIcon v-if="ticket_priority.id == 2" stroke-width="1.5" size="20" class="text-success" /> -->
                                </v-chip>
                            </div>
                        </template>
                        <template #item-ticket_status="{ ticket_status }">
                            <div class="player-wrapper">
                                <v-chip :color="'primary'">{{ ticket_status.status_name }} </v-chip>
                            </div>
                        </template>
                        <template #item-payment_status="{ payment_status }">
                            <div class="player-wrapper">
                                <v-chip :color="payment_status.background_color" :text-color="payment_status.text_color"
                                    >{{ payment_status.payment_type }}
                                </v-chip>
                            </div>
                        </template>
                        <!-- <template #item-company_name="{ company_name }">
                            <div class="player-wrapper">
                                {{ company_name }}
                            </div>
                        </template> -->
                        <template #item-action="{ id }">
                            <div class="d-flex align-center">
                                <v-tooltip text="View">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="table-icons-common" icon flat @click="openEditDialog(id)" v-bind="props"
                                            ><EyeIcon stroke-width="1.5" size="20" class="text-primary"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Edit">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="table-icons-common" icon flat @click="openEditDialog(id)" v-bind="props"
                                            ><PencilIcon stroke-width="1.5" size="20" class="text-secondary"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Delete">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="table-icons-common" icon flat @click="deleteTicket(id)" v-bind="props"
                                            ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                        /></v-btn>
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
            <addCustomer ref="addcustomer" @addCustomerClicked="addCustomerData" />
            <editCustomer ref="editcustomer" @updateClicked="filterData" />
        </v-row>
        <router-view />
    </v-container>
</template>
<script setup>
import { onMounted, ref, watch, defineExpose, onUpdated } from 'vue';
import { baseURlApi } from '@/api/axios';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import TopCards from '@/components/cards/TopCards.vue';

// import addCustomer from '@/views/customers/AddCustomer.vue';
// import editCustomer from '@/views/customers/EditCustomer.vue';
import dialogBox from '@/components/TicketComponents/dialog.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import 'vue3-easy-data-table/dist/style.css';
import { router } from '@/router';
const themeColor = ref('rgb(var(--v-theme-secondary))');

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
const addcustomer = ref();
const editcustomer = ref();
const changePasswordFromUser = ref();
const deleteDialog = ref();
const refCustomerListTable = ref();
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
        title: 'Unresolved',
        key: 'unresolved',
        number: ticketDashboard.value.unresolved,
        bgcolor: 'lightprimary',
        textcolor: 'primary'
    },
    {
        title: 'Overdue',
        key: 'overdue',
        number: ticketDashboard.value.overdue,
        bgcolor: 'lightwarning',
        textcolor: 'warning'
    },
    {
        title: 'Due Today',
        key: 'due_today',
        number: ticketDashboard.value.due_today,
        bgcolor: 'lightprimary',
        textcolor: 'primary'
    },
    {
        title: 'Due This Week',
        key: 'due_this_week',
        number: ticketDashboard.value.due_this_week,
        bgcolor: 'lightwarning',
        textcolor: 'warning'
    },
    {
        title: 'Partially Paid',
        key: 'partially_paid',
        number: ticketDashboard.value.partially_paid,
        bgcolor: 'lightprimary',
        textcolor: 'primary'
    },
    {
        title: 'Unpaid',
        key: 'unpaid',
        number: ticketDashboard.value.unpaid,
        bgcolor: 'lightwarning',
        textcolor: 'warning'
    }
]);

const headers = ref([
    { text: 'Id', value: 'id'},
    { text: 'Customer Name', value: 'customer_name' },
    { text: 'Problem Title', value: 'problem_title'},
    { text: 'Mobile', value: 'mobile'},
    { text: 'Company Name', value: 'company_name'},
    { text: 'Due Date', value: 'due_date'},
    { text: 'Engineer', value: 'engineer'},
    { text: 'Appointment Type', value: 'appointment_type'},
    { text: 'Priority', value: 'priority'},
    { text: 'Ticket Status', value: 'ticket_status'},
    { text: 'Payment Status', value: 'payment_status'},
    { text: 'Action', value: 'action' }
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
const totalItems = ref(0)
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
        e.number = ticketDashboard.value[e.key]
    })
}
function onScroll(e) {
    // if (e.scrollTop + e.clientHeight >= e.scrollHeight) {
    //     current_page.value = current_page.value + 1;
    //     isFromAdd.value = false;
    //     getTickets();
    // }
    const el = e.target?.scrollingElement
    if (!el) return
    if (current_page.value > 1 && items.value.length >= totalItems.value) return
    const scrollPercent =
        (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
    if (scrollPercent > 50) {
        getTickets()
    }
}
function getTickets() {
    if (current_page.value > 1 && (items.value.length >= totalItems.value) || isLoading.value) return
    isLoading.value = true;
    const params = { total_record: 50, page: parseInt(current_page.value) };
    baseURlApi
        .get('ticket/list', { params })
        .then((res) => {
            isLoading.value = false;
            console.log('dataa11', res.data.data.allTicket.data);
            serverItemsLength.value = res.data.data.allTicket.total;
            totalItems.value = res.data.data.allTicket.total
            
            ticketDashboard.value = res.data.data.ticketDashboard;
            updateTopCardValues()
            if (0){
                let itemsData = [];
                if (isFromAdd.value) {
                    let newArray = [].concat(JSON.parse(JSON.stringify(items.value)), res.data.data.allTicket.data);

                    // Declare an empty object
                    let uniqueObject = {};

                    // Loop for the array elements
                    for (let i in newArray) {
                        // Extract the title
                        let objid = newArray[i]['id'];

                        // Use the title as the index
                        uniqueObject[objid] = newArray[i];
                    }

                    // Loop to push unique object into array
                    for (let i in uniqueObject) {
                        itemsData.push(uniqueObject[i]);
                    }
                } else {
                    itemsData = Array.from([].concat(JSON.parse(JSON.stringify(items.value)), res.data.data.allTicket.data));
                }
                items.value = itemsData.slice();
                items.value = JSON.parse(JSON.stringify(items.value));
                const proxy = new Proxy(items.value, {
                    get(target, prop, receiver) {
                        return target[prop];
                    }
                });
                items.value = [...proxy];
                items.value = [...JSON.parse(JSON.stringify(items.value))];
            }
            items.value.push(...res.data.data.allTicket.data)
            current_page.value++
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
    getTickets();
}

//set table height

//open modal
function openAddTicket() {
   
    router.push({
        name: 'AddTickets'
    });
}
function openEditDialog(id) {
     localStorage.setItem("ticketId",id)
     console.log("openn")
      router.push({
        name: 'EditTickets',
    });
    // editcustomer.value?.addaddressData()
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
            getTickets();
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
onUpdated(() => {
     const listElm = document.querySelector('#infinite-list');
    listElm.addEventListener('scroll', (e) => {
        if (items.value.length < serverItemsLength.value) {
            if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                current_page.value = current_page.value + 1;
                isFromAdd.value = false;
                getTickets();
            }
        }
    });
    getTickets();
})
//delete user
function deleteTicket(id) {
    deleteId.value = id;
    deleteDialog.value?.open();
}
onMounted(() => {
    // const listElm = document.querySelector('#infinite-list');
    // listElm.addEventListener('scroll', );
    getTickets();
      
});
</script>

<style>
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
