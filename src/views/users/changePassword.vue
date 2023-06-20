<template>
    <div class="text-center">
        <v-dialog v-model="dialog" persistent class="dialog-mw">
            <v-card class="overflow-auto">
                <v-form @submit.prevent="changePassword" ref="changepasswordform">
                    <v-container>
                        <v-card-title class="pa-5">
                            <span class="text-h5">Change password</span>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <!---------------------------------- Add password --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">New Password</v-label>
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="password"
                                        v-model="newpwd"
                                        :rules="passwordrule"
                                    />
                                </v-col>
                                <!---------------------------------- confirm password --------------------------------->
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium text-capitalize required">Confirm Password</v-label>
                                    <v-text-field
                                        color="primary"
                                        variant="outlined"
                                        type="password"
                                        v-model="confirmpwd"
                                        :rules="confirmpasswordrule"
                                    />
                                </v-col>
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
import { baseURlApi } from '@/api/axios';
import { formValidationsRules } from '@/mixins/formValidationRules.js';
const { confirmpwd, newpwd, confirmpasswordrule, passwordrule } = formValidationsRules();

const dialog = ref(false);

// const newpwd = ref('');
// const confirmpwd = ref('');
const issubmit = ref(false);
const userId = ref(0);

//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);
const changepasswordform = ref();

// validations rules

function closeDialog() {
    changepasswordform.value?.reset();
    dialog.value = false;
}

async function changePassword() {
    const { valid } = await changepasswordform.value?.validate();
    if (valid) {
        issubmit.value = true;
        const fd = new FormData();
        fd.append('password', newpwd.value);
        fd.append('password_confirmation', confirmpwd.value);
        fd.append('user_id', userId.value);

        baseURlApi
            .post('auth/profile-reset-password', fd)
            .then((res) => {
                issubmit.value = false;
                changepasswordform.value?.reset();
                changepasswordform.value?.resetValidation();
                dialog.value = false;
                showSnackbar.value = true
                isSnackbar.value = true;
                message.value = res.data.message;
                icon.value = 'mdi-check-circle';
                color.value = 'success';
            })
            .catch((error) => {
                issubmit.value = false;
                showSnackbar.value = true
                isSnackbar.value = true;
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function open(id) {
    userId.value = id;
    dialog.value = true;
}

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
