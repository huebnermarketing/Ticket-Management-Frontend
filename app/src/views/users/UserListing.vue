<template>
    <v-row>
        <v-col cols="12" md="12">
            <v-row justify="space-between" class="align-center mb-3">
                <v-col cols="12" lg="4" md="6">
                    <v-text-field density="compact" v-model="searchValue" label="Search" hide-details variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <div class="d-flex gap-2 justify-end">
                        <v-btn btn color="primary" @click="updateDialog()">
                            <PlusIcon stroke-width="1.5" size="20" class="text-white" />Add User
                        </v-btn>
                        <v-btn btn color="primary">
                            <FilterIcon stroke-width="1.5" size="20" class="text-white" />
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <EasyDataTable
                :server-items-length="serverItemsLength"
                :headers="headers"
                :items="items"
                :theme-color="themeColor"
                :search="searchField"
                :search-value="searchValue"
                :rows-per-page="10"
                table-class-name="customize-table"            
            >
                <!-- slot name for item is #item-{headername.value} = {"items from items array"} -->
                <template #item-name="{ first_name, last_name }">
                    <div class="player-wrapper text-capitalize">
                        {{ first_name + ' ' + last_name }}
                    </div>
                </template>
                <template #item-mobile="{ phone }">
                    <div class="player-wrapper text-capitalize">
                        {{ phone }}
                    </div>
                </template>
                <template #item-email="{ email }">
                    <div class="player-wrapper">
                        {{ email }}
                         {{id}}
                    </div>
                </template>
                <template #item-user_type="{ role }">
                    <div class="player-wrapper text-capitalize">
                        {{ role.display_name }}
                    </div>
                </template>
                <template #item-action ="{ id }">
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
                                <v-btn class="table-icons-common" icon flat @click="deleteItem(item)" v-bind="props"
                                    ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Reset password">
                            <template v-slot:activator="{ props }">
                                <v-btn class="table-icons-common" icon flat @click="openEditDialog()" v-bind="props"
                                    ><StartIcon stroke-width="1.5" size="20" class="text-error"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </template>
            </EasyDataTable>
        </v-col>
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
        <addUser ref="adduser" />
        <editUser ref="edituser" />
    </v-row>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { baseURlApi } from '@/api/axios';
import addUser from '@/views/users/addUser.vue';
import editUser from '@/views/users/editUser.vue'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import 'vue3-easy-data-table/dist/style.css';
const themeColor = ref('rgb(var(--v-theme-secondary))');

const page = ref({ title: 'Users' });
const isOpenDialog = ref(false);
const adduser = ref();
const edituser = ref();
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
    { text: 'Mobile', value: 'mobile' },
    { text: 'Email', value: 'email' },
    { text: 'User type', value: 'user_type', sortable: true },
    { text: 'Action', value: 'action' }
]);
const serverItemsLength = ref(0);

const sortBy = ref('first_name', 'user_type');
const sortType = ref('desc');
const items = ref([]);
const params = {sort_value: sortBy.value, order_by: sortType.value, page: 1 }
const searchField = ref('name','mobile','email')
const searchValue = ref('');
const total_record = ref()
//props for toastification
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const serverOptions = {
  page: 1,
  sort_value: sortBy.value,
  order_by: sortType.value
};
//get users
function getUsers() {
    baseURlApi
        .get('/get-users',  {params})
        .then((res) => {
            console.log('msg', res.data.data);
            items.value = res.data.data.data;
            serverItemsLength.value = res.data.data.total
            message.value = res.data.message;
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
        })
        .catch((error) => {
            isSnackbar.value = true;
            message.value = error.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
//open modal
function updateDialog() {
    adduser.value?.open();
}
function openEditDialog(id){
    console.log("idd", id)
    edituser.value?.open();
    edituser.value?.getUsersData(id);
}
onMounted(() => {
    getUsers();
});
</script>

<style>
.vue3-easy-data-table__footer {
    display: none !important;
}
.vue3-easy-data-table__message{
    min-height: calc(100vh - 100px) !important;
}
</style>
