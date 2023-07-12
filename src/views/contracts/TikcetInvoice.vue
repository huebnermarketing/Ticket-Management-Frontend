<template>
    <div class="text-center">
        <v-dialog v-model="dialog" persistent width="60%">
            <v-card class="overflow-auto">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>
                        Invoice
                     
                    </v-toolbar-title>

                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-container>
                    <div class="mb-6 mt-3">
                        Ledger -
                        <b class="text-h5"
                            >{{ invoiceData?.ledger?.first_name + invoiceData?.ledger?.last_name }} |
                            {{ invoiceData?.ledger?.company_name }} | {{ invoiceData?.ledger?.area }}</b
                        >
                    </div>
                    <v-divider></v-divider>
                    <v-row justify="space-between" class="align-center mb-3 mt-3">
                        <v-col cols="12" lg="4" md="4" sm="4" v-for="card in topCardsData" :key="card.title">
                            <div
                                :class="
                                    'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6  bg-' +
                                    card.bgcolor
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

                    <div class="loading" v-if="isLoading">
                        <v-progress-circular indeterminate color="white"></v-progress-circular>
                        <span class="ml-2">Loading</span>
                    </div>
                    <v-row class="mt-4 mb-4">
                        <v-col cols="12">
                            <v-form @submit.prevent="addPayAmount()" ref="invoiceForm">
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-label class="font-weight-medium text-capitalize required mb-4 mr-2">Pay</v-label>
                                        <v-text-field
                                            v-model="amount"
                                            variant="outlined"
                                            color="primary"
                                            :rules="amountRule"
                                            @input="remainAmount"
                                            v-bind="amountFormat"
                                        >
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" class="position-relative">
                                        <v-label class="font-weight-medium text-capitalize required mb-4 mr-2">due date</v-label>
                                        <flat-pickr
                                            id="projectStartDate"
                                            noCalendar="true"
                                            v-model="dueDate"
                                            class="v-field__input end-d"
                                            @input="isEmptyStartDate = false"
                                            :class="isEmptyStartDate ? 'custom-border-color' : ''"
                                            :config="startDateConfig"
                                            :rules="requiredrule"
                                        />

                                        <div class="flat-calender" data-toggle>
                                            <CalendarIcon width="21" stroke-width="1.5" />
                                        </div>
                                        <div class="v-input__details" v-if="isEmptyStartDate">
                                            <div class="v-messages text-error custom-err">
                                                <div class="v-messages__message custom-err" style="transform-origin: center top 0px">
                                                    This field is required.
                                                </div>
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">payment mode</v-label>
                                        <v-select
                                            v-model="paymentMode"
                                            :items="paymentModeOptions"
                                            item-title="name"
                                            item-value="value"
                                            return-object
                                            single-line
                                            variant="outlined"
                                            label="Please select payment mode"
                                            :rules="ticketdropdownrule"
                                        ></v-select>
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
                    </v-row>
                    <v-divider></v-divider>
                    <div id="infinite-list">
                        <!-- :search-value="searchValue" -->
                        <!-- //:server-items-length="serverItemsLength" // -->
                        <EasyDataTable
                            :rows-per-page="10000"
                            sticky
                            fixed
                            :headers="headers"
                            :fixed-headers="true"
                            :hide-footer="true"
                            :items="items"
                            :theme-color="themeColor"
                            table-class-name="customize-table"
                            ref="refUserListTable"
                            
                        >
                            <template #item-ledger_unique_id="{ ledger_unique_id }">
                                <div class="player-wrapper text-capitalize">
                                    {{ ledger_unique_id }}
                                </div>
                            </template>
                            <template #item-date="{ date }">
                                <div class="player-wrapper text-capitalize">
                                    {{ date }}
                                </div>
                            </template>
                            <template #item-ledger_amount="{ ledger_amount }">
                                <div class="player-wrapper">
                                    {{ ledger_amount }}
                                </div>
                            </template>
                            <template #item-payment_mode="{ payment_mode }">
                                <div class="player-wrapper text-capitalize">
                                    {{ payment_mode }}
                                </div>
                            </template>
                        </EasyDataTable>
                    </div>
                </v-container>
                <v-spacer></v-spacer>
               <v-col cols="12" class="text-end">
                       <v-btn color="error" class="mr-3" style="background: white" @click="closeDialog()" v-if="!issubmit"
                            >Close</v-btn
                        >
               </v-col>
            </v-card>
        </v-dialog>
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
    </div>
</template>
<script setup>
import { ref, defineExpose, defineComponent, onMounted, computed } from 'vue';
import { Form } from 'vee-validate';
import { baseURlApi } from '@/api/axios';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
import Vue3EasyDataTable from 'vue3-easy-data-table';
const themeColor = ref('rgb(var(--v-theme-secondary))');
import 'vue3-easy-data-table/dist/style.css';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { date } from 'yup/lib/locale';

const { ticketdropdownrule } = formValidationsRules();

const dialog = ref(false);
const isLoading = ref(false);

//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

const items = ref([]);
const amountFormat = ref({
    prefix: ' ',
    masked: false
});
const issubmit = ref(false);
const invoiceForm = ref();
const amount = ref('');
const topCardsData = ref([]);
const paymentMode = ref([]);
const paymentModeOptions = ref([]);
const contractsId = ref(0);
const headers = ref([
    { text: 'Ledger Invoice Id', value: 'ledger_unique_id' },
    { text: 'Date', value: 'date' },
    { text: 'Amount', value: 'ledger_amount' },
    { text: 'Payment Mode', value: 'payment_mode' }
]);
const invoiceData = ref([]);
const startDateConfig = ref({
    wrap: 'true',
    disableMobile: 'true',
    dateFormat: 'Y-m-d',
    altFormat: 'd-m-Y',
    alt: 'true',
    defaultDate: 'today'
});
const selectedDate = ref(null);
const isEmptyStartDate = ref(false);
const dueDate = ref('');

const amountRule = ref([
    (value) => {
        if (value) return true;
        return 'This field is required.';
    },
    (value) => {
        if (isNaN(value) == false) return true;
        return 'This field must be a numeric value.';
    },
    (value) => {
        if (parseInt(value) >= 0) return true;
        return 'This field must be a positive value.';
    },
    (value) => {
        if (parseInt(value) !== 0) return true;
        return 'This field must be greater than zero.';
    },
    (value) => {
        if (parseInt(value) <= invoiceData.value.outstanding_amount) return true;
        return 'Pay amount should not be greater than outstanding amount.';
    }
]);

/************************************************* methods ***********************************/

function closeDialog() {
    topCardsData.value = [];
    invoiceForm.value?.reset();
    dialog.value = false;
}
function getCurrency() {
    baseURlApi
        .get('settings/company/get-currency')
        .then((res) => {
            amountFormat.value.prefix = res.data.data.currency.symbol + ' ';
            topCardsData.value.push(
                {
                    title: 'Contract Amount',
                    key: 'contract_amount',
                    number: invoiceData.value.contract_amount,
                    bgcolor: 'lightprimary',
                    textcolor: 'primary',
                    prefix: amountFormat.value?.prefix
                },
                {
                    title: 'Paid Amount',
                    key: 'paid_amount',
                    number: invoiceData.value.paid_amount,
                    bgcolor: 'lightwarning',
                    textcolor: 'warning',
                    prefix: amountFormat.value?.prefix
                },
                {
                    title: 'Outstanding Amount',
                    key: 'outstanding_amount',
                    number: invoiceData.value.outstanding_amount,
                    bgcolor: 'lightprimary',
                    textcolor: 'primary',
                    prefix: amountFormat.value?.prefix
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
function getUsersData(contractID) {
    contractsId.value = parseInt(contractID);
    isLoading.value = true;
    baseURlApi
        .get(`contract/invoices/get-details/${contractID}`)
        .then((res) => {
            isLoading.value = false;
            dueDate.value = startDateConfig.value.defaultDate;
            items.value = res.data.data.invoices;
            invoiceData.value = res.data.data;
            paymentModeOptions.value = res.data.data.payment_mode;
            getCurrency();
        })
        .catch((error) => {
            isLoading.value = false;
        });
}
async function addPayAmount() {
    const { valid } = await invoiceForm.value?.validate();
    if (dueDate.value == '') {
        isEmptyStartDate.value = true;
    }
    if (valid && dueDate.value !== '') {
        issubmit.value = true;

        const requestBody = {
            contract_id: contractsId.value,
            pay_amount: parseInt(amount.value),
            date: dueDate.value,
            payment_mode: paymentMode.value
        };
        baseURlApi
            .post('contract/invoices/pay-invoice', requestBody)
            .then((res) => {
                const contractId = contractsId.value;
                topCardsData.value = [];
                getUsersData(contractId);
                issubmit.value = false;
                isSnackbar.value = true;
                showSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            })
            .catch((error) => {
                issubmit.value = false;
                isSnackbar.value = true;
                showSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function open() {
    dialog.value = true;
}
defineExpose({
    open,
    // getCurrency,
    getUsersData
});
</script>
<style>
.users-profile-image {
    object-fit: cover !important;
    width: inherit !important;
}
</style>

