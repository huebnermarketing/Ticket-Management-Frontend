<template>
    <div>
        <v-col cols="12">
            <v-col cols="12">
                <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
            </v-col>
            <v-col cols="10" style="margin: 0 auto">
                <h5 class="text-h5 mb-6 mt-3">Create New Ticket</h5>
                <v-card elevation="10" class="t-add-card" rounded="md">
                    <!------------------------------------ Ticket type ----------------------------------->
                    <v-row style="padding: 20px 20px 0 20px">
                        <v-col cols="12">
                            <v-label class="font-weight-medium text-capitalize required">ticket type</v-label>
                            <v-radio-group v-model="tiketTypeRadio" inline class="d-flex justify-flexstart ticket-type-radio">
                                <v-radio class="font-weight-medium text-capitalize" label="Addhoc" value="adhoc" color="primary"></v-radio>
                                <v-radio
                                    class="font-weight-medium text-capitalize"
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
                            <v-form @submit.prevent="createTicket" ref="createticketform">
                                <v-row>
                                    <!---------------------------------- customer name --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Customer Name</v-label>
                                        <v-combobox
                                            v-model="selectedCustomer"
                                            v-model:search="searchCustomer"
                                            :item-title="getFieldText"
                                            item-value="id"
                                            :hide-no-data="false"
                                            :items="selectCustomerList"
                                            @update:modelValue="getAddress()"
                                            @click:clear="getInitialData()"
                                            @keydown.enter.capture.prevent.stop
                                            @input="clearInput()"
                                            chips
                                            clearable
                                            return-object
                                            bg-color="none"
                                            base-color="none"
                                            density="comfortable"
                                            variant="outlined"
                                            ref="customerComboBox"
                                            open-on-clear
                                            persistent-clear
                                            persistent-counter
                                        >
                                            <template v-slot:selection>
                                                <span>
                                                    {{
                                                        selectedCustomer.first_name + ' ' + selectedCustomer.last_name
                                                            ? selectedCustomer.last_name
                                                            : ''
                                                    }}
                                                    -{{ selectedCustomer.phone ? selectedCustomer.phone : '' }}
                                                </span>
                                                <!-- <span v-if="!isExistingCustomer">{{ selectedCustomer.first_name }} </span> -->
                                            </template>

                                            <template v-slot:no-data>
                                                <v-list-item>
                                                    <v-list-item-title>
                                                        No results matching "<strong>{{ searchCustomer }}</strong
                                                        >". Press
                                                        <div class="mt-2">
                                                            <v-btn
                                                                flat
                                                                class="table-icons-common text-left flat bg-primary"
                                                                @click.prevent.stop="onEnter(e)"
                                                            >
                                                                <PlusIcon size="16" class="text-left" /> Add new customer</v-btn
                                                            >
                                                        </div>
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </template>

                                            <!-- <template v-slot:append-item>
                                            <v-btn class="table-icons-common" icon flat @click="openEditDialog(id)" v-bind="props"
                                                ><PlusIcon stroke-width="1.5" size="20" class="text-primary"
                                            /></v-btn>
                                        </template> -->
                                        </v-combobox>
                                        <!-- <v-text-field v-model="customerName" variant="outlined" color="primary"></v-text-field> -->
                                    </v-col>
                                    <!---------------------------------- Mobile Number --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Mobile Number</v-label>
                                        <v-text-field v-model="mobile" color="primary" variant="outlined" type="text" :rules="mobilerule" />
                                    </v-col>
                                    <!---------------------------------- Address --------------------------------->
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">choose Address</v-label>
                                        <v-select
                                            label="Please select address"
                                            v-model="selectAddress"
                                            :items="addressOptions"
                                            item-title="address_line1"
                                            @update:modelValue="getinputs()"
                                            item-value="id"
                                            return-object
                                            single-line
                                            variant="outlined"
                                            :disabled="!isExistingCustomer"
                                            :rules="isExistingCustomer ? ticketdropdownrule : ''"
                                        ></v-select>
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
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">address line</v-label>
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
                                            v-model="problemType"
                                            v-model:search="searchProblem"
                                            :items="problemTypeOptions"
                                            @click:clear="getInitialDataProblemType()"
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
                                            label="Please select problem type"
                                            :rules="ticketdropdownrule"
                                        >
                                            <template v-slot:no-data>
                                                <v-list-item>
                                                    <v-list-item-title>
                                                        No results matching "<strong>{{ searchProblem }}</strong
                                                        >". Press
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
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Due Date</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="date"
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
                                            label="Please select assign engineer"
                                            :rules="ticketdropdownrule"
                                        ></v-select>
                                        <template v-slot:selection="{ item }">
                                            <span
                                                >{{ assignErOptions.first_name + ' ' + assignErOptions.last_name }} -{{
                                                    assignErOptions.phone
                                                }}
                                            </span>
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
                                            label="Please select a ticket priority "
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
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">collected amount</v-label>
                                        <v-text-field
                                            v-model="collectedAmount"
                                            variant="outlined"
                                            color="primary"
                                            :rules="collectAmountRule"
                                            @input="remainAmount"
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
                                    <v-col cols="12" md="6" v-if="paymentStatus.id == 2 || paymentStatus.id == 3">
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
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
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
const createticketform = ref();
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
const breadcrumbs = ref([
    {
        text: 'Ticket Listing',
        disabled: false,
        href: '/tickets'
    },
    {
        text: 'Create Ticket',
        disabled: true,
        href: '#'
    }
]);

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
function getinputs() {
    addressLineOne.value = selectAddress.value.address_line1;
    area.value = selectAddress.value.area;
    city.value = selectAddress.value.city;
    zipcode.value = selectAddress.value.zipcode;
    state.value = selectAddress.value.state;
    countryName.value = selectAddress.value.country;
    companyName.value = selectAddress.value.company_name;
}
function closeDialog() {
    router.push('/tickets');
}
function onEnter() {
    const data = (searchCustomer.value || '').trim();
    const val = {
        id: '',
        first_name: data,
        last_name: '',
        email: '',
        created_at: '',
        updated_at: '',
        customer_id: '',
        phone: ''
    };
    if (!selectCustomerList.value.includes(data)) {
        addressLineOne.value = '';
        area.value = '';
        city.value = '';
        zipcode.value = '';
        state.value = '';
        countryName.value = '';
        companyName.value = '';
        selectCustomerList.value.unshift(val);
        console.log('trueee11', selectCustomerList.value);

        isExistingCustomer.value = false;
        selectAddress.value = '';
    }
}
function onEnterProblem() {
    const requestBody = {
        problem_name: searchProblem.value
    };
    baseURlApi
        .post('settings/problem-type/add', requestBody)
        .then((res) => {
            searchProblem.value = '';
            console.log('ress', res.data.data);
            problemTypeOptions.value.unshift(res.data.data);
        })
        .catch((error) => {
            showSnackbar.value = true;
            isSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}

/*methods*/
async function createTicket() {
    const { valid } = await createticketform.value?.validate();
    const problem_type = problemType.value.map((data) => {
        return data.id;
    });
    if (valid) {
        issubmit.value = true;
        const requestBody = {
            ticket_type: tiketTypeRadio.value,
            customer_name:
                isExistingCustomer.value == true
                    ? selectedCustomer.value.first_name + selectedCustomer.value.last_name
                    : selectedCustomer.value.first_name,
            is_existing_customer: isExistingCustomer.value == true ? 1 : 0,
            customer_id: isExistingCustomer.value ? selectedCustomer.value.customer_id : '',
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
            ticket_status_id: 1,
            priority_id: Ticketpriority.value.id,
            assigned_user_id: assignEr.value.id,
            appointment_type_id: appointmentType.value.id,
            ticket_amount: parseInt(ticketAmount.value),
            payment_type_id: paymentStatus.value.id,
            collected_amount: parseInt(collectedAmount.value),
            remaining_amount: parseInt(remainingAmount.value),
            payment_mode: paymentMode.value
        };
        baseURlApi
            .post('ticket/create', requestBody)
            .then((res) => {
                console.log('respp', res);
                // const addedData = res.data.data;
                // emit('addUserClicked', addedData);
                router.push({
                    name: 'Tickets'
                });
                issubmit.value = false;
                createticketform.value?.reset();
                createticketform.value?.resetValidation();

                message.value = res.data.message;
                isSnackbar.value = true;
                showSnackbar.value = true
                icon.value = 'mdi-check-circle';
                color.value = 'success';
            })
            .catch((error) => {
                issubmit.value = false;
                showSnackbar.value = true
                isSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function getFieldText(item) {
    console.log('itemmm', isExistingCustomer.value);

    console.log('item exx', item);
    return (
        `${item.first_name ? item.first_name : ''}` +
        ' ' +
        `${item.last_name ? item.last_name : ''}` +
        `${item.phone ? '-(' + item.phone + ')' : ''}`
    );
}
function getAssignErText(item) {
    {
        console.log('item', item);
        return `${item.first_name + ' ' + item.last_name} -(${item.phone})`;
    }
}
function getCustomers() {
    return selectCustomerList.value;
}
function clearOnInput() {
    selectedCustomer.value = null;
}
function getAddress() {
    mobile.value = selectedCustomer.value.phone;
    customerEmail.value = selectedCustomer.value.email;
    // isExistingCustomer.value = true
    if (selectedCustomer.value?.id) {
        baseURlApi
            .get(`ticket/get-customer-address/${selectedCustomer.value.customer_id}`)
            .then((res) => {
                console.log('valll', res.data.data);
                addressOptions.value = res.data.data;
                // selectCustomerList.value = res.data.data.d;
            })
            .catch((error) => {
                isSnackbar.value = true;
                showSnackbar.value = true;
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
                if (data.id == 1) {
                    ticketStatus.value = data;
                }
            });
            data.payment_status.map((data) => {
                if (data.id == 1) {
                    paymentStatus.value = data;
                }
            });
            // ticketStatus.value =
            appointmentTypeOptions.value = data.appointment_type;
            paymentStatusOptions.value = data.payment_status;
            paymentModeOptions.value = data.payment_mode;
            TicketpriorityOptions.value = data.ticket_priorities;
            selectCustomerList.value = data.customers;
        })
        .catch((error) => {
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function getInitialData() {
    console.log('clickrdd');
    customerComboBox.value.reset();
    isExistingCustomer.value = false;
    console.log('clickrd111', isExistingCustomer.value);
    selectedCustomer.value = null;
    searchCustomer.value = '';
}
function clearInput() {
    const data = (searchCustomer.value || '').trim();

    if (!selectCustomerList.value.includes(data)) {
        // console.log('trueee');
        // selectCustomerList.value.unshift(val);
        // console.log('trueee11', selectCustomerList.value);
        selectedCustomer.value = null;
        isExistingCustomer.value = false;
        selectAddress.value = '';
    } else {
        isExistingCustomer.value = true;
    }
}
function getInitialDataProblemType() {
    problemType.value = '';
    isExistingCustomer.value = false;
}
function addNewCustomer() {
    console.log('ddd');
}
function changePaymentMode(){
    if(paymentStatus.value.id == 2){
    paymentMode.value = paymentModeOptions.value[1]
    }
    else{
        paymentMode.value = []
    }
    }

/************************* computed  ***************************/
const remainAmount = computed(() => {
    return (remainingAmount.value = parseInt(ticketAmount.value) - parseInt(collectedAmount.value));
});

onMounted(() => {
    getTickets();
});

watch(selectedCustomer.value, (val) => {
    if (val.length > 5) {
        this.$nextTick(() => selectedCustomer.value.pop());
        console.lof('watchh', selectedCustomer.value);
    }
});
</script>
<style scoped>
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

</style>

