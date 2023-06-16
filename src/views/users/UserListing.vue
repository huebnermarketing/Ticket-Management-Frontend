<template>
    <v-row>
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
                            <PlusIcon stroke-width="1.5" size="20" class="text-white" />Add User
                        </v-btn>
                        <!-- <v-btn btn color="primary">
                            <FilterIcon stroke-width="1.5" size="20" class="text-white" />
                        </v-btn> -->
                    </div>
                </v-col>
            </v-row>
            <!-- style="height:300px !important; overflow-y: scroll !important" -->

            <div v-if='current_page > 1'>
                <transition name="fade">
                    <div class="loading" v-if="isLoading">
                        <v-progress-circular indeterminate color="white"></v-progress-circular> <span class="ml-2">Loading</span>
                    </div>
                </transition>
            </div>
            <!-- <div id="infinite-list" style="max-height: calc(100vh - 484px); overflow-y: auto"> -->
            <div id="infinite-list">
                <!-- :search-value="searchValue" -->
                <!-- //:server-items-length="serverItemsLength" // -->
                <EasyDataTable
                    :rows-per-page="1000"
                    sticky
                    fixed
                    :headers="headers"
                    :fixed-headers="true"
                    :hide-footer="true"
                    :items="items"
                    :theme-color="themeColor"
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
                    <template #item-user_type="{ role }">
                        <div class="player-wrapper text-capitalize">
                            <v-chip :color="role.id == 1 ? 'primary' : role.id == 2 ? 'secondary' : role.id == 3 ? 'green' : ''">{{
                                role.display_name
                            }}</v-chip>
                        </div>
                    </template>
                     <template #item-status="{ is_active }">
                        <div class="player-wrapper text-capitalize">
                            <v-chip :color="is_active == 1 ? 'primary' : 'secondary'">{{
                                is_active == 1 ? 'Active' : 'Inactive'
                            }}</v-chip>
                        </div>
                    </template>
                    <template #item-action="{ id , role }">
                        <div class="d-flex align-center" v-if="id !== user.id && role.id >= user.roles[0].id">
                            <v-tooltip text="Edit">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="table-icons-common" icon flat @click="openEditDialog(id,role.id)" v-bind="props"
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
                            <v-tooltip text="Change password">
                                <template v-slot:activator="{ props }">
                                    <v-btn class="table-icons-common" icon flat @click="openChangePasswordDialog(id)" v-bind="props"
                                        ><LockIcon stroke-width="1.5" size="20" class="text-primary"
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
        <addUser ref="adduser" @addUserClicked="addUsersData" />
        <editUser ref="edituser" @updateClicked="filterData" />
        <changePassword ref="changePasswordFromUser" />
    </v-row>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { baseURlApi } from '@/api/axios';
import addUser from '@/views/users/addUser.vue';
import editUser from '@/views/users/editUser.vue';
import changePassword from './changePassword.vue';
// import changePassword from '@/views/users/changePassword.vue';
import dialogBox from '@/components/TicketComponents/dialog.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import 'vue3-easy-data-table/dist/style.css';
const themeColor = ref('rgb(var(--v-theme-secondary))');

const page = ref({ title: 'Users' });
const isOpenDialog = ref(false);

/*Login user detail*/
const user = JSON.parse(localStorage.getItem('user'))

//dialog props
const dialogTitle = ref('Are you sure you want to delete this user ?');
const dialogText = ref('This will delete this user permanently, you can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Delete');
const title = ref('Delete User');
const editId = ref(0);

//refs
const adduser = ref();
const edituser = ref();
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
    { text: 'User type', value: 'user_type' },
    { text: 'Status', value: 'status'},
    { text: 'Action', value: 'action' }
]);
const serverItemsLength = ref(50);
const current_page = ref(1);
const sortBy = 'email';
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
//get users
function searchUser() {
    const fd = new FormData();
    if (searchValue.value.length > 0) {
        fd.append('search_key', searchValue.value);
        baseURlApi
            .post(`user/search-user?total_record=${current_page.value}`, fd)
            .then((res) => {})
            .catch((error) => {
                showSnackbar.value = true;
                isSnackbar.value = true;
                message.value = error.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function getUsers() {
    isLoading.value = true;
    // const params = { total_record: 50, page: parseInt(current_page.value) };
    baseURlApi
        .get('/user/get-users')
        .then((res) => {
            isLoading.value = false;
            serverItemsLength.value = res.data.data.total;
            items.value = res.data.data.data;
            // let itemsData = [];
            // console.log(res.data.data.data
            // )
            // if (isFromAdd.value) {
            //     let newArray = [].concat(JSON.parse(JSON.stringify(items.value)), res.data.data.data);

            //     // Declare an empty object
            //     let uniqueObject = {};

            //     // Loop for the array elements
            //     for (let i in newArray) {
            //         // Extract the title
            //         let objid = newArray[i]['id'];

            //         // Use the title as the index
            //         uniqueObject[objid] = newArray[i];
            //     }

            //     // Loop to push unique object into array
            //     for (let i in uniqueObject) {
            //         itemsData.push(uniqueObject[i]);
            //     }
            // } else {
            //     itemsData = Array.from([].concat(JSON.parse(JSON.stringify(items.value)), res.data.data.data));
            // }
            // console.log(itemsData)
            // items.value = itemsData.slice();
            // items.value = JSON.parse(JSON.stringify(items.value));
            // const proxy = new Proxy(items.value, {
            //     get(target, prop, receiver) {
            //         return target[prop];
            //     }
            // });
            // items.value = [...proxy];
            // items.value = [...JSON.parse(JSON.stringify(items.value))];
        })
        .catch((error) => {
            isLoading.value = false;
            showSnackbar.value = true;
            isSnackbar.value = true;
            message.value = error.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}

function filterData(editedData) {
    getUsers();
    // const existing = items.value.find((e) => e.id === editedData.id);
    // if (existing) Object.assign(existing, editedData);
}
function addUsersData(addedData) {
    // isFromAdd.value = true;
    getUsers();
}

//set table height

//open modal
function openAddUserDialog() {
    adduser.value?.open();
    adduser.value?.getRoles();
}
function openEditDialog(id,roleId) {
    editId.value = id;
    edituser.value?.getRoles();
    edituser.value?.open();
    edituser.value?.getUsersData(id,roleId);
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
            showSnackbar.value = true
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
        })
        .catch((error) => {
            deleteDialog.value?.close();
            showSnackbar.value = true
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
    // const listElm = document.querySelector('#infinite-list');
    // listElm.addEventListener('scroll', (e) => {
    //     if (items.value.length < serverItemsLength.value) {
    //         if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    //             console.log("scrolled")
    //             current_page.value = current_page.value + 1;
    //             isFromAdd.value = false;
    //             getUsers();
    //         }
    //     }
    // });
    getUsers();
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
</style>
