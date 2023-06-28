<template>
    <v-row no-gutters>
        <v-col cols="12" md="12" lg="12">
            <!---------------------------------- Add new tiket status --------------------------------->
            <v-form @submit.prevent="addProblems()" ref="ticketStatusForm" style="padding: 16px 12px">
                <v-row justify="space-between" class="align-center mb-3">
                    <v-col cols="12" md="6" lg="6">
                        <div class="d-flex">
                            <v-label class="font-weight-medium text-capitalize required mb-4 mr-2">Add new ticket status</v-label>
                            <v-text-field
                                required
                                name="ticketStatus"
                                v-model="ticketStatus"
                                variant="outlined"
                                color="primary"
                                :rules="requiredrule"
                            >
                            </v-text-field>
                            <!-- <chrome-picker
                                @input="getColorValue()"
                                v-model="ticketStatus.hex"
                                 :value="colors.hex : (colors.hex = hexValue)"
                            />
                            -->
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" lg="6" class="d-flex">
                        <div class="d-flex mb-2">
                            <v-label class="font-weight-medium text-capitalize required mb-4 mr-2">text color</v-label>
                            <label
                                for="txtColor"
                                class="color-display player-wrapper mr-4"
                                :style="{ 'background-color': `${textColor}` }"
                            ></label>

                            <input
                                required
                                class="hide-color"
                                id="txtColor"
                                name="ticketStatus"
                                v-model="textColor"
                                type="color"
                                :rules="requiredrule"
                            />
                        </div>
                        <div class="d-flex mb-2 justify-start ml-5">
                            <v-label class="font-weight-medium text-capitalize required mb-4 mr-2">background color</v-label>
                            <label for="bgColor" class="color-display mr-4" :style="{ 'background-color': `${backgroundColor}` }"></label>
                            <input
                                required
                                class="hide-color"
                                id="bgColor"
                                name="ticketStatus"
                                v-model="backgroundColor"
                                type="color"
                                :rules="requiredrule"
                            />
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn btn color="primary" type="submit" class="mt-1" v-if="!issubmit"> Save </v-btn>
                        <v-btn btn color="primary" disabled class="mt-1" v-if="issubmit"> Save </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
        <v-divider class="mb-5"></v-divider>

        <v-col cols="12" md="12">
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
                        :rows-per-page="300"
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
                        <!------------------------------------- ticekt status -------------------------------------->
                        <template #item-ticket_status="{ status_name, id }">
                            <div class="player-wrapper text-capitalize" v-if="id !== editID">
                                {{ status_name }}
                            </div>
                            <v-text-field
                                v-if="isEditable && id == editID"
                                name="problemType1"
                                v-model="editTicketStatus"
                                variant="outlined"
                                color="primary"
                                class="mt-2"
                                :rules="requiredrule"
                            >
                            </v-text-field>
                        </template>
                        <!------------------------------------- text color -------------------------------------->

                        <template #item-text_color="{ text_color, id }">
                            <div
                                v-if="id !== editID"
                                class="color-display-tb-row mr-4 player-wrapper"
                                :style="{ 'background-color': `${text_color}` }"
                            ></div>
                            <div class="d-flex lbl-txt-color" v-if="isEditable && id == editID">
                                <label
                                    for="txtColor1"
                                    class="color-display-tb-row input-txt-color"
                                    :style="{ 'background-color': `${editTextColor}` }"
                                ></label>

                                <input
                                    required
                                    class="hide-color"
                                    id="txtColor1"
                                    name="ticketStatus"
                                    v-model="editTextColor"
                                    type="color"
                                    :rules="requiredrule"
                                />
                            </div>
                        </template>
                        <!------------------------------------- background color -------------------------------------->

                        <template #item-background_color="{ background_color, id }">
                            <div
                                v-if="id !== editID"
                                class="color-display-tb-row mr-4 player-wrapper"
                                :style="{ 'background-color': `${background_color}` }"
                            ></div>
                            <div v-if="isEditable && id == editID" class="d-flex lbl-txt-color">
                                <label
                                    for="bgColor1"
                                    class="color-display-tb-row mr-4 player-wrapper input-txt-color"
                                    :style="{ 'background-color': `${editBgColor}` }"
                                ></label>
                                <input
                                    required
                                    class="hide-color"
                                    id="bgColor1"
                                    name="ticketStatus"
                                    v-model="editBgColor"
                                    type="color"
                                    :rules="requiredrule"
                                />
                            </div>
                        </template>
                        <template #item-action="{ id, is_lock }">
                            <div class="d-flex align-center" v-if="is_lock == 0">
                                <v-tooltip text="Edit">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-if="id !== editID"
                                            class="table-icons-common"
                                            icon
                                            flat
                                            @click="editProblem(id)"
                                            v-bind="props"
                                            ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                        /></v-btn>
                                    </template>
                                </v-tooltip>
                                <v-tooltip text="Update">
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            v-if="isEditable && id == editID && !isEdit"
                                            class="table-icons-common"
                                            icon
                                            flat
                                            type="submit"
                                            @click="updateTicketStatus(id)"
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
                            <div class="d-flex align-center" v-if="is_lock == 1">
                                <v-tooltip text="Locked">
                                    <template v-slot:activator="{ props }">
                                        <v-btn class="table-icons-common" icon flat v-bind="props" style="cursor: default !important"
                                            ><LockIcon stroke-width="1.5" size="20" class="text-error"
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
import { onMounted, ref, watch, defineExpose, defineComponent } from 'vue';
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
const dialogTitle = ref('Are you sure you want to delete this Ticket Status ?');
const dialogText = ref('This will delete this Ticket Status permanently, you can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Delete');
const title = ref('Delete Ticket Status');

//refs
const deleteDialog = ref();
const contractEditForm = ref();

const headers = ref([
    { text: 'Ticket Status', value: 'ticket_status' },
    { text: 'Text Color', value: 'text_color' },
    { text: 'Background Color', value: 'background_color' },
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
const ticketStatusForm = ref();
const issubmit = ref(false);
const editID = ref(0);
const isEdit = ref(false);
const textColor = ref('#ffffff');
const istextColor = ref(false);
const isbgColor = ref(false);
const backgroundColor = ref('#000000');

const ticketStatus = ref('');
const editTicketStatus = ref('');
const editTextColor = ref('');
const editBgColor = ref('');

//update
async function updateTicketStatus(id) {
    const { valid } = await contractEditForm.value?.validate();
    if (valid) {
        isEdit.value = true;
        const requestBody = {
            status_name: editTicketStatus.value,
            background_color: editBgColor.value,
            text_color: editTextColor.value
        };
        baseURlApi
            .post(`settings/ticket-status/update/${id}`, requestBody)
            .then((res) => {
                isEdit.value = false;
                isEditable.value = false;
                // message.value = res.data.message;
                // isSnackbar.value = true;
                // icon.value = 'mdi-check-circle';
                // color.value = 'success';
                getTicketStatus();
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
function editProblem(id) {
    baseURlApi
        .get(`settings/ticket-status/edit/${id}`)
        .then((res) => {
            editID.value = id;
            isEditable.value = true;
            editTicketStatus.value = res.data.data.status_name;
            editTextColor.value = res.data.data.text_color;
            editBgColor.value = res.data.data.background_color;
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
function getTicketStatus() {
    isLoading.value = true;
    // isSnackbar.value = false;
    baseURlApi
        .get('settings/ticket-status/list')
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

function focusChange() {
    console.log('focusde');
}
//cancel update
function cancelUpdate(id) {
    isEditable.value = false;
    editID.value = 0;
    // getTicketStatus();
}

//add ticket status
async function addProblems() {
    // isSnackbar.value = false;
    const { valid } = await ticketStatusForm.value?.validate();
    if (valid) {
        issubmit.value = true;
        const requestBody = {
            status_name: ticketStatus.value,
            background_color: backgroundColor.value,
            text_color: textColor.value
        };
        baseURlApi
            .post('settings/ticket-status/add', requestBody)
            .then((res) => {
                issubmit.value = false;
                showSnackbar.value = true;
                isSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                message.value = res.data.message;
                color.value = 'success';
                ticketStatusForm.value?.reset();
                ticketStatusForm.value?.resetValidation();
                getTicketStatus();
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
        .delete(`settings/ticket-status/delete/${deleteId.value}`)
        .then((res) => {
            deleteDialog.value?.close();
            getTicketStatus();
            showSnackbar.value = true;
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            message.value = res.data.message;
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
    getTicketStatus();
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
.color-display {
    width: 70px;
    height: 50px;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    margin-bottom: 12px;
}
.color-display-tb-row {
    width: 50px;
    height: 35px;
    border-radius: 12px;
    border: 1px solid #e0e0e0;
    margin-bottom: 12px;
}
.lbl-txt-color {
    border: 1px solid #e0e0e0;
    margin-bottom: 13px;
    border-radius: 5px;
}
.input-txt-color {
    margin: 5px;
}
.hide-color{
    visibility: hidden;
    opacity: 0;
    width: 0;
    height: 0;

}
@media only screen and (max-width: 500px) {
    .color-display {
        margin: 0 !important;
        text-align: center;
        width: 100% !important;
        height: 60px !important;
        margin-bottom: 12px;
    }
}
</style>
