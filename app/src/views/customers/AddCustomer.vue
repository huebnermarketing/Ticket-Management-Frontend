<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-top-transition">
            <v-card class="overflow-auto">
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="closeDialog()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Add Customer</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-form @submit.prevent="createUser" ref="createcustomerform">
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
                                        placeholder="jhon"
                                        :rules="firstnamerule"
                                    >
                                    </v-text-field>
                                </v-col>
                                <!---------------------------------- Last name --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize">last Name</v-label>
                                    <v-text-field v-model="lastName" variant="outlined" color="primary" placeholder="doe"></v-text-field>
                                </v-col>
                                <!---------------------------------- Mobile Number --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Mobile Number</v-label>
                                    <v-text-field
                                        v-model="mobile"
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="9103388993"
                                        :rules="mobilerule"
                                    />
                                </v-col>
                                <!---------------------------------- Email ------------------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Email ID</v-label>
                                    <v-text-field
                                        v-model="userEmail"
                                        color="primary"
                                        variant="outlined"
                                        type="email"
                                        placeholder="john.deo@gmail.com"
                                        autocomplete="off"
                                        :rules="emailrule"
                                    />
                                </v-col>
                                <!---------------------------------- Action ------------------------------------>
                            </v-row>
                        </v-card-text>
                    </v-container>
                </v-form>
                <v-form @submit.prevent="createUser" ref="createcustomerform">
                    <v-container>
                        <v-card-title class="pa-5 border card-title-border">
                            <span class="text-h5">Add Address</span>
                            <v-btn color="primary ml-4" @click="openAddAddressDialog()">Add</v-btn>
                        </v-card-title>
                        <v-card-text class="border border-top-0">
                            <v-card elevation="2" width="fit-content" class="m-0 p-5 address-card" v-for="(data, i) in addaddress" :key="i">
                                <div class="p-2 w-inherit">
                                    <p class="font-weight-bold">{{ data.company_name }}</p>
                                    <div class="mt-2">
                                        <span class="font-weight-bold">{{ data.address_line1 }}, </span>
                                        
                                    </div>
                                    <div class="mt-2">
                                        <span class="font-weight-bold">{{ data.area }}, </span>
                                        <span class="font-weight-bold">{{ data.city }}</span>
                                        <span class="font-weight-bold">{{ data.zipcode }}</span>
                                    </div>
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
        <AddAddress ref="addNewaddress" @addAddressClicked="addaddressData"/>
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
    </v-row>
</template>
<script setup>
import { ref, defineExpose, defineComponent, onMounted } from 'vue';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
import { Form } from 'vee-validate';
import { baseURlApi } from '@/api/axios';
import AddAddress from './AddAddress.vue'

//mixins
const { confirmpwd, newpwd, firstnamerule, lastnamerule, mobilerule, emailrule, passwordrule, rule, confirmpasswordrule, dropdownrule } =
    formValidationsRules();

const dialog = ref(false);

const firstName = ref('');
const lastName = ref('');
const userEmail = ref('');
const mobile = ref('');
const issubmit = ref(false);
const addNewaddress = ref()
const addaddress = ref([]);

//props for toastification
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const createcustomerform = ref();

// validations rules

/*emits*/
const emit = defineEmits(['addUserClicked']);

//methods
function closeDialog() {
    createcustomerform.value?.reset();
    createcustomerform.value?.resetValidation();
    dialog.value = false;
}
function limitFileSize() {
    let size = parseFloat(this.file1 ? this.file1.size : '') / (1024 * 1024).toFixed(2);
    size > 10 ? (this.fileSize = true) : (this.fileSize = false);
}
function addaddressData( addressList ) {
  
    addaddress.value =  addressList
    console.log("array111111",addaddress.value, typeof Object.keys(addressList))
}
async function createUser() {
    const { valid } = await createcustomerform.value?.validate();
    if (valid) {
        issubmit.value = true;
        const fd = new FormData();
        console.log('rolee', userRole.value.id);
        fd.append('first_name', firstName.value);
        fd.append('last_name', lastName.value);
        fd.append('phone', mobile.value);
        fd.append('role_id', userRole.value.id);
        fd.append('profile_photo', UserProfileFile.value);
        fd.append('email', userEmail.value);
        fd.append('password', newpwd.value);
        fd.append('password_confirmation', confirmpwd.value);

        baseURlApi
            .post('user/create-user', fd)
            .then((res) => {
                const addedData = res.data.data;
                emit('addUserClicked', addedData);
                issubmit.value = false;
                createcustomerform.value?.reset();
                createcustomerform.value?.resetValidation();
                dialog.value = false;
                // message.value = res.data.message;
                // isSnackbar.value = true;
                // icon.value = 'mdi-check-circle';
                // color.value = 'success';
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
function openAddAddressDialog() {
    addNewaddress.value?.open();
}
onMounted(() => {
    // getRoles();
});
defineExpose({
    open,
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
.address-card{
    padding: 18px !important;
    margin-top: 12px !important;
}
/* .v-input__details {
    display: none !important;
} */
</style>
