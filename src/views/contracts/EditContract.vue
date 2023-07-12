<template>
    <div>
        <v-col cols="12">
            <v-col cols="12">
                <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
            </v-col>
            <v-col cols="10" style="margin: 0 auto">
                <div class=" mb-6 mt-3">
                    Edit Contract - <b class="text-h5">{{ selectedCustomerModel?.first_name + selectedCustomerModel?.last_name }} | {{ companyName }} |
                    {{ area }}</b>
                </div>
                <v-card elevation="10" class="t-add-card" rounded="md">
                    <!------------------------------------  form ----------------------------------->
                    <v-row style="padding: 12px">
                        <v-col cols="12">
                            <v-form @submit.prevent="updateContract" ref="updateContractForm">
                                <v-row>
                                    <!---------------------------------- customer name --------------------------------->
                                    <v-col cols="12" md="4">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Customer Name</v-label>
                                        <v-menu open-on-focus>
                                            <template v-slot:activator="{ props }">
                                                <v-text-field
                                                    @click:clear="
                                                        () => {
                                                            customerSearchModel = '';
                                                            selectedCustomerModel = null;
                                                            isExistingCustomer = false;
                                                            selectAddress = '';
                                                            addressLineOne = '';
                                                            area = '';
                                                            city = '';
                                                            zipcode = '';
                                                            state = '';

                                                            countryName = 'India';
                                                            companyName = '';
                                                            mobile = '';
                                                            customerEmail.value = '';
                                                        }
                                                    "
                                                    disabled
                                                    hide-details
                                                    placeholder="Please select customer"
                                                    browser-autocomplete="name"
                                                    name="name"
                                                    v-bind="props"
                                                    v-model="customerSearchModel"
                                                    ref="customInput"
                                                    autocomplete="off"
                                                    :rules="requiredrule"
                                                >
                                                </v-text-field>
                                                <div class="v-input__details" v-if="isEmptyCustomerName">
                                                    <div class="v-messages text-error custom-err">
                                                        <div
                                                            class="v-messages__message custom-err"
                                                            style="transform-origin: center top 0px"
                                                        >
                                                            This field is required.
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </v-menu>
                                    </v-col>
                                    <!---------------------------------- Mobile Number --------------------------------->
                                    <v-col cols="12" md="4">
                                        <!-- :rules="alternativemobilerule" -->
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Mobile Number</v-label>
                                        <v-text-field v-model="mobile" disabled color="primary" variant="outlined" type="text" />
                                    </v-col>
                                    <!---------------------------------- Email ------------------------------------------->
                                    <v-col cols="12" md="4">
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Email ID</v-label>
                                        <v-text-field
                                            v-model="customerEmail"
                                            disabled
                                            color="primary"
                                            variant="outlined"
                                            type="email"
                                            :rules="emailPatternrule"
                                        />
                                    </v-col>
                                    <!----------------------------------------- address details -------------------------->
                                    <v-card elevation="0" variant="outlined">
                                        <v-row style="padding: 12px">
                                            <!---------------------------------- Address --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">choose Address</v-label>
                                                <v-combobox
                                                    label="Please select address"
                                                    v-model="selectAddress"
                                                    :items="addressOptions"
                                                    :item-title="getAddressText"
                                                    item-value="id"
                                                    return-object
                                                    single-line
                                                    disabled
                                                    variant="outlined"
                                                    bg-color="none"
                                                    base-color="none"
                                                    density="comfortable"
                                                    :rules="ticketdropdownrule"
                                                    open-on-clear
                                                    persistent-clear
                                                    persistent-counter
                                                >
                                                    <!-- <template v-slot:selection="{ item }">
                                                        <span>
                                                            {{ item.value?.address_line1}}
                                                        </span>
                                                    </template> -->
                                                    <template v-slot:no-data>
                                                        <v-list-item>
                                                            <v-list-item-title> No results matching </v-list-item-title>
                                                        </v-list-item>
                                                    </template>
                                                </v-combobox>
                                            </v-col>
                                            <!---------------------------------- company name --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize">Company Name</v-label>
                                                <v-text-field
                                                    disabled
                                                    v-model="companyName"
                                                    variant="outlined"
                                                    color="primary"
                                                ></v-text-field>
                                            </v-col>
                                            <!---------------------------------- address line 1 --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">address</v-label>
                                                <v-text-field
                                                    disabled
                                                    v-model="addressLineOne"
                                                    variant="outlined"
                                                    color="primary"
                                                ></v-text-field>
                                            </v-col>
                                            <!---------------------------------- city --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">City</v-label>
                                                <v-text-field v-model="city" disabled variant="outlined" color="primary"></v-text-field>
                                            </v-col>
                                            <!---------------------------------- area --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">area</v-label>
                                                <v-text-field v-model="area" disabled variant="outlined" color="primary"></v-text-field>
                                            </v-col>
                                            <!---------------------------------- state --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">State</v-label>
                                                <v-text-field v-model="state" disabled variant="outlined" color="primary"></v-text-field>
                                            </v-col>
                                            <!---------------------------------- zip code --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">Zip Code</v-label>
                                                <v-text-field v-model="zipcode" disabled variant="outlined" color="primary"></v-text-field>
                                            </v-col>
                                            <!---------------------------------- country --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">Country</v-label>
                                                <v-text-field
                                                    v-model="countryName"
                                                    disabled
                                                    variant="outlined"
                                                    color="primary"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <!---------------------------------------- contract details -------------------------->
                                    <v-card elevation="0" variant="outlined" class="mt-3">
                                        <v-row style="padding: 12px">
                                            <!---------------------------------- contract title --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">contract title</v-label>
                                                <v-text-field
                                                    v-model="contractTitle"
                                                    variant="outlined"
                                                    color="primary"
                                                    :rules="requiredrule"
                                                    maxlength="50"
                                                ></v-text-field>
                                            </v-col>
                                            <!---------------------------------- service type --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">service type</v-label>
                                                <v-combobox
                                                    class="prolem-typ"
                                                    v-model="serviceType"
                                                    v-model:search="searchService"
                                                    :items="serviceTypeOptions"
                                                    :hide-no-data="false"
                                                    item-title="contract_name"
                                                    item-value="id"
                                                    return-object
                                                    clearable="true"
                                                    color="primary"
                                                    chips
                                                    single-line
                                                    variant="outlined"
                                                    multiple
                                                    disabled
                                                    density="comfortable"
                                                    base-color="none"
                                                    label="Please select service type"
                                                    :rules="ticketdropdownrule"
                                                    id="problemCombo"
                                                >
                                                    <!-- <template v-slot:no-data>
                                                        <v-list-item>
                                                            <v-list-item-title>
                                                                No results matching "<strong>{{ searchService }}</strong
                                                                >"
                                                                <div class="mt-2">
                                                                    <v-btn
                                                                        flat
                                                                        class="table-icons-common text-left flat bg-primary"
                                                                        @click.prevent.stop="oneEnterService(e)"
                                                                    >
                                                                        <PlusIcon size="16" class="text-left" /> Add new service type</v-btn
                                                                    >
                                                                </div>
                                                            </v-list-item-title>
                                                        </v-list-item>
                                                    </template> -->
                                                </v-combobox>
                                            </v-col>
                                            <!---------------------------------- contract details --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize">contract details</v-label>
                                                <v-textarea
                                                    v-model="contractDescription"
                                                    auto-grow
                                                    variant="outlined"
                                                    rows="2"
                                                    color="primary"
                                                    row-height="25"
                                                    shaped
                                                    maxlength="500"
                                                ></v-textarea>
                                            </v-col>

                                            <v-divider style="margin: 10px"></v-divider>

                                            <!---------------------------------- product service tabs --------------------------------->
                                            <v-col cols="12" md="12">
                                                <div class="d-flex justify-between">
                                                    <v-col cols="3" md="3">
                                                        <v-label class="mb-2 font-weight-medium text-capitalize">Product Service</v-label>
                                                    </v-col>
                                                    <v-col cols="3" md="3">
                                                        <v-label class="mb-2 font-weight-medium text-capitalize">quantity</v-label>
                                                    </v-col>
                                                    <v-col cols="3" md="3">
                                                        <v-label class="mb-2 font-weight-medium text-capitalize">amount</v-label>
                                                    </v-col>
                                                </div>
                                                <v-form ref="tabsform">
                                                    <div class="d-flex justify-between align" v-for="(items, i) in productTabs" :key="i">
                                                        <v-col cols="3" md="3">
                                                            <div class="">
                                                                <v-combobox
                                                                    class="prolem-typ"
                                                                    v-model="items.selectedProductServiceTab"
                                                                    :items="productServiceTypeOptions"
                                                                    @click:clear="getInitialDataserviceType()"
                                                                    @keydown.enter.capture.prevent.stop
                                                                    :hide-no-data="false"
                                                                    item-title="service_name"
                                                                    item-value="id"
                                                                    return-object
                                                                    clearable="true"
                                                                    color="primary"
                                                                    chips
                                                                    single-line
                                                                    variant="outlined"
                                                                    density="comfortable"
                                                                    base-color="none"
                                                                    label="Please select service type"
                                                                    :rules="ticketdropdownrule"
                                                                    id="problemCombo"
                                                                >
                                                                    <template v-slot:no-data>
                                                                        <v-list-item>
                                                                            <v-list-item-title> No results matching </v-list-item-title>
                                                                        </v-list-item>
                                                                    </template>
                                                                </v-combobox>
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="3" md="3">
                                                            <div class="">
                                                                <v-text-field
                                                                    v-model="items.quantity"
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    type="text"
                                                                    :rules="amountRule"
                                                                />
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="3" md="3">
                                                            <div class="">
                                                                <v-text-field
                                                                    v-model="items.amount"
                                                                    color="primary"
                                                                    variant="outlined"
                                                                    type="text"
                                                                    :rules="amountRule"
                                                                    v-bind="amountFormat"
                                                                />
                                                            </div>
                                                        </v-col>
                                                        <v-col cols="3" md="3">
                                                            <div class="ml-2 d-flex align-center mt-2">
                                                                <button type="submit">
                                                                    <CirclePlusIcon
                                                                        stroke-width="1.5"
                                                                        size="25"
                                                                        class="text-primary cursor-pointer"
                                                                        @click="addInput(i)"
                                                                        v-if="productTabs.length - 1 == i"
                                                                    />
                                                                </button>
                                                                <b-button class="ml-2">
                                                                    <TrashIcon
                                                                        stroke-width="1.5"
                                                                        size="25"
                                                                        class="text-error cursor-pointer"
                                                                        @click="deleteInput(i)"
                                                                        v-if="productTabs.length > 1"
                                                                    />
                                                                </b-button>
                                                            </div>
                                                        </v-col>
                                                    </div>
                                                </v-form>
                                            </v-col>
                                            <v-divider style="margin: 10px"></v-divider>

                                            <!-----------------------------------------
                                                      contract payment details
                                             ------------------------------------------>

                                            <!---------------------------------- contract amount --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">contract amount</v-label>
                                                <v-text-field
                                                    v-model="contractAmount"
                                                    variant="outlined"
                                                    v-bind="amountFormat"
                                                    color="primary"
                                                    :rules="amountRule"
                                                ></v-text-field>
                                            </v-col>
                                            <!---------------------------------- contract duration --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required"
                                                    >contract duration</v-label
                                                >
                                                <v-select
                                                    v-model="contractDuration"
                                                    :items="contractDurationOptions"
                                                    item-title="display_name"
                                                    item-value="id"
                                                    return-object
                                                    single-line
                                                    disabled
                                                    variant="outlined"
                                                    label="Please select contract duration"
                                                    :rules="ticketdropdownrule"
                                                ></v-select>
                                            </v-col>
                                            <!---------------------------------- payment term --------------------------------->
                                            <v-col cols="12" md="6">
                                                <v-label class="mb-2 font-weight-medium text-capitalize required">payment term</v-label>
                                                <v-select
                                                    v-model="paymentTerm"
                                                    :items="paymentTermOptions"
                                                    item-title="display_name"
                                                    item-value="id"
                                                    return-object
                                                    single-line
                                                    disabled
                                                    variant="outlined"
                                                    label="Please select engineer"
                                                    :rules="ticketdropdownrule"
                                                ></v-select>
                                            </v-col>
                                            <!---------------------------------- start Date --------------------------------->
                                            <v-col cols="12" sm="6" class="position-relative">
                                                <v-label for="due_date" class="mb-2 font-weight-medium text-capitalize required"
                                                    >start Date</v-label
                                                >
                                                <flat-pickr
                                                    id="projectStartDate"
                                                    noCalendar="true"
                                                    v-model="startDate"
                                                    disabled="true"
                                                    class="v-field__input end-d disabled-inp"
                                                    :class="isEmptyStartDate ? 'custom-border-color' : ''"
                                                    :config="startDateConfig"
                                                    @input="getEndDate()"
                                                    :rules="requiredrule"
                                                />

                                                <div class="flat-calender cusror-pointer" data-toggle>
                                                    <CalendarIcon width="21" stroke-width="1.5" />
                                                </div>
                                                <div class="v-input__details" v-if="isEmptyStartDate">
                                                    <div class="v-messages text-error custom-err">
                                                        <div
                                                            class="v-messages__message custom-err"
                                                            style="transform-origin: center top 0px"
                                                        >
                                                            This field is required.
                                                        </div>
                                                    </div>
                                                    <!---->
                                                </div>
                                            </v-col>
                                            <!---------------------------------- end Date --------------------------------->
                                            <v-col cols="12" sm="6" class="position-relative">
                                                <v-label for="due_date" class="mb-2 font-weight-medium text-capitalize">end Date</v-label>

                                                <flat-pickr
                                                    disabled="true"
                                                    id="projectStartDate"
                                                    noCalendar="true"
                                                    v-model="endDate"
                                                    class="v-field__input end-d disabled-inp"
                                                    :config="startDateConfig"
                                                    @input="getEndDate()"
                                                />
                                                <div class="flat-calender" data-toggle>
                                                    <CalendarIcon width="21" stroke-width="1.5" />
                                                </div>
                                            </v-col>
                                            <!---------------------------------- active user --------------------------------->
                                            <v-col cols="12" md="12">
                                                <div class="d-flex justify-between">
                                                    <div class="d-flex align-center justify-between w-25">
                                                        <v-label class="mb-2 font-weight-medium text-capitalize">Auto-Renew</v-label>
                                                        <div class="ml-4">
                                                            <v-switch
                                                                class="user-switch mb-1"
                                                                v-model="isAutoRenew"
                                                                :color="isAutoRenew ? 'primary' : 'secondary'"
                                                                hide-details
                                                            ></v-switch>
                                                        </div>
                                                    </div>
                                                    <div class="ml-7">
                                                        <div>
                                                            <v-alert type="info" variant="tonal" class="mb-4">
                                                                <!-- <h5 class="text-h6 text-capitalize">warning</h5> -->
                                                                <div style="font-size: 12px">
                                                                    This contract will auto-renew by [next day from end-date of current
                                                                    contract period.] System will notify you when next contract created
                                                                    automatically.
                                                                </div>
                                                            </v-alert>
                                                        </div>
                                                    </div>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                    <!---------------------------------- Action ------------------------------------>
                                    <v-col cols="12" class="mt-4 d-flex justify-space-between" style="padding-left: 0; padding-right: 0">
                                        <!-- <v-btn color="error" class="mr-3">Cancel</v-btn>
                                        <v-btn color="primary" type="submit">Submit</v-btn> -->
                                        <div>
                                            <v-btn color="error" class="mr-3" @click="closeDialog()" v-if="!issubmit">Cancel</v-btn>
                                            <v-btn color="primary" type="submit" v-if="!issubmit">Save</v-btn>
                                            <v-btn color="error" class="mr-3" v-if="issubmit" disabled>Cancel</v-btn>
                                            <v-btn color="primary" v-if="issubmit" disabled>Save</v-btn>
                                        </div>
                                        <div>
                                            <v-btn
                                                color="error"
                                                class=""
                                                :disabled="issubmit && (user.role.id == 1 || user.role.id == 2) && isSuspended"
                                                @click="suspendContract()"
                                                >Suspend Contract</v-btn
                                            >
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-col>
        <dialogBox
            ref="deleteDialog"
            @confirClk="confirmClick()"
            :cancelText="cancelText"
            @cancelClk="cancelClick()"
            :dialogText="dialogText"
            :confirmText="confirmText"
            :title="title"
        />
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" :top="'top'" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
import { Form } from 'vee-validate';
import { baseURlApi } from '@/api/axios';
import dialogBox from '@/components/TicketComponents/dialog.vue';
import { router } from '@/router';
import moment from 'moment';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { useRoute } from 'vue-router';
const route = useRoute();
const { emailPatternrule, requiredrule, alternativemobilerule, ticketdropdownrule, amountRule } = formValidationsRules();
//product details
const productTabs = ref([]);

//dialog props

const dialogText = ref('Please note that this action is irreversible. You can not undo this action after making this contract suspended.');
const cancelText = ref('Cancel');
const confirmText = ref('Confirm');
const deleteDialog = ref();
const title = ref('Suspend Contract');
//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

const isSuspended = ref(false);
const selectCustomerList = ref([]);
const selectedCustomer = ref(null);
const searchCustomer = ref('');
const select = ref('select');
const mobile = ref('');
const customerName = ref('');
const customers = ref([]);
const issubmit = ref(false);
const showPicker = ref(false);
const selectedDate = ref(null);
const isAutoRenew = ref(true);

const amountFormat = ref({
    prefix: '$ ',
    masked: false
});
const updateContractForm = ref();
const tabsform = ref();
const serviceType = ref([]);
const serviceTypeOptions = ref([]);
const productServiceTypeOptions = ref([]);
const searchService = ref('');

const addressLineOne = ref('');
const area = ref('');
const city = ref('');
const zipcode = ref('');
const state = ref('');
const countryName = ref('India');
const companyName = ref('');
const contractDescription = ref('');
const contractTitle = ref('');
const selectAddress = ref('');
const startDate = ref('');
const endDate = ref('');
const contractAmount = ref('');
const collectedAmount = ref('');
const remainingAmount = ref(0);
const isExistingCustomer = ref(true);
const isnewCustomer = ref(false);
const isExistingProblem = ref(true);
const addressOptions = ref([]);
const contract = ref([]);

const contractDuration = ref([]);
const customInput = ref();
const contractDurationOptions = ref([]);
const paymentTerm = ref([]);
const paymentTermOptions = ref([]);

const user = JSON.parse(localStorage.getItem('user'));
const customerSearchModel = ref('');
const country = ref(['USA', 'United Kingdom', 'India', 'Srilanka']);
const customerEmail = ref('');
const page = ref({ title: 'Users' });
const current_page = ref(1);
const isEmptyStartDate = ref(false);
const isEmptyCustomerName = ref(false);
const CustomerID = ref(0);
const selectedCustomerModel = ref(null);
const searchTimer = ref({});

/********************************************************** flat picker ***********************************************/
const startDateConfig = ref({
    wrap: 'true',
    disableMobile: 'true',
    dateFormat: 'Y-m-d',
    altFormat: 'Y-m-d'
});

/***************************************************** breadcrumbs ***********************************************/
const breadcrumbs = ref([
   
]);
/********************************************** methods  ********************************************************/
function getEndDate() {
    isEmptyStartDate.value = false;
    let tempDate;
    if (contractDuration.value.id === 1) {
        tempDate = new Date(startDate.value).fp_incr(365);
        endDate.value = tempDate;
    }
    if (contractDuration.value.id === 2) {
        tempDate = new Date(startDate.value).fp_incr(180);
        endDate.value = tempDate;
    }
    if (contractDuration.value.id === 3) {
        tempDate = new Date(startDate.value).fp_incr(120);
        endDate.value = tempDate;
    }
    if (contractDuration.value.id === 4) {
        tempDate = new Date(startDate.value).fp_incr(30);
        endDate.value = tempDate;
    }
}


function addInput(i) {
    let temp = productTabs.value[productTabs.value.length - 1];
    if (temp.selectedProductServiceTab !== null && temp.quantity !== 0 && temp.amount !== 0)
        productTabs.value.push({
            selectedProductServiceTab: null,
            quantity: '',
            amount: ''
        });
}
function deleteInput(i) {
    productTabs.value.splice(i, 1);
}
function getCustomersList() {
    const params = { total_record: 50, page: parseInt(current_page.value) };
    baseURlApi
        .get('customer/list', { params })
        .then((res) => {
            selectCustomerList.value = res.data.data.data;
        })
        .catch((error) => {
            // isLoading.value = false;
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function closeDialog() {
    const id = parseInt(custId.value);
    router.push(`/contracts/${id}/contracts-list`);
}

/******************************************** methods **********************************************/
function cancelClick() {
    deleteDialog.value?.close();
}
function confirmClick() {
    issubmit.value = true;
    const requestBody = {
        contract_id: parseInt(contractId.value)
    };
    baseURlApi
        .post('contract/suspend-contract', requestBody)
        .then((res) => {
            const id = parseInt(custId.value);
            deleteDialog.value?.close();
            issubmit.value = false;
            message.value = res.data.message;
            isSnackbar.value = true;
            showSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
            router.push(`/contracts/${id}/contracts-list`);
        })
        .catch((error) => {
            deleteDialog.value?.close();
            message.value = error.response.data.message;
            message.value = res.data.message;
            issubmit.value = false;
            showSnackbar.value = true;
            isSnackbar.value = true;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function suspendContract() {
    deleteDialog.value?.open();
}
async function updateContract() {
    const { valid } = await updateContractForm.value?.validate();
    const { validtabs } = await tabsform.value?.validate();
    if (startDate.value == '') {
        isEmptyStartDate.value = true;
    }
    if (selectedCustomerModel.value == null) {
        isEmptyCustomerName.value = true;
    }
    if (valid && startDate.value !== '' && selectedCustomerModel.value !== null) {
        issubmit.value = true;
        const contractTypeId = serviceType.value.map((data) => {
            return data.id;
        });
        const productServices = productTabs.value.map((data) => {
            return {
                product_service_id: data.selectedProductServiceTab.id,
                product_qty: data.quantity,
                product_amount: data.amount
            };
        });
        const requestBody = {
            contract_id: parseInt(contractId.value),
            contract_title: contractTitle.value,
            contract_details: contractDescription.value,
            contract_type_id: contractTypeId,
            contract_product_service_id: productServices,
            amount: contractAmount.value,
            is_auto_renew: isAutoRenew.value == true ? 1 : 0
        };
        baseURlApi
            .put('contract/update', requestBody)
            .then((res) => {
                const id = parseInt(custId.value);
                issubmit.value = false;
                message.value = res.data.message;
                isSnackbar.value = true;
                showSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
                router.push(`/contracts/${id}/contracts-list`);
            })
            .catch((error) => {
                message.value = error.response.data.message;
                issubmit.value = false;
                showSnackbar.value = true;
                isSnackbar.value = true;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function getAddressText(item) {
    return (
        `${item?.address_line1 ? item.address_line1 : ''}` +
        ',' +
        `${item?.area ? item.area : ''}` +
        ',' +
        `${item?.city ? item.city : ''}` +
        ` ${item?.zipcode ? '-(' + item.zipcode + ')' : ''}`
    );
}
function getDropDownData() {
    baseURlApi
        .get('contract/get-details')
        .then((res) => {
            serviceTypeOptions.value = res.data.data.contract_services;
            productServiceTypeOptions.value = res.data.data.product_services;
            contractDurationOptions.value = res.data.data.contract_duration;
            paymentTermOptions.value = res.data.data.contract_payment_terms;
        })
        .catch((error) => {
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
/************************* computed  ***************************/
const contractId = computed(() => route.params.id);
const custId = computed(() => route.params.custId);


function getCurrency() {
    baseURlApi
        .get('settings/company/get-currency')
        .then((res) => {
            amountFormat.value.prefix = res.data.data.currency.symbol + ' ';
        })
        .catch((error) => {
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function getContractDetails() {
    baseURlApi
        .get(`contract/view/${contractId.value}`)
        .then((res) => {

            const data = res.data.data.contract_details;
            selectedCustomerModel.value = data.customers;
            customerSearchModel.value = (
                selectedCustomerModel.value?.first_name +
                '' +
                ' ' +
                (selectedCustomerModel.value?.last_name || '')
            ).trim();
            serviceType.value.push(data.contract_services_types[0].contract_types);

            const mobileDetails = data.customers.phones.find((element) => element.is_primary === 1);
            mobile.value = mobileDetails.phone;
            isSuspended.value = res.data.data.suspend_flag;
            customerEmail.value = data.customers.email;
            selectAddress.value = data.customer_location;
            addressLineOne.value = data.customer_location.address_line1;
            area.value = data.customer_location.area;
            city.value = data.customer_location.city;
            zipcode.value = data.customer_location.zipcode;
            state.value = data.customer_location.state;
            countryName.value = data.customer_location.country;
            companyName.value = data.customer_location.company_name;
            contractTitle.value = data.contract_title;
            contractDescription.value = data.contract_details;
            contractAmount.value = data.amount;
            contractDuration.value.push(data.duration);
            paymentTerm.value.push(data.payment_term);
            startDate.value = data.start_date;
            endDate.value = data.end_date;
            isAutoRenew.value = data.is_auto_renew == 1 ? true : false

            data.product_service.map((item) =>
                productTabs.value.push({
                    selectedProductServiceTab: item.product_service,
                    quantity: item.product_qty,
                    amount: item.product_amount
                })
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
    breadcrumbs.value.push( {
        text: 'Contracts',
        disabled: false,
        href: `/contracts/${parseInt(custId.value)}/contracts-list`
    },
    {
        text: 'Edit Contract',
        disabled: true,
        href: '#'
    })
    getCustomersList();
    getDropDownData();
    getContractDetails();
    getCurrency();
});
</script>
<style scoped>
.v-input--density-default,
.v-field--variant-solo,
.v-field--variant-filled {
    --v-input-control-height: 45px;
    --v-input-padding-top: 9px;
}
.v-input--density-default .v-field--variant-outlined,
.v-input--density-default .v-field--single-line {
    --v-field-padding-bottom: 0 !important;
}
.v-tab--selected .v-tab__slider {
    opacity: 0 !important;
    display: none !important;
}
.v-tab__slider {
    display: none !important;
    opacity: 0 !important;
}
.v-tabs-bar__content {
    flex-wrap: wrap;
    width: 100%;
}
div.v-tabs-bar {
    height: auto;
}
.t-add-card {
    padding: 20px !important;
}
.ticket-devider {
    border-color: #f5f5f5 !important;
    padding: 18px;
}
.v-radio {
    border-radius: 5px;
    padding: 2px;
    border: 1px solid #e0e0e0;
}
.v-radio .v-label .v-label--clickable {
    margin-right: 20px !important;
}
.ticket-type-radio {
    margin-left: 20px !important;
}
/* #due_date{
    cursor: pointer !important;
} */
</style>
