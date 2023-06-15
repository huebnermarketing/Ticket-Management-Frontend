<template>
    <div class="text-center">
        <v-dialog v-model="dialog" persistent class="dialog-mw">
            <v-card class="overflow-auto">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Edit Address</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-form @submit.prevent="updateAddress" ref="updateAddressForm">
                    <v-container>
                        <v-card-text>
                            <v-row align="start" align-content-md="start" justify="start" style="max-width: 1000px">
                                <!---------------------------------- Company name --------------------------------->
                                <v-col cols="12" md="6" class="text-start">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">company name</v-label>
                                    <v-text-field
                                        required
                                        name="companyName"
                                        v-model="companyName"
                                        variant="outlined"
                                        color="primary"
                                        :rules="companynamerule"
                                    >
                                    </v-text-field>
                                </v-col>
                                <!---------------------------------- Address line --------------------------------->
                                <v-col cols="12" md="6" class="text-start">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Address line 1</v-label>
                                    <v-text-field
                                        v-model="address"
                                        variant="outlined"
                                        color="primary"
                                        :rules="addresslinerule"
                                    ></v-text-field>
                                </v-col>
                                <!---------------------------------- Area  --------------------------------->
                                <v-col cols="12" md="6" class="text-start">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Area</v-label>
                                    <v-text-field v-model="area" color="primary" variant="outlined" type="text" :rules="arearule" />
                                </v-col>
                                <!---------------------------------- zip code ------------------------------------------->
                                <v-col cols="12" md="6" class="text-start">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Zip code</v-label>
                                    <v-text-field
                                        v-model="zipcode"
                                        color="primary"
                                        variant="outlined"
                                        autocomplete="off"
                                        :rules="zipcoderule"
                                    />
                                </v-col>
                                <!---------------------------------- City ------------------------------------------->
                                <v-col cols="12" md="6" class="text-start">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">City</v-label>
                                    <v-text-field v-model="city" color="primary" variant="outlined" autocomplete="off" :rules="cityrule" />
                                </v-col>
                                <!---------------------------------- state  --------------------------------->
                                <v-col cols="12" md="6" class="text-start">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">State</v-label>
                                    <v-text-field v-model="state" color="primary" variant="outlined" type="text" :rules="staterule" />
                                </v-col>
                                <!---------------------------------- country ------------------------------------------->
                                <v-col cols="12" md="6" class="text-start">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">country</v-label>
                                    <v-text-field
                                        v-model="country"
                                        color="primary"
                                        variant="outlined"
                                        autocomplete="off"
                                        :rules="countyrule"
                                    />
                                </v-col>
                                <!---------------------------------- Action ------------------------------------>
                                <v-spacer></v-spacer>
                                <v-col cols="12" class="text-right">
                                    <v-btn color="error" class="mr-3" @click="closeDialog()" v-if="!issubmit">Cancel</v-btn>
                                    <v-btn color="primary" type="submit" v-if="!issubmit">Save</v-btn>
                                    <v-btn color="error" class="mr-3" v-if="issubmit" disabled>Cancel</v-btn>
                                    <v-btn color="primary" v-if="issubmit" disabled>Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
    </div>
</template>
<script setup>
import { ref, defineExpose, defineComponent, onMounted } from 'vue';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
import { Form } from 'vee-validate';
import { baseURlApi } from '@/api/axios';
import { useCustomerAddressStore } from '@/stores/customerAddress';
const store = useCustomerAddressStore();
//mixins
const { cityrule, staterule, zipcoderule, countyrule, arearule, companynamerule, addresslinerule, passwordrule, dropdownrule } =
    formValidationsRules();
const dialog = ref(false);
const companyName = ref('');
const address = ref('');
const city = ref('');
const area = ref('');
const state = ref('');
const country = ref('india');
const zipcode = ref('');
const isLoading = ref(false);
const addrId = ref(0);
const issubmit = ref(false);
let addressList = [];

//props for toastification
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const updateSingleAddress = ref();
const updateAddressForm = ref();
const singleAddressDetails = ref({});

// validations rules

/*emits*/
const emit = defineEmits(['updateAddressClicked']);

//props
const props = defineProps({
    customerId: Number
});

//methods
function closeDialog() {
    updateAddressForm.value?.reset();
    updateAddressForm.value?.resetValidation();
    dialog.value = false;
}
async function updateAddress() {
    const { valid } = await updateAddressForm.value?.validate();
    if (valid) {
        const requestBody = {
            customer_id: props.customerId,
            address_line1: address.value,
            company_name: companyName.value,
            area: area.value,
            city: city.value,
            state: state.value,
            zipcode: zipcode.value,
            country: country.value
        };
        baseURlApi
            .post(`customer/address/update/${addrId.value}`, requestBody)
            .then((res) => {
                const data = [];
                emit('updateAddressClicked', data);
                issubmit.value = false;
                updateAddressForm.value?.reset();
                updateAddressForm.value?.resetValidation();
                dialog.value = false;
                 message.value = res.data.message;
                isSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
            })
            .catch((error) => {
                issubmit.value = false;
                isSnackbar.value = true;
                message.value = error.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function getAddressData(id) {
    console.log('calleddd', id);
    // isLoading.value = true;
    addrId.value = id;
    baseURlApi
        .get(`customer/address/get/${id}`)
        .then((res) => {
            console.log('calleddd1111', res);
            // isLoading.value = false;
            const data = res.data.data;
            (address.value = data.address_line1),
                (companyName.value = data.company_name),
                (area.value = data.area),
                (city.value = data.city),
                (state.value = data.state),
                (zipcode.value = data.zipcode),
                (country.value = data.country);
        })
        .catch((error) => {
            // isLoading.value = false;
        });
}
function open() {
    dialog.value = true;
}

defineExpose({
    open,
    getAddressData
});
</script>
<style>
.users-profile-image {
    object-fit: cover !important;
    width: inherit !important;
}
/* .v-input__details {
    display: none !important;
} */
</style>
