<template>
    <v-row no-gutters>
        <v-col cols="12" md="12">
            <!---------------------------------- Add new contract type --------------------------------->
            <v-form @submit.prevent="addContract()" ref="contractForm">
                <v-row justify="space-between" class="align-center mb-3">
                    <v-col cols="12" md="6" lg="6">
                        <div class="d-flex">
                            <v-label class="font-weight-medium text-capitalize required mb-4 mr-2">Add new contract type</v-label>
                            <v-text-field
                                name="contracttype"
                                v-model="contractType"
                                variant="outlined"
                                color="primary"
                                :rules="requiredrule"
                            >
                            </v-text-field>
                            <v-btn btn color="primary" type="submit" class="ml-2 mt-1" v-if="!issubmit"> Save </v-btn>
                            <v-btn btn color="primary" disabled class="ml-2 mt-1" v-if="issubmit"> Save </v-btn>
                        </div>
                    </v-col>
                    <v-col cols="12" md="3"> </v-col>
                </v-row>
            </v-form>
            <!-- style="height:300px !important; overflow-y: scroll !important" -->

            <div v-if="current_page >= 1">
                <transition name="fade">
                    <div class="loading" v-if="isLoading">
                        <v-progress-circular indeterminate color="white"></v-progress-circular> <span class="ml-2">Loading</span>
                    </div>
                </transition>
            </div>
            <div id="infinite-list">
                <v-form @submit.prevent="" ref="contractEditForm">
                    <EasyDataTable
                        sticky
                        :must-sort="true"
                        :rows-per-page="1000"
                        :server-items-length="serverItemsLength"
                        :headers="headers"
                        :fixed-header="true"
                        :hide-footer="true"
                        :items="items"
                        :search-value="searchValue"
                        :theme-color="themeColor"
                        :search="searchField"
                        table-class-name="customize-table"
                        :loading="isLoading"
                    >
                        <!-- slot name for item is #item-{headername.value} = {"items from items array"} -->
                        <template #item-contract_service_type="{ contract_name, id }">
                            <div class="player-wrapper text-capitalize" v-if="id !== editID">
                                {{ contract_name }}
                            </div>
                            <v-text-field
                                v-if="isEditable && id == editID"
                                name="contracttype1"
                                v-model="editContractType"
                                variant="outlined"
                                color="primary"
                                class="mt-2"
                                :rules="requiredrule"
                            >
                            </v-text-field>
                        </template>
                        <template #item-action="{ id }">
                            <div class="d-flex align-center">
                                <v-tooltip text="Edit">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-if="id !== editID"
                                            class="table-icons-common"
                                            icon
                                            flat
                                            @click="editContract(id)"
                                            v-bind="props"
                                            ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Update">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            type="submit"
                                            v-if="isEditable && id == editID && !isEdit"
                                            class="table-icons-common"
                                            icon
                                            @click="updateContract(id)"
                                            flat
                                            v-bind="props"
                                            ><CheckIcon stroke-width="1.5" size="20" class="text-primary"
                                        /></v-btn>
                                        <v-btn
                                            v-if="isEditable && id == editID && isEdit"
                                            class="table-icons-common"
                                            icon
                                            flat
                                            disabled
                                            v-bind="props"
                                            ><CheckIcon stroke-width="1.5" size="20" class="text-primary"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Cancel">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-if="isEditable && id == editID && !isEdit"
                                            class="table-icons-common"
                                            icon
                                            flat
                                            @click="cancelUpdate(id)"
                                            v-bind="props"
                                            ><XIcon stroke-width="1.5" size="20" class="text-error"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Delete">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-if="id !== editID"
                                            class="table-icons-common"
                                            icon
                                            flat
                                            @click="deleteContract(id)"
                                            v-bind="props"
                                            ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                            </div>
                        </template>
                    </EasyDataTable>
                </v-form>
            </div>
            <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
                <v-icon left>{{ icon }}</v-icon>
                {{ message }}
            </v-snackbar>
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
    </v-row>
</template>
<script setup>
import { onMounted, ref, watch, defineExpose } from 'vue';
import { baseURlApi } from '@/api/axios';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
const { requiredrule } = formValidationsRules();

import dialogBox from '@/components/TicketComponents/dialog.vue';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import 'vue3-easy-data-table/dist/style.css';
const themeColor = ref('rgb(var(--v-theme-secondary))');

const page = ref({ title: 'Users' });
const isOpenDialog = ref(false);

//dialog props
const dialog = ref(false);
const dialogTitle = ref('Are you sure you want to delete this Contract Service Type ?');
const dialogText = ref('This will delete this Contract Service Type permanently, you can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Delete');
const title = ref('Delete Contract Service Type');

//refs
const deleteDialog = ref();
const contractEditForm = ref();

const headers = ref([
    { text: 'Contract Service Type', value: 'contract_service_type' },
    { text: 'Action', value: 'action' }
]);

const items = ref([]);
const deleteId = ref(0);
const isLoading = ref(false);
const resizableDiv = ref();
//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const isEditable = ref(false);
const contractForm = ref();
const issubmit = ref(false);
const editID = ref(0);
const isEdit = ref(false);

const contractType = ref('');
const editContractType = ref('');

//update
async function updateContract(id) {
    const { valid } = await contractEditForm.value?.validate();
    if (valid) {
        isEdit.value = true;
        const requestBody = {
            contract_name: editContractType.value
        };
        baseURlApi
            .post(`settings/contract-type/update/${id}`, requestBody)
            .then((res) => {
                isEdit.value = false;
                isEditable.value = false;
                message.value = res.data.message;
                showSnackbar.value = true;
                isSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
                getContracts();
                editID.value = 0;
                dialog.value = false;
            })
            .catch((error) => {
                editID.value = 0;
                isEdit.value = false;
                isEditable.value = false;
                showSnackbar.value = true;
                isSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}

//get data for prefilled input
function editContract(id) {
    baseURlApi
        .get(`settings/contract-type/edit/${id}`)
        .then((res) => {
            editID.value = id;
            isEditable.value = true;
            const data = res.data.data.contract_name;
            editContractType.value = res.data.data.contract_name;
        })
        .catch((error) => {
            showSnackbar.value = true;
            isSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}

//listing
function getContracts() {
    isLoading.value = true;
    // isSnackbar.value = false;
    baseURlApi
        .get('settings/contract-type/list')
        .then((res) => {
            isLoading.value = false;
            items.value = res.data.data;
            // message.value = res.data.message;
            // isSnackbar.value = true;
            // icon.value = 'mdi-check-circle';
            // color.value = 'success';
        })
        .catch((error) => {
            isLoading.value = false;
            showSnackbar.value = true;
            isSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}

//cancel update
function cancelUpdate(id) {
    isEditable.value = false;
    editID.value = 0;
    // getContracts();
}

//add contract
async function addContract() {
    // isSnackbar.value = false;
    const { valid } = await contractForm.value?.validate();
    if (valid) {
        issubmit.value = true;
        const requestBody = {
            contract_name: contractType.value
        };
        baseURlApi
            .post('settings/contract-type/add', requestBody)
            .then((res) => {
                contractForm.value?.reset();
                contractForm.value?.resetValidation();
                issubmit.value = false;
                showSnackbar.value = true;
                isSnackbar.value = true;
                message.value = res.data.message;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
                getContracts();
                dialog.value = false;
            })
            .catch((error) => {
                issubmit.value = false;
                showSnackbar.value = true;
                isSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}

//cancel delete from dialog
function cancelClick() {
    deleteDialog.value?.close();
}

//confirm delete from dialog
function confirmClick() {
    baseURlApi
        .delete(`settings/contract-type/delete/${deleteId.value}`)
        .then((res) => {
            deleteDialog.value?.close();
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
//delete button click
function deleteContract(id) {
    deleteId.value = id;
    deleteDialog.value?.open();
}
onMounted(() => {
    getContracts();
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
