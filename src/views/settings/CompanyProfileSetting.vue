<template>
    <div class="text-center">
        <div class="d-none">{{ userProfile }}</div>
        <v-form @submit.prevent="updateProfile" ref="companyProfileForm">
            <div class="loading" v-if="isLoading">
                <v-progress-circular indeterminate color="white"></v-progress-circular> <span class="ml-2">Loading</span>
            </div>
            <v-row align="start" align-content-md="start" justify="start" style="max-width: 1000px">
                <!-- accept="image/png, image/jpeg,i image/jpg" -->
                <!---------------------------------- profil photo --------------------------------->
                <v-col cols="12" md="6">
                    <div class="text-start">
                        <v-label class="mb-2 font-weight-medium text-capitalize mr-4">Logo</v-label>

                        <v-avatar size="50" class="border">
                            <img v-if="!userProfilePic" src="@/assets/images/profile/uploadLogo.png" height="20" alt="image" />
                            <img
                                v-if="userProfilePic"
                                :src="userProfilePic"
                                height="50"
                                alt="image"
                                class="users-profile-image object-fit-cover w-inherit"
                            />
                        </v-avatar>
                        <label
                            class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="!isProfileImg"
                            @click="$refs.companylogo.click()"
                            >Choose file</label
                        >
                        <!-- file input for upload and edit profile -->
                        <input
                            type="file"
                            class="d-none"
                            ref="companylogo"
                            id="profileImage"
                            accept="image/jpeg,image/jpg,image/png"
                            @change="uploadImage($event)"
                        />
                        <label
                            class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="isProfileImg"
                            @click="$refs.companylogo.click()"
                            >Edit</label
                        >
                        <label
                            color="error"
                            class="mb-0 ml-3 text-error font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="isProfileImg"
                            @click="resetProfilepic()"
                            >Remove</label
                        >
                    </div>
                </v-col>
                <!---------------------------------- favicon --------------------------------->
                <v-col cols="12" md="6">
                    <div class="text-start">
                        <v-label class="mb-2 font-weight-medium text-capitalize mr-4">favicon</v-label>
                        <v-avatar size="50" class="border">
                            <img v-if="!userFavicon" src="@/assets/images/profile/faviconDefault.png" height="20" alt="image" />
                            <img
                                v-if="userFavicon"
                                :src="userFavicon"
                                height="50"
                                alt="image"
                                class="users-profile-image object-fit-cover w-inherit"
                            />
                        </v-avatar>
                        <label
                            class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="!isFavicon"
                            @click="$refs.faviconinput.click()"
                            >Choose file</label
                        >
                        <!-- file input for upload and edit profile -->
                        <input
                            type="file"
                            ref="faviconinput"
                            class="d-none"
                            id="favicon"
                            accept="image/jpeg,image/jpg,image/png"
                            @change="uploadFavicon($event)"
                        />
                        <label
                            class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="isFavicon"
                            @click="$refs.faviconinput.click()"
                            >Edit</label
                        >
                        <label
                            color="error"
                            class="mb-0 ml-3 text-error font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="isFavicon"
                            @click="resetFavicon()"
                            >Remove</label
                        >
                    </div>
                    <!-- <div class="text-subtitle-1 text-medium-emphasis text-center my-sm-8 my-6">
                                    Allowed JPG, GIF or PNG. Max size of 800K
                                </div> -->
                </v-col>
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
                    <v-text-field v-model="address" variant="outlined" color="primary" :rules="addresslinerule"></v-text-field>
                </v-col>
                <!---------------------------------- Area  --------------------------------->
                <v-col cols="12" md="6" class="text-start">
                    <v-label class="mb-2 font-weight-medium text-capitalize required">Area</v-label>
                    <v-text-field v-model="area" color="primary" variant="outlined" type="text" :rules="arearule" />
                </v-col>
                <!---------------------------------- zip code ------------------------------------------->
                <v-col cols="12" md="6" class="text-start">
                    <v-label class="mb-2 font-weight-medium text-capitalize required">Zip code</v-label>
                    <v-text-field v-model="zipcode" color="primary" variant="outlined" autocomplete="off" :rules="zipcoderule" />
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
                    <v-text-field v-model="country" color="primary" variant="outlined" autocomplete="off" :rules="countyrule" />
                </v-col>
                <!---------------------------------- currency --------------------------------->
                <v-col cols="12" md="6" class="text-start">
                    <v-label class="mb-2 font-weight-medium text-capitalize required">Currency</v-label>
                    <v-select
                        v-model="currency"
                        :items="currencyOptions"
                        :item-title="getFieldText"
                        item-value="name"
                        return-object
                        single-line
                        variant="outlined"
                        label="Please select currency "
                        :rules="selectRule"
                    >
                        <template v-slot:selection="{ item }">
                            <span>{{ currency.name }} ({{ currency.symbol }} )</span>
                        </template>
                        <template v-slot:append-item> </template>
                    </v-select>
                    <v-spacer></v-spacer>
                    <!-- Action buttons -->
                </v-col>
                <!---------------------------------- Action ------------------------------------>
                <v-col cols="12" class="text-left mt-5">
                    <v-btn color="primary" type="submit" v-if="!issubmit" class="p-0">Update Profile</v-btn>
                    <v-btn color="primary" v-if="issubmit" disabled>Update Profile</v-btn>
                </v-col>
            </v-row>
        </v-form>

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
import dialogBox from '@/components/TicketComponents/dialog.vue';
import { zipObject } from 'lodash';
import { useCustomerAddressStore } from '@/stores/customerAddress';
const store = useCustomerAddressStore();
//mixins
const { cityrule, staterule, zipcoderule, countyrule, arearule, companynamerule, addresslinerule, passwordrule, dropdownrule } =
    formValidationsRules();

const currency = ref([]);
const currencyOptions = ref([]);
const companyName = ref('');
const address = ref('');
const city = ref('');
const area = ref('');
const state = ref('');
const country = ref('India');
const zipcode = ref('');
const isLoading = ref(false);
const companyId = ref(0);

const userProfilePic = ref('');
const userFavicon = ref('');
const UserProfileFile = ref('');
const userFaviconFile = ref('');
const isProfileImg = ref(false);
const isFavicon = ref(false);
const issubmit = ref(false);
//dialog props
const dialogTitle = ref('Are you sure you want to cancel this action ?');
const dialogText = ref('You can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Confirm');
const title = ref('Cancel update profile');

//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const companyProfileForm = ref();
const companylogo = ref();

// validations rules
const filesizelimitrule = [
    ($event) => {
        if ($event.target.value[0] < 200000) return true;
        return 'Avatar size should be less than 2 MB!';
    }
];

const selectRule = [
    () => {
        if (currency.value ? Object.keys(currency.value).length > 0 : '') return true;
        return 'Please select an item.';
    }
];

//currency dropdown customize items options
function getFieldText(item) {
    {
        return `${item.name} (${item.symbol})`;
    }
}
function confirmClick() {
    companyProfileForm.value?.reset();
    companyProfileForm.value?.resetValidation();
}
function uploadImage(e) {
    // UserProfileFile.value = ''
    // userProfilePic.value = ''
    //     $vm0.refs['companylogo'].value = null;

    isProfileImg.value = true;
    const fd = new FormData();
    const file = e.target.files[0];
    UserProfileFile.value = file;
    userProfilePic.value = URL.createObjectURL(e.target.files[0]);
    fd.append('file', file);
}
function uploadFavicon(e) {
    isFavicon.value = true;
    const fd = new FormData();
    const file = e.target.files[0];
    userFaviconFile.value = file;
    userFavicon.value = URL.createObjectURL(e.target.files[0]);
    fd.append('file', file);
}
function resetProfilepic() {
    UserProfileFile.value = '';
    userProfilePic.value = '';
    isProfileImg.value = false;
    companylogo.value = null;
    document.querySelector('#profileImage').value = '';
}
function resetFavicon() {
    userFaviconFile.value = '';
    userFavicon.value = '';
    isFavicon.value = false;
    document.querySelector('#favicon').value = '';
}
function getCompanyprofileData() {
    isLoading.value = true;
    baseURlApi
        .get('settings/company/get')
        .then((res) => {
            isLoading.value = false;
            const data = res.data.data;
            if (data.company_setting.company_logo) store.setCompanyLogo(data.company_setting.company_logo);
            if (data.company_setting.company_logo) store.setCompanyLogo(data.company_setting.company_logo);
            if (data.company_setting.company_name) store.setCompanyName(data.company_setting.company_name);
            UserProfileFile.value = data.company_setting.company_logo;
            userFaviconFile.value = data.company_setting.company_favicon;
            data.company_setting.company_logo ? (isProfileImg.value = true) : (isProfileImg.value = false);
            data.company_setting.company_favicon ? (isFavicon.value = true) : (isFavicon.value = false);
            currencyOptions.value = data.all_currency;
            currency.value = data.company_setting.currency;
            companyName.value = data.company_setting.company_name;
            address.value = data.company_setting.address_line1;
            city.value = data.company_setting.city;
            area.value = data.company_setting.area;
            state.value = data.company_setting.state;
            country.value = data.company_setting.country;
            userProfilePic.value = data.company_setting.company_logo ? data.company_setting.company_logo : '';
            userFavicon.value = data.company_setting.company_favicon ? data.company_setting.company_favicon : '';
            zipcode.value = data.company_setting.zipcode;
            companyId.value = data.company_setting.id;
            isProfileImg.value = data.company_setting.company_logo ? true : false;
            isFavicon.value = data.company_setting.company_favicon ? true : false;
        })
        .catch((error) => {
            isLoading.value = false;
            showSnackbar.value = true;
            isSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function limitFileSize() {
    let size = parseFloat(this.file1 ? this.file1.size : '') / (1024 * 1024).toFixed(2);
    size > 10 ? (this.fileSize = true) : (this.fileSize = false);
}

async function updateProfile() {
    const { valid } = await companyProfileForm.value?.validate();
    if (valid) {
        issubmit.value = true;
        const fd = new FormData();
        fd.append('company_id', companyId.value);
        fd.append('company_name', companyName.value);
        fd.append('company_logo', UserProfileFile.value ? UserProfileFile.value : '');
        fd.append('company_favicon', userFaviconFile.value ? userFaviconFile.value : '');
        fd.append('address_line1', address.value);
        fd.append('area', area.value);
        fd.append('zipcode', zipcode.value);
        fd.append('city', city.value);
        fd.append('state', state.value);
        fd.append('country', country.value);
        fd.append('currency_id', currency.value.id);

        baseURlApi
            .post('settings/company/update', fd)
            .then((res) => {
                issubmit.value = false;
                companyProfileForm.value?.reset();
                companyProfileForm.value?.resetValidation();
                resetFavicon();
                resetProfilepic();
                getCompanyprofileData();
                showSnackbar.value = true;
                message.value = res.data.message;
                isSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
            })
            .catch((error) => {
                resetFavicon();
                resetProfilepic();
                getCompanyprofileData();
                issubmit.value = false;
                showSnackbar.value = true;
                isSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function getCurrency() {
    baseURlApi
        .get('settings/company/get-currency')
        .then((res) => {
           currency.value = res.data.data.currency
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
onMounted(() => {
    getCompanyprofileData();
    getCurrency()
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
