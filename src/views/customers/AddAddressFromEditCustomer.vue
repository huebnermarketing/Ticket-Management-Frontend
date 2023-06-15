<template>
    <div class="text-center">
        <v-dialog v-model="dialog" persistent class="dialog-mw">
            <v-card class="overflow-auto">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Add New Address</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-form @submit.prevent="addAddress" ref="createAddressForm">
                    <v-container>
                        <v-card-text>
                            <v-row align="start" align-content-md="start" justify="start" style="max-width: 1000px">
                                <!-- accept="image/png, image/jpeg,i image/jpg" -->
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
const companyId = ref(0);
const issubmit = ref(false);
let addressList = [];

//props for toastification
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const createAddressForm = ref();

// props
const props = defineProps({
    customerId: Number
});

/*emits*/
const emit = defineEmits(['editAddressClicked']);

//methods
function uploadImage(e) {
    console.log('uploadedd');
    isProfileImg.value = true;
    const fd = new FormData();
    const file = e.target.files[0];
    UserProfileFile.value = file;
    userProfilePic.value = URL.createObjectURL(e.target.files[0]);
    fd.append('file', file);
}
function resetProfilepic() {
    userProfilePic.value = '';
    isProfileImg.value = false;
}
function closeDialog() {
    createAddressForm.value?.reset();
    dialog.value = false;
}

function limitFileSize() {
    let size = parseFloat(this.file1 ? this.file1.size : '') / (1024 * 1024).toFixed(2);
    size > 10 ? (this.fileSize = true) : (this.fileSize = false);
}
async function addAddress() {
    const { valid } = await createAddressForm.value?.validate();

    if (valid) {
        const requestBody = {
            customer_id: props.customerId,
            address_line1: address.value,
            company_name: companyName.value,
            area: area.value,
            city: city.value,
            state: state.value,
            zipcode: zipcode.value,
            country: country.value,
            is_primary: 0
        };
        baseURlApi
            .post('customer/address/add', requestBody)
            .then((res) => {
                const data = [];
                data.push({
                    address_line1: address.value,
                    customer_id: props.customerId,
                    company_name: companyName.value,
                    area: area.value,
                    city: city.value,
                    state: state.value,
                    zipcode: zipcode.value,
                    country: country.value,
                    is_primary: 0
                });
                store.setUpdateAddress(...data);
                // console.log("ddd 111",store.getupdateAddress)
                emit('editAddressClicked', data);
                issubmit.value = false;
                createAddressForm.value?.reset();
                createAddressForm.value?.resetValidation();
                country.value = 'india';
                dialog.value = false;
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
function open() {
    dialog.value = true;
}

onMounted(() => {
    // getRoles();
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
/* .v-input__details {
    display: none !important;
} */
</style>
