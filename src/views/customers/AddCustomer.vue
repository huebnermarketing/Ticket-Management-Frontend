<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-top-transition">
            <v-card class="overflow-auto">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Add Customer</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-form @submit.prevent="createCustomer" ref="createcustomerform">
                    <v-container>
                        <v-card-title class="pa-5 border card-title-border">
                            <span class="text-h5">Personal Details</span>
                        </v-card-title>
                        <v-card-text class="border border-top-0">
                            <v-row class="mt-2">
                                <!---------------------------------- First name --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">First Name</v-label>
                                    <v-text-field
                                        required
                                        name="firstName"
                                        v-model="firstName"
                                        variant="outlined"
                                        color="primary"
                                        :rules="firstnamerule"
                                    >
                                    </v-text-field>
                                </v-col>
                                <!---------------------------------- Last name --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize">last Name</v-label>
                                    <v-text-field v-model="lastName" variant="outlined" color="primary"></v-text-field>
                                </v-col>
                                <!---------------------------------- Mobile Number --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Mobile Number</v-label>
                                    <v-text-field v-model="mobile" color="primary" variant="outlined" type="text" :rules="mobilerule" />
                                </v-col>
                                <!---------------------------------- Email ------------------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize">Email ID</v-label>
                                    <v-text-field
                                        v-model="userEmail"
                                        color="primary"
                                        variant="outlined"
                                        type="email"
                                        autocomplete="off"
                                        :rules="emailPatternrule"
                                    />
                                </v-col>
                                <!---------------------------------- Alternative Number --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize">Alternative Mobile Number</v-label>

                                    <div class="d-flex justify-center alternative-phone" v-for="(items, i) in altMobile" :key="i">
                                        <div class="altmobile-input-div">
                                            <v-text-field
                                                v-model="items.altMobileNo"
                                                color="primary"
                                                variant="outlined"
                                                type="text"
                                                :rules="alternativemobilerule"
                                            />
                                        </div>
                                        <div class="ml-2 altmobile-action-div">
                                            <CirclePlusIcon
                                                stroke-width="1.5"
                                                size="25"
                                                class="text-primary cursor-pointer"
                                                @click="addInput(i)"
                                                v-if="altMobile.length - 1 == i"
                                            />
                                            <TrashIcon
                                                stroke-width="1.5"
                                                size="25"
                                                class="text-error cursor-pointer"
                                                @click="deleteInput(i)"
                                                v-if="altMobile.length > 1"
                                            />
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-container>
                    <v-container>
                        <!---------------------------------- Address Details ------------------------------------>
                        <v-card-title class="pa-5 border card-title-border">
                            <span class="text-h5 required">Address Details</span>
                            <v-btn color="primary ml-4" @click="openAddAddressDialog()">Add</v-btn>
                        </v-card-title>
                        <v-card-text class="border border-top-0 d-flex justify-start flex-wrap">
                            <div class="mt-3">
                                <span class="err-address text-error" v-if="isEmptyAddress">Address details is required.</span>
                            </div>
                            <v-card elevation="2" class="m-0 p-5 address-card" v-for="(data, i) in addaddress" :key="i">
                                <div>
                                    <v-radio-group v-model="radios">
                                        <v-radio :value="i" class="radio-primary-address">
                                            <template v-slot:label>
                                                <div class="radio-label" @click="primaryAddressChange(i)">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="icon icon-tabler icon-tabler-star-filled"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="rgb(93,135,255)"
                                                        fill="rgb(93,135,255)"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    >
                                                        <path
                                                            d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
                                                            stroke-width="1"
                                                            :fill="i == radios || data.is_primary? 'rgb(93,135,255)' : 'rgb(255,255,255)'"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </template>
                                        </v-radio>
                                    </v-radio-group>
                                </div>
                                <div class="p-2 w-inherit">
                                    <p class="font-weight-medium h6">{{ data.company_name }}</p>
                                    <div class="mt-2">
                                        <span class="font-weight-medium h6">{{ data.address_line1 }}, </span>
                                         <span class="font-weight-medium h6">{{ data.area }}, </span>
                                    </div>
                                    <div class="mt-2">
                                        <span class="font-weight-medium h6">{{ data.city }}, </span>
                                        <span class="font-weight-medium h6">{{ data.zipcode }}</span>
                                    </div>
                                </div>
                                <div class="d-flex align-end justify-end mt-1">
                                    <v-tooltip text="Edit">
                                        <template v-slot:activator="{}">
                                            <PencilIcon
                                                stroke-width="1.5"
                                                size="20"
                                                class="text-primary cursor-pointer"
                                                @click="openEditDialog(i, data)"
                                            />
                                        </template>
                                    </v-tooltip>
                                    <v-tooltip text="Delete" v-if="addaddress.length > 1 && data.is_primary == 0">
                                        <template v-slot:activator="{}">
                                            <TrashIcon
                                                stroke-width="1.5"
                                                size="20"
                                                class="text-error ml-2 cursor-pointer"
                                                @click="deleteAddress(i)"
                                            />
                                        </template>
                                    </v-tooltip>
                                </div>
                            </v-card>
                        </v-card-text>
                        <v-spacer></v-spacer>
                        <v-col cols="12" class="text-right">
                            <v-btn color="error" class="mr-3" @click="closeDialog()" v-if="!issubmit">Cancel</v-btn>
                            <v-btn color="primary" type="submit" v-if="!issubmit">Save</v-btn>
                            <v-btn color="error" class="mr-3" v-if="issubmit" disabled>Cancel</v-btn>
                            <v-btn color="primary" v-if="issubmit" disabled>Save</v-btn>
                        </v-col>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
        <AddAddress ref="addNewaddress" @addAddressClicked="addaddressData" />
        <EditSingleAddress ref="editsingleaddress" @updateClicked="filterData" />
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
        <!-- <EditSingleAddress ref="editsingleaddress" @updateClicked="filterData" :singleAddressDetail="singleAddressDetail" /> -->
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
    </v-row>
</template>
<script setup>
import { ref, defineExpose, defineComponent, onMounted } from 'vue';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
import { baseURlApi } from '@/api/axios';
import dialogBox from '@/components/TicketComponents/dialog.vue';
import AddAddress from './AddAddress.vue';
import EditSingleAddress from './EditSingleAddress.vue';
import icons from 'vue-tabler-icons';
import { useCustomerAddressStore } from '@/stores/customerAddress';
const store = useCustomerAddressStore();

//mixins
const { emailPatternrule,alternativemobilerule, firstnamerule, lastnamerule, mobilerule } = formValidationsRules();

const dialog = ref(false);

const firstName = ref('');
const lastName = ref('');
const userEmail = ref('');
const mobile = ref('');
const issubmit = ref(false);
const addNewaddress = ref();
const editsingleaddress = ref();
const addaddress = ref([]);
const isEmptyAddress = ref(false);
const altMobile = ref([
    {
        altMobileNo: ''
    }
]);
const radios = ref(0);
const singleAddressDetail = ref({});
const deleteDialog = ref();
const deleteId = ref(0);

//props for toastification
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const createcustomerform = ref();

//dialog props
const dialogTitle = ref('Are you sure you want to delete this address ?');
const dialogText = ref('This will delete this address permanently, you can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Delete');
const title = ref('Delete Address');

/*emits*/
const emit = defineEmits(['addCustomerClicked']);

//methods
function closeDialog() {
    createcustomerform.value?.reset();
    createcustomerform.value?.resetValidation();
    isEmptyAddress.value = false;
    dialog.value = false;
}
function addaddressData(data) {
    store.getnewAddress;
    addaddress.value = addaddress.value.concat(data);
    console.log("addd",addaddress.value,'ffff',addaddress.value)
    if (addaddress.value.length == 1) {
        addaddress.value[0].is_primary = 1;
        console.log("enyert",addaddress.value,'ffff',addaddress.value)    
    }
    if (addaddress.value.length > 0) isEmptyAddress.value = false;
}
async function createCustomer() {
    const { valid } = await createcustomerform.value?.validate();
    if (addaddress.value.length <= 0) isEmptyAddress.value = true;
    addaddress.value.map((item) => {
        return delete item.id;
    });
    if (valid && !isEmptyAddress.value) {
        issubmit.value = true;
        var altPhone = altMobile.value.map((item) => {
            return item['altMobileNo'];
        });
        console.log("alttt phone",altPhone)
        const requestBody = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: userEmail.value,
            primary_mobile: mobile.value,
            alternate_mobile: altPhone,
            addresses: addaddress.value
        };
        if (lastName.value == '') {
            delete requestBody.last_name;
        }
        if (altPhone[0] == null || altPhone[0] == '') {
            delete requestBody.alternate_mobile;
        }
        baseURlApi
            .post('customer/create', requestBody)
            .then((res) => {
                const addedData = res.data.data;
                emit('addCustomerClicked', addedData);
                issubmit.value = false;
                isEmptyAddress.value = false;
                createcustomerform.value?.reset();
                createcustomerform.value?.resetValidation();
                addaddress.value = [];
                dialog.value = false;
                message.value = res.data.message;
                isSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
            })
            .catch((error) => {
                issubmit.value = false;
                isEmptyAddress.value = false;
                isSnackbar.value = true;
                message.value = error.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function addInput(i) {
    if (altMobile.value[altMobile.value.length - 1].altMobileNo !== '')
        altMobile.value.push({
            altMobileNo: ''
        });
}
function deleteInput(i) {
    altMobile.value.splice(i, 1);
}
function open() {
    dialog.value = true;
    addaddress.value = [];
    store.$reset;
}
function primaryAddressChange(index) {
    return addaddress.value.map((item, i) => {
        if (i == index) {
            item.is_primary = 1;
        } else {
            item.is_primary = 0;
        }
    });
}
function openAddAddressDialog() {
    addNewaddress.value?.open();
}
function filterData(data) {
    console.log('existing1', data);
    const existing = addaddress.value.find((e) => e.id === data.id);

    if (existing) {
        Object.assign(existing, data);
    }
}
function openEditDialog(id, data) {
    singleAddressDetail.value = data;
    singleAddressDetail.value.id = id;
    console.log('singlee', singleAddressDetail.value);
    editsingleaddress.value?.open(singleAddressDetail.value);
}

//delete address
function cancelClick() {
    deleteDialog.value?.close();
}
function confirmClick() {
    addaddress.value.splice(deleteId.value, 1);
    deleteDialog.value?.close();
    deleteDialog.value?.close();
    isSnackbar.value = true;
    message.value = 'Address deleted successfully';
    color.value = 'error';
    icon.value = 'mdi-close-circle';
}
//delete user
function deleteAddress(id) {
    deleteId.value = id;
    deleteDialog.value?.open();
}
onMounted(() => {
    // addaddress.value = store.getnewAddress;
});
defineExpose({
    open
});
</script>
<style>
.users-profile-image {
    object-fit: cover !important;
    width: inherit !important;
}
.card-title-border {
    border-bottom: 0 !important;
}
.address-card {
    padding: 18px !important;
    margin-top: 12px !important;
    flex: 0 0 32%;
    margin-right: 13px;
}
.radio-primary-address .v-selection-control__wrapper {
    display: none !important;
}
.radio-label {
    width: inherit;
    text-align: end;
}
.v-radio-group > .v-input__details {
    display: none !important;
}
.alternative-phone svg {
    margin-top: 10px !important;
    margin-left: 3px !important;
}
.altmobile-input-div {
    width: 85% !important;
}
.altmobile-action-div {
    width: 15% !important;
}
.err-address {
    font-size: 12px;
    line-height: 12px;
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    transition-duration: 150ms;
}
</style>
