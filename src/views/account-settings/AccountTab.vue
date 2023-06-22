<template>
    <v-card elevation="10">
        <v-row class="ma-sm-n2 ma-n1">
            <v-col cols="12">
                <v-card elevation="10">
                    <v-form @submit.prevent="updateUserProfile" ref="updateUserprofile" class="mt-5">
                        <v-card-item style="max-width: 800px">
                            <h5 class="text-h5 mb-7">Account</h5>

                            <!---------------------------------- profil photo --------------------------------->

                            <v-col cols="12" md="12" class="p-0 mb-5" style="padding: 0 !important">
                                <div class="loading" v-if="isLoading">
                                    <v-progress-circular indeterminate color="white"></v-progress-circular>
                                    <span class="ml-2">Loading</span>
                                </div>
                                <div class="text-start">
                                    <v-label class="mb-2 font-weight-medium text-capitalize mr-4">Profile Photo</v-label>
                                    <v-avatar size="120" class="border">
                                        <img v-if="!userProfilePic" src="@/assets/images/profile/user.png" height="120" alt="image" />
                                        <img
                                            v-if="userProfilePic"
                                            :src="userProfilePic"
                                            height="120"
                                            alt="image"
                                            style="height: inherit !important"
                                            class="users-profile-image object-fit-cover w-inherit object-fit"
                                        />
                                    </v-avatar>
                                    <label
                                        class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                                        v-if="!isProfileImg"
                                        @click="$refs.fileinput.click()"
                                        >Choose file</label
                                    >
                                    <!-- file input for upload and edit profile  -->
                                    <input
                                        type="file"
                                        ref="fileinput"
                                        id="profileImage"
                                        class="d-none"
                                        accept="image/jpeg,image/jpg,image/png"
                                        @change="uploadImage($event)"
                                    />
                                    <label
                                        class="mb-0 ml-5 text-primary font-weight-bold cursor-pointer text-decoration-underline"
                                        v-if="isProfileImg"
                                        @click="$refs.fileinput.click()"
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
                            <v-row align="start" align-content-md="start" justify="start">
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
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">last Name</v-label>
                                    <v-text-field
                                        v-model="lastName"
                                        variant="outlined"
                                        color="primary"
                                        :rules="lastnamerule"
                                    ></v-text-field>
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
                            </v-row>
                            <v-col cols="12" class="text-left pl-0">
                                <v-btn color="primary" type="submit" v-if="!issubmit">Update Profile</v-btn>
                                <v-btn color="primary" v-if="issubmit" disabled>Update Profile</v-btn>
                            </v-col>
                            <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
                                <v-icon left>{{ icon }}</v-icon>
                                {{ message }}
                            </v-snackbar>
                        </v-card-item>
                    </v-form>
                </v-card>
            </v-col>
            <!-- change password -->
            <v-col cols="12">
                <v-card elevation="10">
                    <v-form @submit.prevent="changePassword" ref="changepasswordform">
                        <v-card-item style="max-width: 800px">
                            <h5 class="text-h5 mb-7">Change Password</h5>
                            <v-col cols="12" md="6" class="pl-0">
                                <!-- <div class="mt-5"> -->
                                <v-label class="mb-2 font-weight-medium">New Password</v-label>
                                <v-text-field color="primary" variant="outlined" type="password" v-model="newpwd" :rules="passwordrule" />
                            </v-col>
                            <v-col cols="12" md="6" class="pl-0">
                                <v-label class="mb-2 font-weight-medium">Confirm Password</v-label>
                                <v-text-field
                                    color="primary"
                                    variant="outlined"
                                    type="password"
                                    v-model="confirmpwd"
                                    :rules="confirmpasswordrule"
                                />
                            </v-col>

                            <!-- </div> -->
                            <v-col cols="12" md="6" class="pl-0">
                                <div class="text-left">
                                    <v-btn color="error" class="mr-3" @click="closeDialog()" v-if="!isPasssubmit">Cancel</v-btn>
                                    <v-btn color="primary" type="submit" v-if="!isPasssubmit">Save</v-btn>
                                    <v-btn color="error" class="mr-3" v-if="isPasssubmit" disabled>Cancel</v-btn>
                                    <v-btn color="primary" v-if="isPasssubmit" disabled>Save</v-btn>
                                </div>
                            </v-col>
                        </v-card-item>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { baseURlApi } from '@/api/axios';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
import { useCustomerAddressStore } from '@/stores/customerAddress';
const store = useCustomerAddressStore();
const {
    cityrule,
    staterule,
    zipcoderule,
    countyrule,
    arearule,
    addresslinerule,
    companynamerule,
    confirmpwd,
    newpwd,
    firstnamerule,
    lastnamerule,
    mobilerule,
    emailrule,
    passwordrule,
    rule,
    confirmpasswordrule
} = formValidationsRules();

/*user detail*/
const userId = JSON.parse(localStorage.getItem('user')).id;
const userDetail = JSON.parse(localStorage.getItem('user'));
const fileinput = ref()

/*inputs*/
const firstName = ref('');
const lastName = ref('');
const userEmail = ref('');
const mobile = ref('');
const companyName = ref('');
const address = ref('');
const city = ref('');
const area = ref('');
const state = ref('');
const country = ref('');
const zipcode = ref('');
const companyId = ref(0);
const issubmit = ref(false);
const showSnackbar = ref(false);
const updateUserprofile = ref();

/*snakebar*/
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

/*loading*/
const isLoading = ref(false);

/*change password*/
const changepasswordform = ref();
const isPasssubmit = ref(false);

/*personal detail*/
const namemodel = ref('Mathew Anderson');
const storemodel = ref('Maxima Studio');
const storemail = ref('info@modernize.com');
const storephone = ref('+91 12345 65478');
const storeaddress = ref('814 Howard Street, 120065, India');

/* Profile pic*/
const userProfilePic = ref('');
const UserProfileFile = ref('');
const isProfileImg = ref(false);

function getUserData() {
    isLoading.value = true;
    baseURlApi
        .get(`user/edit-user/${userId}`)
        .then((res) => {
            isLoading.value = false;

            const data = res.data.data;
            // localStorage.setItem('user', JSON.stringify(data));
            if (data.profile_photo) store.setUserProfile(data.profile_photo);
            store.setUserDetail({
                username: data.first_name + ' ' + data.last_name,
                email: data.email,
                role: data.role.display_name
            });
            data.profile_photo ? (isProfileImg.value = true) : (isProfileImg.value = false);
            userProfilePic.value = data.profile_photo;
            UserProfileFile.value = data.profile_photo;
            firstName.value = data.first_name;
            lastName.value = data.last_name?.trim();
            userEmail.value = data.email.trim();
            mobile.value = data.phone.trim();
            companyName.value = data.company_name ? data.company_name.trim() : '';
            address.value = data.address.trim();
            city.value = data.city.trim();
            area.value = data.area.trim();
            state.value = data.state.trim();
            country.value = data.country.trim();
            zipcode.value = data.zipcode.trim();
            isProfileImg.value = data.profile_photo ? true : false;
        })
        .catch((error) => {
            isLoading.value = false;
        });
}

async function updateUserProfile() {
    const { valid } = await updateUserprofile.value?.validate();
    if (valid) {
        issubmit.value = true;
        const fd = new FormData();
        fd.append('first_name', firstName.value.trim());
        fd.append('last_name', lastName.value.trim());
        fd.append('phone', mobile.value.trim());
        fd.append('profile_photo', UserProfileFile.value ? UserProfileFile.value : '');
        fd.append('email', userEmail.value.trim());
        fd.append('address', address.value.trim());
        fd.append('area', area.value.trim());
        fd.append('city', city.value.trim());
        fd.append('state', state.value.trim());
        fd.append('country', country.value.trim());
        fd.append('zipcode', zipcode.value.trim());

        baseURlApi
            .post(`user/update-user-profile/${userId}`, fd)
            .then((res) => {
                issubmit.value = false;
                updateUserprofile.value?.reset();
                updateUserprofile.value?.resetValidation();
                resetProfilepic();
                showSnackbar.value = true;
                getUserData();
                message.value = res.data.message;
                isSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
            })
            .catch((error) => {
                issubmit.value = false;
                resetProfilepic();
                getUserData();
                showSnackbar.value = true;
                isSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}

async function changePassword() {
    const { valid } = await changepasswordform.value?.validate();
    if (valid) {
        isPasssubmit.value = true;
        const fd = new FormData();
        fd.append('password', newpwd.value);
        fd.append('password_confirmation', confirmpwd.value);
        fd.append('user_id', userId);

        baseURlApi
            .post('auth/profile-reset-password', fd)
            .then((res) => {
                isPasssubmit.value = false;
                changepasswordform.value?.reset();
                changepasswordform.value?.resetValidation();
                showSnackbar.value = true;
                message.value = res.data.message;
                isSnackbar.value = true;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
            })
            .catch((error) => {
                isPasssubmit.value = false;
                showSnackbar.value = true;
                isSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function uploadImage(e) {
    isProfileImg.value = true;
    const fd = new FormData();
    const file = e.target.files[0];
    UserProfileFile.value = file;
    userProfilePic.value = URL.createObjectURL(e.target.files[0]);
    fd.append('file', file);
}
function resetProfilepic() {
    UserProfileFile.value = '';
    userProfilePic.value = '';
    isProfileImg.value = false;
    document.querySelector('#profileImage').value = '';
    // fileinput.value = '';
}
onMounted(() => {
    getUserData();
});
</script>
<style>
.v-input__details {
    padding: 0 0 0 2px !important;
}
</style>
