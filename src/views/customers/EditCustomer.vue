<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-top-transition">
            <v-card class="overflow-auto">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Edit Customer</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-form @submit.prevent="updateCustomer" ref="updatecustomerform">
                    <v-container>
                        <v-card-title class="pa-5 border card-title-border">
                            <span class="text-h5">Personal Details</span>
                        </v-card-title>
                        <v-card-text class="border border-top-0">
                            <div class="loading" v-if="isLoading">
                                <v-progress-circular indeterminate color="white"></v-progress-circular> <span class="ml-2">Loading</span>
                            </div>
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
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Email ID</v-label>
                                    <v-text-field
                                        v-model="userEmail"
                                        color="primary"
                                        variant="outlined"
                                        type="email"
                                        autocomplete="off"
                                        :rules="emailrule"
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
                                        <v-radio :value="i" class="radio-primary-addres">
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
                                                            :fill="
                                                                i == radios
                                                                    ? 'rgb(93,135,255)'
                                                                    : data.is_primary == 1
                                                                    ? 'rgb(93,135,255)'
                                                                    : 'rgb(255,255,255)'
                                                            "
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
                                    </div>
                                    <div class="mt-2">
                                        <span class="font-weight-medium h6">{{ data.area }}, </span>
                                        <span class="font-weight-medium h6">{{ data.city }}</span>
                                        <span class="font-weight-medium h6">{{ data.zipcode }}</span>
                                    </div>
                                </div>
                                <div class="d-flex align-end justify-end mt-1" v-if="addaddress.length > 1 && data.is_primary == 0">
                                    <v-tooltip text="Edit">
                                        <template v-slot:activator="{}">
                                            <PencilIcon
                                                stroke-width="1.5"
                                                size="20"
                                                class="text-primary cursor-pointer"
                                                @click="openEditDialog(data.id)"
                                            />
                                        </template>
                                    </v-tooltip>
                                    <v-tooltip text="Delete">
                                        <template v-slot:activator="{}">
                                            <TrashIcon
                                                stroke-width="1.5"
                                                size="20"
                                                class="text-error ml-2 cursor-pointer"
                                                @click="deleteAddress(data.id)"
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
        <AddAddressFromEditCustomer ref="addNewaddress" @editAddressClicked="addaddressData" :customerId="customerId" />
        <UpdateAddressFromEditCustomer ref="updateaddressfromeditcustomer" @updateAddressClicked="filterData" :customerId="customerId" />
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
    </v-row>
</template>
<script setup>
import { ref, defineExpose, defineComponent, onMounted } from 'vue';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
import { baseURlApi } from '@/api/axios';
import AddAddressFromEditCustomer from './AddAddressFromEditCustomer.vue';
import UpdateAddressFromEditCustomer from './UpdateAddressFromEditCustomer.vue';
import dialogBox from '@/components/TicketComponents/dialog.vue';
import icons from 'vue-tabler-icons';
import { useCustomerAddressStore } from '@/stores/customerAddress';
const store = useCustomerAddressStore();

//mixins
const { alternativemobilerule, firstnamerule, lastnamerule, mobilerule, emailrule } = formValidationsRules();

const dialog = ref(false);

const firstName = ref('');
const lastName = ref('');
const userEmail = ref('');
const mobile = ref('');
const issubmit = ref(false);
const addNewaddress = ref();
const updateaddressfromeditcustomer = ref();
const addaddress = ref([]);
const isEmptyAddress = ref(false);
const isLoading = ref(false);
const singleAddressDetail = ref({});

const altMobile = ref([
    {
        altMobileNo: ''
    }
]);
const radios = ref(0);
const customerId = ref(0);

//props for toastification
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const updatecustomerform = ref();

//dialog props
const dialogTitle = ref('Are you sure you want to delete this address ?');
const dialogText = ref('This will delete this address permanently, you can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Delete');
const title = ref('Delete Address');
const deleteDialog = ref();
const deleteId = ref(0);

/*emits*/
const emit = defineEmits(['updateClicked']);

//methods
function getCustomersData(id) {
    isLoading.value = true;
    customerId.value = id;
    baseURlApi
        .get(`customer/edit/${id}`)
        .then((res) => {
            isLoading.value = false;
            const data = res.data.data;
            console.log('get customer', data);
            firstName.value = data.first_name ? data.first_name : '';
            lastName.value = data.last_name;
            userEmail.value = data.email.trim();
            mobile.value = data.primary_mobile.trim();
            let altMobileArr = [];

            /*get alternativ mobile */
            data.phones.length > 0
                ? data.phones.map((item) => {
                      altMobileArr.push({
                          altMobileNo: item.phone
                      });
                  })
                : altMobileArr.push({
                      altMobileNo: ''
                  });
            altMobile.value = [...altMobileArr];
            /*get addresses */
            addaddress.value = data.locations;
        })
        .catch((error) => {
            isLoading.value = false;
        });
}
function closeDialog() {
    updatecustomerform.value?.reset();
    updatecustomerform.value?.resetValidation();
    dialog.value = false;
}
function filterData() {
    getCustomersData(customerId.value);
}
function addaddressData() {
    store.getupdateAddress;
    // addaddress.value = addaddress.value.concat(store.getupdateAddress);

    baseURlApi
        .get(`customer/address/get/${customerId.value}`)
        .then((res) => {
            isLoading.value = false;
            const data = res.data.data;
            addaddress.value = data;
            console.log('adddress', data);
            if (addaddress.value.length == 1) {
                addaddress.value[0].is_primary = 1;
            }
            if (addaddress.value.length > 0) isEmptyAddress.value = false;
        })
        .catch((error) => {
            isLoading.value = false;
        });
}
async function updateCustomer() {
    const { valid } = await updatecustomerform.value?.validate();
    if (addaddress.value.length <= 0) isEmptyAddress.value = true;
    if (valid && !isEmptyAddress.value) {
        issubmit.value = true;
        var altPhone = altMobile.value.map((item) => {
            return item['altMobileNo'];
        });
        let cId;
        addaddress.value.map((data) => {
            if (data.is_primary == 1) {
                cId = data.id;
            }
        });
        const requestBody = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: userEmail.value,
            primary_mobile: mobile.value,
            alternate_mobile: altPhone,
            primary_address_id: cId
        };
        if (lastName.value.length <= 0) {
            delete requestBody.last_name;
        }
        if (requestBody.alternate_mobile[0] == '') {
            delete requestBody.alternate_mobile;
        }
        baseURlApi
            .post(`customer/update/${customerId.value}`, requestBody)
            .then((res) => {
                const addedData = {
                    email: res.data.data.email,
                    first_name:res.data.data.first_name,
                    id: res.data.data.customer_id,
                    last_name:res.data.data.last_name,
                    phone: res.data.data.phone
                }

                emit('updateClicked', addedData);
                issubmit.value = false;
                isEmptyAddress.value = false;
                updatecustomerform.value?.reset();
                updatecustomerform.value?.resetValidation();
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
function openEditDialog(id) {
    // singleAddressDetail.value = data;
    // singleAddressDetail.value.id = id;
    // console.log('singlee', singleAddressDetail.value);
    updateaddressfromeditcustomer.value?.open();
    updateaddressfromeditcustomer.value?.getAddressData(id);
}
//delete address
function cancelClick() {
    deleteDialog.value?.close();
}
function confirmClick() {
    baseURlApi
        .delete(`customer/address/delete/${deleteId.value}`)
        .then((res) => {
            deleteDialog.value?.close();
            getCustomersData(customerId.value);
            message.value = res.data.message;
            isSnackbar.value = true;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
        })
        .catch((error) => {
            deleteDialog.value?.close();
            isSnackbar.value = true;
            message.value = error.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
//delete user
function deleteAddress(id) {
    deleteId.value = id;
    deleteDialog.value?.open();
}
onMounted(() => {
    // addaddressData()
    // addaddress.value = addaddress.value.concat(store.getupdateAddress);
});
defineExpose({
    open,
    getCustomersData
    // addaddressData
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
