<template>
    <div class="text-center">
        <v-dialog v-model="dialog" persistent class="dialog-mw">
            <v-card class="overflow-auto">
                <v-form @submit.prevent="updateUser" ref="edituserform">
                    <v-container>
                        <v-card-title class="pa-5">
                            <span class="text-h5">Edit User</span>
                        </v-card-title>
                        <v-card-text>
                            <div class="loading" v-if="isLoading">
                                <v-progress-circular indeterminate color="white"></v-progress-circular> <span class="ml-2">Loading</span>
                            </div>
                            <v-row>
                                <!-- accept="image/png, image/jpeg,i image/jpg" -->
                                <!---------------------------------- profil photo --------------------------------->
                                <v-col cols="12" md="12">
                                    <v-label class="mb-2 font-weight-medium text-capitalize mr-4"
                                        >Profile photo</v-label
                                    >
                                    <div>
                                        <v-avatar size="90" class="border">
                                            <img v-if="!userProfilePic" src="@/assets/images/profile/user.png" height="90" alt="image" />
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
                                    <!-- <div class="text-subtitle-1 text-medium-emphasis text-center my-sm-8 my-6">
                                    Allowed JPG, GIF or PNG. Max size of 800K
                                </div> -->
                                </v-col>
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
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">last Name</v-label>
                                    <v-text-field
                                        v-model="lastName"
                                        variant="outlined"
                                        color="primary"
                                        placeholder="doe"
                                        :rules="lastnamerule"
                                    >
                                    </v-text-field>
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
                                <!---------------------------------- User Role --------------------------------->
                                <v-col cols="12" md="12">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Role</v-label>
                                    <v-select
                                        v-model="userRole"
                                        :items="userRoleOptions"
                                        item-title="name"
                                        item-value="id"
                                        return-object
                                        single-line
                                        variant="outlined"
                                        label="Please select role "
                                        :rules="dropdownrule"
                                    ></v-select>
                                </v-col>
                                <!---------------------------------- active user --------------------------------->
                                <v-col cols="12" md="6">
                                    <div class="d-flex align-center">
                                        <v-label class="mb-2 font-weight-medium text-capitalize required">Active</v-label>
                                        <div class="ml-4">
                                            <v-switch
                                                v-model="isActiveUser"
                                                inset
                                                :color="isActiveUser ? 'primary' : 'secondary'"
                                                hide-details
                                            ></v-switch>
                                        </div>
                                    </div>
                                </v-col>
                                <!---------------------------------- Action ------------------------------------>
                            </v-row>
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
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
    </div>
</template>
<script setup>
import { ref, defineExpose, defineComponent, onMounted } from 'vue';
import { Form } from 'vee-validate';
import { baseURlApi } from '@/api/axios';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
const { firstnamerule,filesizelimitrule, lastnamerule, mobilerule, emailrule, passwordrule, rule, confirmpasswordrule, dropdownrule } =
    formValidationsRules();

const dialog = ref(false);
const userRole = ref([]);
const userRoleOptions = ref([]);
const firstName = ref('');
const lastName = ref('');
const userEmail = ref('');
const mobile = ref('');
const userProfilePic = ref('');
const UserProfileFile = ref('');
const isProfileImg = ref(false);
const issubmit = ref(false);
const userId = ref(0);
const isActiveUser = ref(true);
const isLoading = ref(false)
const fileSize = ref(false)

//props for toastification
const showSnackbar = ref(true);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const edituserform = ref();

//props
const props = defineProps({
    getUsers: Function
});

//emits

function uploadImage(e) {
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
function getRoles() {
    baseURlApi
        .get('user/get-roles')
        .then((res) => {
            userRoleOptions.value = res.data.data;
        })
        .catch((error) => {
            isSnackbar.value = true;
            message.value = error.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function closeDialog() {
    edituserform.value?.reset();
    dialog.value = false;
}
function limitFileSize(e) {
    const file1 = e.target.files[0]
    let size = parseFloat(file1 ? file1.size : '') / (1024 * 1024).toFixed(2);
    size > 10 ? fileSize.value = true : fileSize.value = false;
    console.log("lmm")
}

function getUsersData(id) {
    userProfilePic.value = ''
    isLoading.value = true
    userId.value = id;
    baseURlApi.get(`user/edit-user/${id}`).then((res) => {
        isLoading.value = false
        const data = res.data.data;
        firstName.value = data.first_name;
        lastName.value = data.last_name;
        mobile.value = data.phone.trim();
        userRole.value = data.role;
        userEmail.value = data.email.trim();
        data.profile_photo ? isProfileImg.value = true : isProfileImg.value = false
        userProfilePic.value = data.profile_photo;
        isActiveUser.value = data.is_active == 1 ? true : false;
    }).catch((error)=>{
        isLoading.value = false
    });
}
async function updateUser() {
    const { valid } = await edituserform.value?.validate();
  
    if (valid) {    
          issubmit.value = true;
        const fd = new FormData();
        fd.append('first_name', firstName.value);
        fd.append('last_name', lastName.value);
        fd.append('phone', mobile.value.trim());
        fd.append('role_id', userRole.value.id);
        fd.append('profile_photo', UserProfileFile.value);
        fd.append('email', userEmail.value);
        fd.append('is_active', isActiveUser.value ? 1 : 0);

        baseURlApi
            .post(`user/update-user/${userId.value}`, fd)
            .then((res) => {
                issubmit.value = false;
                props.getUsers();
                edituserform.value?.reset();
                edituserform.value?.resetValidation();
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
function open() {
    dialog.value = true;
}
onMounted(() => {
    // getRoles();
});
defineExpose({
    open,
    getRoles,
    getUsersData
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
