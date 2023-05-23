<template>
    <div>
        <v-col cols="12">
            <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        </v-col>

        <v-col cols="12">
            <h5 class="text-h5 mb-6 mt-3">Create New Ticket</h5>
            <v-card elevation="10" class="t-add-card" rounded="md">
                <!------------------------------------ Ticket type ----------------------------------->
                <v-row>
                    <v-col cols="8" class="d-flex">
                        <v-label class="font-weight-medium text-capitalize">ticket type</v-label>
                        <v-radio-group v-model="tiketTypeRadio" inline class="d-flex">
                            <v-radio label="Addhoc" value="addhoc" color="primary"></v-radio>
                            <v-radio label="Contract" value="contract" color="primary"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <!------------------------------------ Addhoc form ----------------------------------->
                <v-row v-if="tiketTypeRadio == 'addhoc'">
                    <v-col cols="8">
                        <v-row>
                            <!---------------------------------- customer name --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Customer Name</v-label>
                                <v-text-field
                                    v-model="customerName"
                                    variant="outlined"
                                    color="primary"
                                    placeholder="jhon doe   "
                                ></v-text-field>
                            </v-col>
                            <!---------------------------------- Mobile Number --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Mobile Number</v-label>
                                <v-text-field v-model="mobile" color="primary" variant="outlined" type="text" placeholder="9103388993" />
                            </v-col>
                            <!---------------------------------- Address --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">choose Address</v-label>
                                <v-select
                                    label="Please select address"
                                    v-model="selectAddress"
                                    :items="addressOptions"
                                    item-title="name"
                                    item-value="value"
                                    return-object
                                    single-line
                                    variant="outlined"
                                ></v-select>
                            </v-col>
                            <!---------------------------------- company name --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Company Name</v-label>
                                <v-text-field
                                    v-model="companyName"
                                    variant="outlined"
                                    color="primary"
                                    placeholder="Rivulet Digital"
                                ></v-text-field>
                            </v-col>
                            <!---------------------------------- address line 1 --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">address line</v-label>
                                <v-text-field
                                    v-model="addressLineOne"
                                    variant="outlined"
                                    color="primary"
                                    placeholder="near sindhubhavan road"
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
                                    placeholder="john.deo@gmail.com"
                                />
                            </v-col>
                            <!---------------------------------- area --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">area</v-label>
                                <v-text-field v-model="area" variant="outlined" color="primary" placeholder="Bodakdev"></v-text-field>
                            </v-col>
                            <!---------------------------------- city --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">City</v-label>
                                <v-text-field v-model="city" variant="outlined" color="primary" placeholder="Ahmedabad"></v-text-field>
                            </v-col>
                            <!---------------------------------- zip code --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Zip Code</v-label>
                                <v-text-field v-model="zipcode" variant="outlined" color="primary" placeholder="380054"></v-text-field>
                            </v-col>
                            <!---------------------------------- state --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">State</v-label>
                                <v-text-field v-model="state" variant="outlined" color="primary" placeholder="Gujarat"></v-text-field>
                            </v-col>
                            <!---------------------------------- country --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Country</v-label>
                                <v-text-field v-model="countryName" variant="outlined" color="primary" placeholder="India"></v-text-field>
                            </v-col>

                            <v-divider></v-divider>
                            <!---------------------------------- Problem type --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Problem type</v-label>
                                <v-select
                                    v-model="problemType"
                                    :items="problemTypeOptions"
                                    item-title="name"
                                    item-value="value"
                                    return-object
                                    single-line
                                    variant="outlined"
                                    multiple
                                    label="Please select problem type"
                                ></v-select>
                            </v-col>
                            <!---------------------------------- problem title --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">problem title</v-label>
                                <v-text-field
                                    v-model="problemTitle"
                                    variant="outlined"
                                    color="primary"
                                    placeholder="Problem title"
                                ></v-text-field>
                            </v-col>
                            <!---------------------------------- description --------------------------------->
                            <v-col cols="12">
                                <v-label class="font-weight-medium">description</v-label>
                                <v-textarea
                                    v-model="description"
                                    auto-grow
                                    variant="outlined"
                                    placeholder="150, Ring Road"
                                    rows="2"
                                    color="primary"
                                    row-height="25"
                                    shaped
                                ></v-textarea>
                            </v-col>
                            <!---------------------------------- Due Date --------------------------------->
                            <v-col cols="12" sm="6">
                                <v-label class="font-weight-medium mb-2">Due Date</v-label>
                                <v-text-field
                                    color="primary"
                                    variant="outlined"
                                    type="date"
                                    v-model="dueDate"
                                    placeholder="12-12-2023"
                                ></v-text-field>
                            </v-col>
                            <!---------------------------------- Assign Engineer --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Assign Engineer</v-label>
                                <v-select
                                    v-model="assignEr"
                                    :items="assignErOptions"
                                    item-title="name"
                                    item-value="value"
                                    return-object
                                    single-line
                                    variant="outlined"
                                    label="Please select assign engineer"
                                ></v-select>
                            </v-col>
                            <!---------------------------------- Ticket status --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Ticket status</v-label>
                                <v-select
                                    v-model="ticketStatus"
                                    :items="ticketStatusOptions"
                                    item-title="name"
                                    item-value="value"
                                    return-object
                                    single-line
                                    variant="outlined"
                                    label="Please select ticket status"
                                ></v-select>
                            </v-col>
                            <!---------------------------------- Appointment type --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Appointment type</v-label>
                                <v-select
                                    v-model="appointmentType"
                                    :items="appointmentTypeOptions"
                                    item-title="name"
                                    item-value="value"
                                    return-object
                                    single-line
                                    variant="outlined"
                                    label="Please select appointment type"
                                ></v-select>
                            </v-col>
                            <v-divider></v-divider>
                            <!---------------------------------- ticket amount --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">ticket amount</v-label>
                                <v-text-field
                                    v-model="ticketAmount"
                                    variant="outlined"
                                    color="primary"
                                    placeholder="Please enter ticket amount"
                                ></v-text-field>
                            </v-col>
                             <!---------------------------------- Payment status --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Payment status</v-label>
                                <v-select
                                    v-model="paymentStatus"
                                    :items="paymentStatusOptions"
                                    item-title="name"
                                    item-value="value"
                                    return-object
                                    single-line
                                    variant="outlined"
                                    label="Please select payment status"
                                ></v-select>
                            </v-col>
                             <!---------------------------------- collected amount --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">collected amount</v-label>
                                <v-text-field
                                    v-model="collectedAmount"
                                    variant="outlined"
                                    color="primary"
                                    placeholder="Please enter collected amount"
                                ></v-text-field>
                            </v-col>
                              <!---------------------------------- Remaining amount --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Remaining amount</v-label>
                                <v-text-field
                                    v-model="remainingAmount"
                                    variant="outlined"
                                    color="primary"
                                    placeholder="Please enter remaining amount"
                                ></v-text-field>
                            </v-col>
                             <!---------------------------------- payment mode --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">payment mode</v-label>
                                <v-select
                                    v-model="paymentMode"
                                    :items="paymentModeOptions"
                                    item-title="name"
                                    item-value="value"
                                    return-object
                                    single-line
                                    variant="outlined"
                                    label="Please select payment mode"
                                ></v-select>
                            </v-col>
                           <!---------------------------------- Action ------------------------------------>
                            <v-col cols="12" >               
                                <v-btn color="error" class="mr-3">Cancel</v-btn>
                                <v-btn color="primary">Submit</v-btn>
                              </v-col>
                        </v-row>
                              
                    </v-col>

                </v-row>

                <!------------------------------------ contract form ----------------------------------->
                <v-row v-if="tiketTypeRadio == 'contract'">
                    <v-col cols="8">
                        <v-row>
                            <!---------------------------------- Select customer --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Select Customer</v-label>
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
                                <v-label class="mb-2 font-weight-medium text-capitalize">Email</v-label>
                                <v-text-field
                                    v-model="customerEmail"
                                    color="primary"
                                    variant="outlined"
                                    type="email"
                                    placeholder="john.deo@gmail.com"
                                />
                            </v-col>
                            <!---------------------------------- Mobile Number --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Mobile Number</v-label>
                                <v-text-field v-model="mobile" color="primary" variant="outlined" type="text" placeholder="9103388993" />
                            </v-col>
                            <!---------------------------------- Address --------------------------------->
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium text-capitalize">Select Address</v-label>
                                <v-select
                                    v-model="selectAddress"
                                    :items="addressOptions"
                                    item-title="name"
                                    item-value="value"
                                    return-object
                                    single-line
                                    variant="outlined"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" lg="12">
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize">First Name</v-label>
                                        <v-text-field variant="outlined" color="primary"></v-text-field>
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Select Gender</v-label>
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
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Last Name</v-label>
                                        <v-text-field variant="outlined" color="primary"></v-text-field>
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Date of Birth</v-label>
                                        <v-text-field color="primary" variant="outlined" type="date"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Street</v-label>
                                        <v-text-field variant="outlined" color="primary"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize">City</v-label>
                                        <v-text-field variant="outlined" color="primary"></v-text-field>
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Post Code</v-label>
                                        <v-text-field variant="outlined" color="primary"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-label class="mb-2 font-weight-medium text-capitalize">State</v-label>
                                        <v-text-field variant="outlined" color="primary"></v-text-field>
                                        <v-label class="mb-2 font-weight-medium text-capitalize">Country</v-label>
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
                                <v-btn color="primary">Submit</v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import BasicHeaderForm from '@/components/forms/form-layouts/BasicHeaderForm.vue';

const select = ref('select');
const mobile = ref('');
const customerName = ref('');
const customers = ref([]);
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
const problemType = ref([]);
const problemTypeOptions = ref([
    {
        name: 'one',
        value: '1'
    },
    {
        name: 'two',
        value: '2'
    }
]);
const addressLineOne = ref('');
const area = ref('');
const city = ref('');
const zipcode = ref('');
const state = ref('');
const countryName = ref('');
const companyName = ref('');
const description = ref('');
const problemTitle = ref('');
const selectAddress = ref('');
const dueDate = ref('');
const ticketAmount = ref('');
const collectedAmount = ref('');
const remainingAmount = ref('');
const addressOptions = ref([
    {
        name: 'one',
        value: '1'
    },
    {
        name: 'two',
        value: '2'
    }
]);
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
const assignErOptions = ref([
    {
        name: 'one',
        value: '1'
    },
    {
        name: 'two',
        value: '2'
    }
]);
const ticketStatus = ref([]);
const ticketStatusOptions = ref([
    {
        name: 'one',
        value: '1'
    },
    {
        name: 'two',
        value: '2'
    }
]);
const paymentStatus = ref([]);
const paymentStatusOptions = ref([
    {
        name: 'one',
        value: '1'
    },
    {
        name: 'two',
        value: '2'
    }
]);
const paymentMode = ref([]);
const paymentModeOptions = ref([
    {
        name: 'one',
        value: '1'
    },
    {
        name: 'two',
        value: '2'
    }
]);
const appointmentType = ref([]);
const appointmentTypeOptions = ref([
    {
        name: 'one',
        value: '1'
    },
    {
        name: 'two',
        value: '2'
    }
]);
const gender = ref(['Male', 'Female']);
const tiketTypeRadio = ref('addhoc');
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
        text: 'Add Ticket',
        disabled: true,
        href: '#'
    }
]);
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
</style>
