<template>
    <v-row no-gutters>
        <v-col cols="12" md="12">
            <v-row justify="space-between" class="align-center mb-3">
                <v-col cols="12" lg="4" md="6">
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
                    <div class="d-flex gap-2 justify-end">
                        <v-btn btn color="primary" @click="openAddUserDialog()">
                            <PlusIcon stroke-width="1.5" size="20" class="text-white" />Add Customer
                        </v-btn>
                        <!-- <v-btn btn color="primary">
                            <FilterIcon stroke-width="1.5" size="20" class="text-white" />
                        </v-btn> -->
                    </div>
                </v-col>
            </v-row>
            <!-- style="height:300px !important; overflow-y: scroll !important" -->

            <div v-if="current_page > 1">
                <transition name="fade">
                    <div class="loading" v-if="isLoading">
                        <v-progress-circular indeterminate color="white"></v-progress-circular> <span class="ml-2">Loading</span>
                    </div>
                </transition>
            </div>
            <div id="infinite-list" style="max-height: calc(100vh - 484px); overflow-y: auto">
                <!-- :search-value="searchValue" -->
                <EasyDataTable
                    :rows-per-page="-1"
                    sticky
                    fixed
                    :server-items-length="serverItemsLength"
                    :headers="headers"
                    :fixed-headers="true"
                    :hide-footer="true"
                    :items="items"
                    :search-value="searchValue"
                    :theme-color="themeColor"
                    :search="searchField"
                    table-class-name="customize-table"
                    ref="refUserListTable"
                    :loading="isLoading"
                    :sort-by="sortBy"
                    :sort-type="sortType"
                >
                    <!-- slot name for item is #item-{headername.value} = {"items from items array"} -->
                    <template #item-first_name="{ first_name, last_name }">
                        <div class="player-wrapper text-capitalize">
                            {{ first_name + ' ' + last_name }}
                        </div>
                    </template>
                    <template #item-phone="{ phone }">
                        <div class="player-wrapper text-capitalize">
                            {{ phone }}
                        </div>
                    </template>
                    <template #item-email="{ email }">
                        <div class="player-wrapper">
                            {{ email }}
                        </div>
                    </template>
                     <template #item-company_name="{ company_name }">
                        <div class="player-wrapper">
                            {{ company_name }}
                        </div>
                    </template>
                    <template #item-action="{ id }">
                        <div class="d-flex align-center">
                            <v-tooltip text="Edit">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="table-icons-common" icon flat @click="openEditDialog(id)" v-bind="props"
                                        ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                    /></v-btn>
                                </template>
                            </v-tooltip>
                            <v-tooltip text="Delete">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="table-icons-common" icon flat @click="deleteUser(id)" v-bind="props"
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
</template>
<script setup>
import { onMounted, ref, watch, defineExpose } from 'vue';
import { baseURlApi } from '@/api/axios';
import addCustomer from '@/views/customers/AddCustomer.vue';
import editCustomer from '@/views/customers/EditCustomer.vue';
import dialogBox from '@/components/TicketComponents/dialog.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import 'vue3-easy-data-table/dist/style.css';
const themeColor = ref('rgb(var(--v-theme-secondary))');

const page = ref({ title: 'Users' });
const isOpenDialog = ref(false);

//dialog props
const dialogTitle = ref('Are you sure you want to delete this user ?');
const dialogText = ref('This will delete this user permanently, you can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Delete');
const title = ref('Delete User');
const editId = ref(0);

//refs
const addcustomer = ref();
const editcustomer = ref();
const changePasswordFromUser = ref();
const deleteDialog = ref();
const refUserListTable = ref();

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
    { text: 'Name', value: 'first_name', sortable: true },
    { text: 'Mobile', value: 'phone', sortable: true },
    { text: 'Email', value: 'email', sortable: true },
    { text: 'Company Name', value: 'company_name', sortable: true },
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
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

const tableHeight = ref(0);
//get users
function searchUser() {
    const fd = new FormData();
    if(searchValue.value.length > 0){
    fd.append('search_key', searchValue.value);
    baseURlApi
        .post(`customer/search?total_record=${current_page.value}`, fd)
        .then((res) => {
            console.log('res', res);
        })
        .catch((error) => {});
    }
}
function getUsers() {
    isLoading.value = true;
    const params = { total_record: 50, page: parseInt(current_page.value) };
    baseURlApi
        .get('customer/list', { params })
        .then((res) => {
            isLoading.value = false;
            serverItemsLength.value = res.data.data.total;
            let itemsData = [];
            if (isFromAdd.value) {
                let newArray = [].concat(JSON.parse(JSON.stringify(items.value)), res.data.data.data);

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
                itemsData = Array.from([].concat(JSON.parse(JSON.stringify(items.value)), res.data.data.data));
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
        })
        .catch((error) => {
            isLoading.value = false;
            isSnackbar.value = true;
            message.value = error.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function filterData(editedData) {
    const existing = items.value.find((e) => e.id === editedData.id);
    if (existing) Object.assign(existing, editedData);
}
function addCustomerData(addedData) {
    isFromAdd.value = true;
    getUsers();
}

//set table height

//open modal
function openAddUserDialog() {
    addcustomer.value?.open();
}
function openEditDialog(id) {
    editId.value = id;
    editcustomer.value?.open();
    editcustomer.value?.getCustomersData(id);
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
        .delete(`user/delete-user/${deleteId.value}`)
        .then((res) => {
            deleteDialog.value?.close();
            getUsers();
            message.value = res.data.message;
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
        })
        .catch((error) => {
            deleteDialog.value?.close();
            isSnackbar.value = true;
            message.value = error.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
//delete user
function deleteUser(id) {
    deleteId.value = id;
    deleteDialog.value?.open();
}
onMounted(() => {
    const listElm = document.querySelector('#infinite-list');
    listElm.addEventListener('scroll', (e) => {
        if (items.value.length < serverItemsLength.value) {
            if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                console.log("scrolled")
                current_page.value = current_page.value + 1;
                isFromAdd.value = false;
                getUsers();
            }
        }
    });
    getUsers();
});
</script>

<style>
.vue3-easy-data-table__footer {
    display: none !important;
}
.vue3-easy-data-table__message {
    min-height: calc(100vh - 100px) !important;
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
</style>
