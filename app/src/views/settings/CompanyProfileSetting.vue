<template>
    <div class="text-center">
        <v-form @submit.prevent="updateProfile" ref="companyProfileForm" style="width: 70%">
            <div class="loading" v-if="isLoading">
                <v-progress-circular indeterminate color="white"></v-progress-circular> <span class="ml-2">Loading</span>
            </div>
            <v-row align="start" align-content-md="start" justify="start">
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
                                height="90"
                                alt="image"
                                class="users-profile-image object-fit-cover w-inherit"
                            />
                        </v-avatar>
                        <label
                            for="profileImage"
                            class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="!isProfileImg"
                            @click="refs['file-input'].click()"
                            >Choose file</label
                        >
                        <!-- file input for upload and edit profile -->
                        <input
                            type="file"
                            ref="file-input"
                            class="d-none"
                            id="profileImage"
                            accept="image/jpeg,image/jpg,image/png"
                            @change="uploadImage($event)"
                        />
                        <label
                            for="profileImage"
                            class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="isProfileImg"
                            @click="refs['file-input'].click()"
                        >
                            Edit</label
                        >
                        <label
                            color="error"
                            class="mb-0 ml-3 text-error font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="isProfileImg"
                            @click="resetProfilepic()"
                            >Reset</label
                        >
                    </div>
                </v-col>
                <!---------------------------------- fevicon --------------------------------->
                <v-col cols="12" md="6">
                    <div class="text-start">
                        <v-label class="mb-2 font-weight-medium text-capitalize mr-4">Fevicon</v-label>
                        <v-avatar size="50" class="border">
                            <img v-if="!userFevicon" src="@/assets/images/profile/uploadLogo.png" height="20" alt="image" />
                            <img
                                v-if="userFevicon"
                                :src="userFevicon"
                                height="90"
                                alt="image"
                                class="users-profile-image object-fit-cover w-inherit"
                            />
                        </v-avatar>
                        <label
                            for="fevicon"
                            class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="!isFevicon"
                            @click="refs['fevicon-input'].click()"
                            >Choose file</label
                        >
                        <!-- file input for upload and edit profile -->
                        <input
                            type="file"
                            ref="fevicon-input"
                            class="d-none"
                            id="fevicon"
                            accept="image/jpeg,image/jpg,image/png"
                            @change="uploadFevicon($event)"
                        />
                        <label
                            for="fevicon"
                            class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="isFevicon"
                            @click="refs['fevicon-input'].click()"
                        >
                            Edit</label
                        >
                        <label
                            color="error"
                            class="mb-0 ml-3 text-error font-weight-bold cursor-pointer text-decoration-underline"
                            v-if="isFevicon"
                            @click="resetFevicon()"
                            >Reset</label
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
                        placeholder="Rivulet Digital"
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
                        placeholder="Please enter address"
                        :rules="addresslinerule"
                    ></v-text-field>
                </v-col>
                <!---------------------------------- Area  --------------------------------->
                <v-col cols="12" md="6" class="text-start">
                    <v-label class="mb-2 font-weight-medium text-capitalize required">Area</v-label>
                    <v-text-field v-model="area" color="primary" variant="outlined" type="text" placeholder="Bodakdev" :rules="arearule" />
                </v-col>
                <!---------------------------------- zip code ------------------------------------------->
                <v-col cols="12" md="6" class="text-start">
                    <v-label class="mb-2 font-weight-medium text-capitalize required">Zip code</v-label>
                    <v-text-field
                        v-model="zipcode"
                        color="primary"
                        variant="outlined"
                        placeholder="Ahmedabad"
                        autocomplete="off"
                        :rules="zipcoderule"
                    />
                </v-col>
                <!---------------------------------- City ------------------------------------------->
                <v-col cols="12" md="6" class="text-start">
                    <v-label class="mb-2 font-weight-medium text-capitalize required">City</v-label>
                    <v-text-field
                        v-model="city"
                        color="primary"
                        variant="outlined"
                        placeholder="Ahmedabad"
                        autocomplete="off"
                        :rules="cityrule"
                    />
                </v-col>
                <!---------------------------------- state  --------------------------------->
                <v-col cols="12" md="6" class="text-start">
                    <v-label class="mb-2 font-weight-medium text-capitalize required">State</v-label>
                    <v-text-field v-model="state" color="primary" variant="outlined" type="text" placeholder="Gujarat" :rules="staterule" />
                </v-col>
                <!---------------------------------- country ------------------------------------------->
                <v-col cols="12" md="6" class="text-start">
                    <v-label class="mb-2 font-weight-medium text-capitalize required">country</v-label>
                    <v-text-field
                        v-model="country"
                        color="primary"
                        variant="outlined"
                        placeholder="India"
                        autocomplete="off"
                        :rules="countyrule"
                    />
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
                        :rules="dropdownrule"
                    >
                        <template v-slot:selection="{ item }">
                            <span>{{ currency.name }} ({{ currency.symbol }} )</span>
                        </template>
                        <template v-slot:append-item> </template>
                    </v-select>
                </v-col>
                <!---------------------------------- Action ------------------------------------>
            </v-row>
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
            <v-spacer></v-spacer>
            <v-col cols="12" class="text-right">
                <!-- <v-btn color="error" class="mr-3" @click="closeDialog()" v-if="!issubmit">Cancel</v-btn> -->
                <v-btn color="primary" type="submit" v-if="!issubmit">Update Profile</v-btn>
                <!-- <v-btn color="error" class="mr-3" v-if="issubmit" disabled>Cancel</v-btn> -->
                <v-btn color="primary" v-if="issubmit" disabled>Update Profile</v-btn>
            </v-col>
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
const country = ref('india');
const zipcode = ref('');
const isLoading = ref(false);
const companyId = ref(0);

const userProfilePic = ref('');
const userFevicon = ref('');
const UserProfileFile = ref('');
const userFeviconFile = ref('');
const isProfileImg = ref(false);
const isFevicon = ref(false);
const issubmit = ref(false);
//dialog props
const dialogTitle = ref('Are you sure you want to cancel this action ?');
const dialogText = ref('You can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Confirm');
const title = ref('Cancel update profile');

//props for toastification
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const companyProfileForm = ref();

// validations rules
const filesizelimitrule = [
    ($event) => {
        if ($event.target.value[0] < 200000) return true;
        return 'Avatar size should be less than 2 MB!';
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
    isProfileImg.value = true;
    const fd = new FormData();
    const file = e.target.files[0];
    UserProfileFile.value = file;
    userProfilePic.value = URL.createObjectURL(e.target.files[0]);
    fd.append('file', file);
}
function uploadFevicon(e) {
    isFevicon.value = true;
    const fd = new FormData();
    const file = e.target.files[0];
    userFeviconFile.value = file;
    userFevicon.value = URL.createObjectURL(e.target.files[0]);
    fd.append('file', file);
}
function resetProfilepic() {
    userProfilePic.value = '';
    isProfileImg.value = false;
}
function resetFevicon() {
    userFevicon.value = '';
    isFevicon.value = false;
}
function getCompanyprofileData() {
    isLoading.value = true;
    baseURlApi
        .get('settings/company/get')
        .then((res) => {
            console.log('ress', res.data.data);
            isLoading.value = false;
            currencyOptions.value = res.data.data.all_currency;
            currency.value = res.data.data.company_setting.currency;
            companyName.value = res.data.data.company_setting.company_name;
            address.value = res.data.data.company_setting.address_line1;
            city.value = res.data.data.company_setting.city;
            area.value = res.data.data.company_setting.area;
            state.value = res.data.data.company_setting.state;
            country.value = res.data.data.company_setting.country;
            userProfilePic.value = res.data.data.company_setting.company_logo;
            userFevicon.value = res.data.data.company_setting.company_favicon;
            zipcode.value = res.data.data.company_setting.zipcode;
            companyId.value = res.data.data.company_setting.id;
            isSnackbar.value = true;
            message.value = res.data.message;
            icon.value = 'mdi-check-circle';
            color.value = 'success';
        })
        .catch((error) => {
            isLoading.value = false;
            isSnackbar.value = true;
            message.value = error.message;
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
        console.log('rolee', currency.value.id);
        fd.append('company_id', companyId.value);
        fd.append('company_name', companyName.value);
        fd.append('company_logo', UserProfileFile.value);
        fd.append('company_favicon', userFeviconFile.value);
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
                console.log('rsss', res.data);
                issubmit.value = false;
                companyProfileForm.value?.reset();
                companyProfileForm.value?.resetValidation();
                userProfilePic.value = '';
                userFevicon.value = '';
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

onMounted(() => {
    getCompanyprofileData();
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
