<template>
    <div>
        <v-col cols="12">
            <v-col cols="12">
                <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
            </v-col>
            <v-col cols="10" style="margin: 0 auto">
                <h5 class="text-h5 mb-6 mt-3">Edit Ticket</h5>
                <v-card elevation="10" class="t-add-card" rounded="md">
                    <!------------------------------------ Ticket type ----------------------------------->
                    <v-row style="padding: 20px 20px 0 20px">
                        <v-col cols="12" class="d-flex">
                            <v-label class="font-weight-medium text-capitalize required">ticket type</v-label>
                            <v-radio-group id="" v-model="tiketTypeRadio" inline class="d-flex justify-flexstart ticket-type-radio ml-2">
                                <v-radio
                                    class="font-weight-medium text-capitalize mr-5 radio-lbl"
                                    label="Adhoc"
                                    value="adhoc"
                                    color="primary"
                                ></v-radio>
                                <v-radio
                                    class="font-weight-medium text-capitalize border-1 mr-5 radio-lbl"
                                    label="Contract"
                                    value="contract"
                                    color="primary"
                                ></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <!------------------------------------ Addhoc form ----------------------------------->
                    <v-row v-if="tiketTypeRadio == 'adhoc'" style="padding: 20px">
                        <v-col cols="12">
                            <v-form @submit.prevent="editTicket" ref="editTicketform">
                                <v-row>
                                    <!---------------------------------- customer name --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Customer Name</v-label>
                                        <v-menu open-on-focus>
                                            <template v-slot:activator="{ props }">
                                                <v-text-field
                                                    clearable
                                                    hide-details
                                                    placeholder="Type minimum 3 characters to search for existing customers"
                                                    browser-autocomplete="name"
                                                    name="name"
                                                    v-bind="props"
                                                    v-model="customerSearchModel"
                                                    ref="customInput"
                                                    disabled="true"
                                                ></v-text-field>
                                            </template>
                                        </v-menu>
                                    </v-col>
                                    <!---------------------------------- Mobile Number --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Mobile Number</v-label>
                                        <v-text-field
                                            v-model="mobile"
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            :rules="mobilerule"
                                            disabled="true"
                                        />
                                    </v-col>
                                    <!---------------------------------- Address --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">choose Address</v-label>
                                        <v-combobox
                                            :label="!isExistingCustomer ? 'Add new address' : ''"
                                            v-model="selectAddress"
                                            :items="addressOptions"
                                            item-title="address_line1"
                                            @update:modelValue="getinputs()"
                                            item-value="id"
                                            return-object
                                            single-line
                                            :disabled="!isExistingCustomer"
                                            variant="outlined"
                                            bg-color="none"
                                            base-color="none"
                                            density="comfortable"
                                            :rules="isExistingCustomer == true ? ticketdropdownrule : ''"
                                            open-on-clear
                                            persistent-clear
                                            persistent-counter
                                        >
                                            <template v-slot:prepend-item>
                                                <div style="text-align: right; padding: 4px 10px 10px">
                                                    <v-btn color="primary" class="m-0 p-0" flat @click="addNewAddress()" v-bind="props"
                                                        ><PlusIcon stroke-width="1.5" size="20" class="text-white text-end" /><span
                                                            class="text-end"
                                                            >Add new address</span
                                                        ></v-btn
                                                    >
                                                </div>
                                            </template>
                                        </v-combobox>
                                    </v-col>
                                    <!---------------------------------- company name --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Company Name</v-label>
                                        <v-text-field
                                            v-model="companyName"
                                            variant="outlined"
                                            color="primary"
                                            :rules="requiredrule"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- address line 1 --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">address</v-label>
                                        <v-text-field
                                            v-model="addressLineOne"
                                            variant="outlined"
                                            color="primary"
                                            :rules="requiredrule"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- Email ------------------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Email ID</v-label>
                                        <v-text-field
                                            v-model="customerEmail"
                                            color="primary"
                                            variant="outlined"
                                            type="email"
                                            :rules="emailPatternrule"
                                        />
                                    </v-col>
                                    <!---------------------------------- area --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">area</v-label>
                                        <v-text-field
                                            v-model="area"
                                            variant="outlined"
                                            color="primary"
                                            :rules="requiredrule"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- city --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">City</v-label>
                                        <v-text-field
                                            v-model="city"
                                            variant="outlined"
                                            color="primary"
                                            :rules="requiredrule"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- zip code --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Zip Code</v-label>
                                        <v-text-field
                                            v-model="zipcode"
                                            variant="outlined"
                                            color="primary"
                                            :rules="requiredrule"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- state --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">State</v-label>
                                        <v-text-field
                                            v-model="state"
                                            variant="outlined"
                                            color="primary"
                                            :rules="requiredrule"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- country --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Country</v-label>
                                        <v-text-field
                                            v-model="countryName"
                                            variant="outlined"
                                            color="primary"
                                            :rules="requiredrule"
                                        ></v-text-field>
                                    </v-col>

                                    <v-divider class="ticket-devider"></v-divider>
                                    <!---------------------------------- Problem type --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Problem type</v-label>
                                        <v-combobox
                                            class="prolem-typ"
                                            v-model="problemType"
                                            v-model:search="searchProblem"
                                            :items="problemTypeOptions"
                                            @click:clear="getInitialDataProblemType()"
                                            @keydown.enter="onEnterProblem(e)"
                                            @blur="onEnterProblem(e)"
                                            @keydown.enter.capture.prevent.stop
                                            :hide-no-data="false"
                                            item-title="problem_name"
                                            item-value="id"
                                            return-object
                                            clearable="true"
                                            color="primary"
                                            chips
                                            single-line
                                            variant="outlined"
                                            multiple
                                            density="comfortable"
                                            base-color="none"
                                            label="Please select problem type"
                                            :rules="ticketdropdownrule"
                                            id="problemCombo"
                                        >
                                            <template v-slot:no-data>
                                                <v-list-item>
                                                    <v-list-item-title>
                                                        No results matching "<strong>{{ searchProblem }}</strong
                                                        >"
                                                        <div class="mt-2">
                                                            <v-btn
                                                                flat
                                                                class="table-icons-common text-left flat bg-primary"
                                                                @click.prevent.stop="onEnterProblem(e)"
                                                            >
                                                                <PlusIcon size="16" class="text-left" /> Add new problem type</v-btn
                                                            >
                                                        </div>
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </template>
                                        </v-combobox>
                                    </v-col>
                                    <!---------------------------------- problem title --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">problem title</v-label>
                                        <v-text-field
                                            v-model="problemTitle"
                                            variant="outlined"
                                            color="primary"
                                            :rules="requiredrule"
                                            maxlength="50"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- description --------------------------------->
                                    <v-col cols="12">
                                        <v-label class="mb-2 font-weight-medium text-capitalize">description</v-label>
                                        <v-textarea
                                            v-model="description"
                                            auto-grow
                                            variant="outlined"
                                            rows="2"
                                            color="primary"
                                            row-height="25"
                                            shaped
                                            maxlength="500"
                                        ></v-textarea>
                                    </v-col>
                                    <!---------------------------------- Due Date --------------------------------->
                                    <v-col cols="12" sm="6">
                                        <v-label for="due_date" class="mb-2 font-weight-medium text-capitalize required">Due Date</v-label>
                                        <v-text-field
                                            class="due-date"
                                            color="primary"
                                            variant="outlined"
                                            type="date"
                                            id="due_date"
                                            @keydown="restrictKeyUp($event)"
                                            v-model="dueDate"
                                            :rules="requiredrule"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- Assign Engineer --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Assign Engineer</v-label>
                                        <v-select
                                            v-model="assignEr"
                                            :items="assignErOptions"
                                            :item-title="getAssignErText"
                                            item-value="id"
                                            return-object
                                            single-line
                                            variant="outlined"
                                            label="Please select engineer"
                                            :rules="ticketdropdownrule"
                                        ></v-select>
                                        <template v-slot:selection="{ item }">
                                            <span>{{ assignErOptions.first_name + ' ' + assignErOptions.last_name }} </span>
                                        </template>
                                    </v-col>
                                    <!---------------------------------- Ticket Priority --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Ticket Priority</v-label>
                                        <v-select
                                            v-model="Ticketpriority"
                                            :items="TicketpriorityOptions"
                                            item-title="priority_name"
                                            item-value="id"
                                            return-object
                                            single-line
                                            variant="outlined"
                                            label="Please select ticket priority "
                                            :rules="ticketdropdownrule"
                                        ></v-select>
                                    </v-col>
                                    <!---------------------------------- Ticket status --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Ticket status</v-label>
                                        <v-select
                                            v-model="ticketStatus"
                                            :items="ticketStatusOptions"
                                            item-title="status_name"
                                            item-value="id"
                                            return-object
                                            single-line
                                            variant="outlined"
                                            label="Please select ticket status"
                                            :rules="ticketdropdownrule"
                                            disabled="true"
                                        ></v-select>
                                    </v-col>
                                    <!---------------------------------- Appointment type --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Appointment type</v-label>
                                        <v-select
                                            v-model="appointmentType"
                                            :items="appointmentTypeOptions"
                                            item-title="appointment_name"
                                            item-value="id"
                                            return-object
                                            single-line
                                            variant="outlined"
                                            label="Please select appointment type"
                                            :rules="ticketdropdownrule"
                                        ></v-select>
                                    </v-col>
                                    <v-divider class="ticket-devider"></v-divider>
                                    <!---------------------------------- ticket amount --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">ticket amount</v-label>
                                        <v-text-field
                                            v-model="ticketAmount"
                                            variant="outlined"
                                            color="primary"
                                            :rules="amountRule"
                                            @input="remainAmount"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- Payment status --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Payment status</v-label>
                                        <v-select
                                            v-model="paymentStatus"
                                            @update:modelValue="changePaymentMode()"
                                            :items="paymentStatusOptions"
                                            item-title="payment_type"
                                            item-value="id"
                                            return-object
                                            single-line
                                            variant="outlined"
                                            label="Please select payment status"
                                            :rules="ticketdropdownrule"
                                        ></v-select>
                                    </v-col>
                                    <!---------------------------------- collected amount --------------------------------->
                                    <v-col
                                        cols="12"
                                        md="6"
                                        v-if="paymentStatus.unique_id !== '10003' && paymentStatus.unique_id !== '10004'"
                                    >
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">collected amount</v-label>
                                        <v-text-field
                                            v-model="collectedAmount"
                                            variant="outlined"
                                            color="primary"                                      
                                            @input="remainAmount"
                                            disabled="true"
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- Remaining amount --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Remaining amount</v-label>
                                        <v-text-field
                                            type="number"
                                            v-model="remainingAmount"
                                            variant="outlined"
                                            color="primary"
                                            disabled
                                        ></v-text-field>
                                    </v-col>
                                    <!---------------------------------- payment mode --------------------------------->
                                    <v-col
                                        cols="12"
                                        md="6"
                                        v-if="paymentStatus.unique_id !== '10003' && paymentStatus.unique_id !== '10004'"
                                    >
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
                                    <!---------------------------------- Action ------------------------------------>
                                    <v-col cols="12">
                                        <!-- <v-btn color="error" class="mr-3">Cancel</v-btn>
                                        <v-btn color="primary" type="submit">Submit</v-btn> -->
                                        <v-btn color="error" class="mr-3" @click="closeDialog()" v-if="!issubmit">Cancel</v-btn>
                                        <v-btn color="primary" type="submit" v-if="!issubmit">Save</v-btn>
                                        <v-btn color="error" class="mr-3" v-if="issubmit" disabled>Cancel</v-btn>
                                        <v-btn color="primary" v-if="issubmit" disabled>Save</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-col>
                    </v-row>

                    <!------------------------------------ contract form ----------------------------------->
                    <v-row v-if="tiketTypeRadio == 'contract'" style="padding: 20px">
                        <v-col cols="12">
                            <v-row>
                                <!---------------------------------- Select customer --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Select Customer</v-label>
                                    <v-select
                                        v-model="customers"
                                        :items="customerOptions"
                                        item-title="name"
                                        item-value="value"
                                        return-object
                                        single-line
                                        variant="outlined"
                                        label="please select customer"
                                    ></v-select>
                                </v-col>
                                <!---------------------------------- Email ------------------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Email</v-label>
                                    <v-text-field v-model="customerEmail" color="primary" variant="outlined" type="email" />
                                </v-col>
                                <!---------------------------------- Mobile Number --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Mobile Number</v-label>
                                    <v-text-field v-model="mobile" color="primary" variant="outlined" type="text" />
                                </v-col>
                                <!---------------------------------- Address --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Select Address</v-label>
                                    <v-select
                                        v-model="selectAddress"
                                        :items="addressOptions"
                                        item-title="address_line1"
                                        item-value="id"
                                        return-object
                                        single-line
                                        variant="outlined"
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" lg="12">
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <v-label class="mb-2 font-weight-medium text-capitalize required">First Name</v-label>
                                            <v-text-field variant="outlined" color="primary"></v-text-field>
                                            <v-label class="mb-2 font-weight-medium text-capitalize required">Select Gender</v-label>
                                            <v-select
                                                :items="gender"
                                                item-title="gender"
                                                item-value="abbr"
                                                return-object
                                                single-line
                                                variant="outlined"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-label class="mb-2 font-weight-medium text-capitalize required">Last Name</v-label>
                                            <v-text-field variant="outlined" color="primary"></v-text-field>
                                            <v-label class="mb-2 font-weight-medium text-capitalize required">Date of Birth</v-label>
                                            <v-text-field color="primary" variant="outlined" type="date"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-label class="mb-2 font-weight-medium text-capitalize required">Street</v-label>
                                            <v-text-field variant="outlined" color="primary"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-label class="mb-2 font-weight-medium text-capitalize required">City</v-label>
                                            <v-text-field variant="outlined" color="primary"></v-text-field>
                                            <v-label class="mb-2 font-weight-medium text-capitalize required">Post Code</v-label>
                                            <v-text-field variant="outlined" color="primary"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-label class="mb-2 font-weight-medium text-capitalize required">State</v-label>
                                            <v-text-field variant="outlined" color="primary"></v-text-field>
                                            <v-label class="mb-2 font-weight-medium text-capitalize required">Country</v-label>
                                            <v-select
                                                :items="country"
                                                item-title="country"
                                                item-value="abbr"
                                                return-object
                                                single-line
                                                variant="outlined"
                                            ></v-select>
                                        </v-col>
                                    </v-row>

                                    <v-btn color="error" class="mr-3">Cancel</v-btn>
                                    <v-btn color="primary">Create Ticket</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-col>
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" :top="'top'" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import BasicHeaderForm from '@/components/forms/form-layouts/BasicHeaderForm.vue';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
import { Form } from 'vee-validate';
import { baseURlApi } from '@/api/axios';
import { router } from '@/router';
import { useRoute } from 'vue-router';
const route = useRoute();
const { emailPatternrule, requiredrule, mobilerule, ticketdropdownrule, amountRule } = formValidationsRules();

//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

const selectCustomerList = ref([]);
const selectedCustomer = ref(null);
const searchCustomer = ref('');
const select = ref('select');
const mobile = ref('');
const customerName = ref('');
const customers = ref([]);
const issubmit = ref(false);
const customerOptions = ref([
    {
        name: 'one',
        value: '1'
    },
    {
        name: 'two',
        value: '2'
    }
]);
const showPicker = ref(false);
const selectedDate = ref(null);

const editTicketform = ref();
const problemType = ref([]);
const problemTypeOptions = ref([]);
const searchProblem = ref('');
const Ticketpriority = ref([]);
const TicketpriorityOptions = ref([]);
const addressLineOne = ref('');
const area = ref('');
const city = ref('');
const zipcode = ref('');
const state = ref('');
const countryName = ref('India');
const companyName = ref('');
const description = ref('');
const problemTitle = ref('');
const selectAddress = ref('');
const dueDate = ref('');
const ticketAmount = ref('');
const collectedAmount = ref('');
const remainingAmount = ref(0);
const isExistingCustomer = ref(true);
const isExistingProblem = ref(true);
const addressOptions = ref([]);
const contract = ref([]);
const contractOptions = ref([
    {
        name: 'one',
        value: '1'
    },
    {
        name: 'two',
        value: '2'
    }
]);
const assignEr = ref([]);
const customerComboBox = ref();
const newCutomerValue = ref(null);
const customInput = ref();
const assignErOptions = ref([]);
const ticketStatus = ref([]);
const ticketStatusOptions = ref();
const paymentStatus = ref([]);
const paymentStatusOptions = ref([]);
const paymentMode = ref([]);
const paymentModeOptions = ref([]);
const appointmentType = ref([]);
const appointmentTypeOptions = ref([]);
const gender = ref(['Male', 'Female']);
const tiketTypeRadio = ref('adhoc');
const country = ref(['USA', 'United Kingdom', 'India', 'Srilanka']);
const tab = ref(null);
const customerEmail = ref('');
const page = ref({ title: 'Users' });
const current_page = ref(1);
const emptyProblemType = ref(false);
/******************************************************** edit ticket **********************************************/
const ticketId = ref(0);

/********************************************************* emits ********************************************************/
const emit = defineEmits(['ticketAdded']);
/***************************************************** breadcrumbs ***********************************************/
const breadcrumbs = ref([
    {
        text: 'Tickets',
        disabled: false,
        href: '/tickets'
    },
    {
        text: 'Edit Ticket',
        disabled: true,
        href: '#'
    }
]);
/***************************************************** validations rules *********************************************/
const collectAmountRule = [
    () => {
        if (collectedAmount.value.length > 0) {
            if (parseInt(collectedAmount.value) <= parseInt(ticketAmount.value)) return true;
            return 'Collected amount must be a less than ticket amount.';
        }
    },
    () => {
        if (collectedAmount.value) return true;
        return 'This field is required.';
    },
    () => {
        if (parseInt(collectedAmount.value) >= 0) return true;
        return 'This field must be a positive value.';
    }
];

/********************************************** methods  ********************************************************/
function getTicketData() {
    baseURlApi
        .get(`ticket/view/${ticketId.value}`)
        .then((res) => {
            console.log('ress', res.data.data.ticket_detail);
            const data = res.data.data.ticket_detail;
            tiketTypeRadio.value = data.ticket_type;
            customerSearchModel.value = data.customer.first_name + ' ' + data.customer.last_name;
            selectedCustomerModel.value = data.customer;
            const mobileDetails = data.customer.phones.find((element) => element.is_primary === 1)
            mobile.value = mobileDetails.phone;
            customerEmail.value = data.customer.email;
            selectAddress.value = data.customer_location;
            addressLineOne.value = data.customer_location.address_line1;
            area.value = data.customer_location.area;
            city.value = data.customer_location.city;
            zipcode.value = data.customer_location.zipcode;
            state.value = data.customer_location.state;
            countryName.value = data.customer_location.country;
            companyName.value = data.customer_location.company_name;
            getAddress(data.customer_id);
            problemType.value = data.problem_types;
            problemTitle.value = data.problem_title;
            description.value = data.description;
            dueDate.value = data.due_date;
            assignEr.value = data.assigned_engineer;
            Ticketpriority.value = data.ticket_priority;
            ticketStatus.value = data.ticket_status;
            appointmentType.value = data.appointment_type;
            ticketAmount.value = data.amount.toString();
            collectedAmount.value = data.collected_amount;
            paymentStatus.value = data.payment_status;
            remainingAmount.value = data.remaining_amount;
            paymentMode.value = data.payment_mode;
        })
        .catch((error) => {
            isSnackbar.value = true;
            showSnackbar.value = true;
            console.log('err', error.response.data.message);
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function renderItemTitle(item) {
    const fname = item?.raw?.first_name;
    const lname = item?.raw?.last_name;
    const phone = item?.raw?.phone;
    const name = [fname, lname].filter(Boolean).join(' ');
    if (phone) return name + ' - (' + phone + ')';
    // return name
    return item.title;
}
function getinputs() {
    addressLineOne.value = selectAddress.value?.address_line1;
    area.value = selectAddress.value?.area;
    city.value = selectAddress.value?.city;
    zipcode.value = selectAddress.value?.zipcode;
    state.value = selectAddress.value?.state;
    countryName.value = selectAddress.value?.country;
    companyName.value = selectAddress.value?.company_name;
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
            // isSnackbar.value = true;
            // showSnackbar.value = true
            // message.value = error.response.data.message;
            // color.value = 'error';
            // icon.value = 'mdi-close-circle';
        });
}
function closeDialog() {
    router.push('/tickets');
}
function onEnter() {
    const data = (searchCustomer.value || '').trim();
    let val = {};
    if (data.includes(' ')) {
        var index = data.indexOf(' ');
        var id = data.slice(0, index); // Gets the first part
        var text = data.slice(index + 1);
        val = {
            id: '',
            first_name: id,
            last_name: text,
            email: '',
            created_at: '',
            updated_at: '',
            // customer_id: '',
            phone: ''
        };
    } else {
        val = {
            id: '',
            first_name: data,
            last_name: '',
            email: '',
            created_at: '',
            updated_at: '',
            // customer_id: '',
            phone: ''
        };
    }
    if (!selectCustomerList.value.includes(data)) {
        addressLineOne.value = '';
        area.value = '';
        city.value = '';
        zipcode.value = '';
        state.value = '';
        countryName.value = 'India';
        companyName.value = '';
        selectCustomerList.value.unshift(val);
        isExistingCustomer.value = false;
        selectAddress.value = '';
    }
}
function onEnterProblem() {
    if (searchProblem.value.length > 0) {
        if (problemTypeOptions.value.filter((data) => data.problem_name.toUpperCase() === searchProblem.value.toUpperCase()).length == 0) {
            const requestBody = {
                problem_name: searchProblem.value
            };
            baseURlApi
                .post('settings/problem-type/add', requestBody)
                .then((res) => {
                    searchProblem.value = '';

                    problemTypeOptions.value.unshift(res.data.data);

                    let prblmType = problemType.value.filter((x) => typeof x === 'object');

                    prblmType.push(problemTypeOptions.value[0]);
                    problemType.value = prblmType;
                })
                .catch((error) => {
                    showSnackbar.value = true;
                    isSnackbar.value = true;
                    message.value = error.response.data.message;
                    color.value = 'error';
                    icon.value = 'mdi-close-circle';
                });
        }
    }
}

/*methods*/
function onBlur() {
    if (searchCustomer.value?.length) {
        const newItem = {
            first_name: selectedCustomer.value,
            id: selectCustomerList.value.length + 1
        };
        selectedCustomer.value = newItem;
    }
}
async function editTicket() {
    const { valid } = await editTicketform.value?.validate();
    const problem_type = problemType.value.map((data) => {
        return data.id;
    });
    if (isExistingCustomer.value == false) {
        selectedCustomerModel.value.first_name = newCutomerValue.value.first_name; // Gets the first part
        selectedCustomerModel.value.last_name = newCutomerValue.value.last_name.replace(' ', '');
    }
    if (valid) {
        issubmit.value = true;
        const requestBody = {
            ticket_type: tiketTypeRadio.value,
            customer_name: [selectedCustomerModel.value.first_name, selectedCustomerModel.value.last_name].join(' ').trim(),
            is_existing_customer: isExistingCustomer.value == true ? 1 : 0,
            customer_id: isExistingCustomer.value == true ? selectedCustomerModel.value.id : '',
            email: customerEmail.value,
            customer_locations_id: selectAddress.value ? selectAddress.value.id : '',
            company_name: companyName.value,
            address_line1: addressLineOne.value,
            area: area.value,
            zipcode: zipcode.value,
            city: city.value,
            state: state.value,
            country: countryName.value,
            primary_mobile: mobile.value,
            problem_type_id: problem_type,
            problem_title: problemTitle.value,
            due_date: dueDate.value,
            description: description.value,
            ticket_status_id: ticketStatus.value.id,
            priority_id: Ticketpriority.value.id,
            assigned_user_id: assignEr.value.id,
            appointment_type_id: appointmentType.value.id,
            ticket_amount: parseInt(ticketAmount.value),
            payment_type_id: paymentStatus.value.id,
            collected_amount: collectedAmount.value ? parseInt(collectedAmount.value) : 0,
            remaining_amount: remainingAmount.value ? parseInt(remainingAmount.value) : 0,
            payment_mode: paymentMode.value
        };
        if (paymentMode.value.length == 0) {
            delete requestBody.payment_mode;
        }
        baseURlApi
            .post(`ticket/update/${ticketId.value}`, requestBody)
            .then((res) => {
                issubmit.value = false;
                message.value = res.data.message;
                isSnackbar.value = true;
                showSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
                emit('ticketAdded');
                router.push('/tickets');
            })
            .catch((error) => {
                issubmit.value = false;
                showSnackbar.value = true;
                isSnackbar.value = true;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
                if (error.response.error?.length) {
                    message.value = 'Missing required fields ' + Object.keys(error.response.error).join(' ');
                } else message.value = error.response.data.message;
            });
    }
}
function getFieldText(item) {
    return (
        `${item?.first_name ? item.first_name : ''}` +
        ' ' +
        `${item?.last_name ? item.last_name : ''}` +
        ` ${item?.phone ? '-(' + item.phone + ')' : ''}`
    );
}
function addNewAddress() {
    addressLineOne.value = '';
    area.value = '';
    city.value = '';
    zipcode.value = '';
    state.value = '';
    countryName.value = 'India';
    companyName.value = '';
    isExistingCustomer.value = false;
    selectAddress.value = '';
}
function getText(item) {
    return `${item.first_name ? item.first_name : ''}` + ' ' + `${item.last_name ? item.last_name : ''}`;
}
function getAssignErText(item) {
    {
        return `${item.first_name + ' ' + item.last_name}`;
    }
}
function getCustomers() {
    return selectCustomerList.value;
}
function clearOnInput() {
    selectedCustomer.value = null;
}
function searchCustomers() {
    const fd = new FormData();
    if (selectedCustomer.value.length > 0) {
        fd.append('search_text', selectedCustomer.value);
        baseURlApi
            .post(`customer/search?total_record=${current_page.value}`, fd)
            .then((res) => {
                customerOptions.value = res.data.data.data;
            })
            .catch((error) => {});
    }
}
function getAddress(customerId) {
    if (customerId) {
        baseURlApi
            .get(`ticket/get-customer-address/${customerId}`)
            .then((res) => {
                addressOptions.value = res.data.data;
            })
            .catch((error) => {
                isSnackbar.value = true;
                showSnackbar.value = true;
                console.log('err', error.response.data.message);
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}

function getTickets() {
    selectedCustomer.value = null;
    baseURlApi
        .get('ticket/get-detail')
        .then((res) => {
            const data = res.data.data;
            problemTypeOptions.value = data.problem_types;
            assignErOptions.value = data.assign_engineer;
            ticketStatusOptions.value = data.ticket_status;
            data.ticket_status.map((data) => {
                if (data.unique_id == '10001') {
                    ticketStatus.value = data;
                }
            });
            appointmentTypeOptions.value = data.appointment_type;
            paymentStatusOptions.value = data.payment_status;
            paymentModeOptions.value = data.payment_mode;
            TicketpriorityOptions.value = data.ticket_priorities;
            getCustomersList();
        })
        .catch((error) => {
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function getInitialDataProblemType() {
    problemType.value = '';
}

function restrictKeyUp(event) {
    event.preventDefault();
}
function changePaymentMode() {
    if (paymentStatus.value.unique_id == '10003' || paymentStatus.value.unique_id == '10004') {
        remainingAmount.value = 0;
    }

    if (paymentStatus.value.id == 2) {
        paymentMode.value = paymentModeOptions.value[1];
    } else {
        paymentMode.value = [];
    }
}

/************************* computed  ***************************/
const remainAmount = computed(() => {
    return (remainingAmount.value = parseInt(ticketAmount.value) - parseInt(collectedAmount.value));
});

const fromDateDisp = computed(() => {
    return fromDateVal.value;
});
const filteredCustomers = computed(() => {
    if (customerSearchModel.value?.length < 3) {
        return [];
    }
    const _model = (customerSearchModel.value || '').toLowerCase().trim();
    return selectCustomerList.value.filter((e) => {
        return _model
            .split(' ')
            .some(
                (m) =>
                    (e.first_name || '').toLowerCase().includes(m) ||
                    (e.last_name || '').toLowerCase().includes(m) ||
                    (e.phone + '').includes(m)
            );
    });
});
const customerSearchModel = ref('');
const selectedCustomerModel = ref({});
const searchTimer = ref({});

function addTempCustomer(custName) {
    let newCustomer = {};
    if (custName.includes(' ')) {
        var index = custName.indexOf(' ');
        var first = custName.slice(0, index); // Gets the first part
        var last = custName.slice(index + 1);

        newCustomer = {
            first_name: first || '',
            last_name: last || '',
            phone: '',
            id: selectCustomerList.value.length + 1
        };
    } else {
        newCustomer = {
            first_name: custName || '',
            last_name: '',
            phone: '',
            id: selectCustomerList.value.length + 1
        };
    }
    newCutomerValue.value = newCustomer;
    selectCustomerList.value.unshift(newCustomer);
    isExistingCustomer.value = false;
    selectAddress.value = '';
    addressLineOne.value = '';
    area.value = '';
    city.value = '';
    zipcode.value = '';
    state.value = '';
    countryName.value = 'India';
    companyName.value = '';
    mobile.value = '';
    customerEmail.value = '';
}

onMounted(() => {
    ticketId.value = parseInt(localStorage.getItem('ticketId'));
    getTicketData();
    console.log('rrr', ticketId.value);
    getTickets();
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
