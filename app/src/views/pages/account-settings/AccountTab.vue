<script setup>
import { ref } from 'vue';

/*Location Select*/
const select = ref('United States');
const location = ref(['United States', 'United Kingdom', 'India', 'Russia']);

/*Currency Select*/
const Currencyselect = ref('US Dollar ($)');
const Currency = ref(['US Dollar ($)', 'United Kingdom (Pound)', 'India (INR)', 'Russia (Ruble)']);

/*change password*/
const currenypwd = ref('123456789142');
const newpwd = ref('123456789142');
const confirmpwd = ref('123456789142');

/*personal detail*/
const namemodel = ref('Mathew Anderson');
const storemodel = ref('Maxima Studio');
const storemail = ref('info@modernize.com');
const storephone = ref('+91 12345 65478');
const storeaddress = ref('814 Howard Street, 120065, India');
</script>

<template>
    <v-card elevation="10">
        <v-row class="ma-sm-n2 ma-n1">
            <v-col cols="12">
                <v-card elevation="10">
                    <v-card-item>
                        <v-form @submit.prevent="updateProfile" ref="companyProfileForm" class="mt-5">
                            <div class="loading" v-if="isLoading">
                                <v-progress-circular indeterminate color="white"></v-progress-circular> <span class="ml-2">Loading</span>
                            </div>
                            <v-col cols="12" md="12" style="padding: 0 !important">
                                <div class="text-center mt-6 mb-6 d-flex align-center">
                                    <v-label class="mb-2 font-weight-medium text-capitalize mr-4">change profile</v-label>
                                    <v-avatar size="120">
                                        <img v-if="!userProfilePic" src="@/assets/images/profile/uploadLogo.png" height="120" alt="image" />
                                        <img
                                            v-if="userProfilePic"
                                            :src="userProfilePic"
                                            height="120"
                                            alt="image"
                                            class="users-profile-image object-fit-cover w-inherit"
                                        />
                                    </v-avatar>
                                    <div class="d-flex justify-center">
                                        <v-btn color="primary" class="mx-2 text-capitalize" flat> Choose a file</v-btn>
                                        <v-btn color="primary" class="mx-2 text-capitalize" flat> edit</v-btn>
                                        <v-btn color="error" class="mx-2 text-capitalize" variant="outlined" flat>Reset</v-btn>
                                    </div>
                                </div>
                            </v-col>
                            <v-row align="start" align-content-md="start" justify="start">
                                <!-- -------------------------------- profil photo --------------------------------->
                                <!-- <v-col cols="12" md="6">
                                    <div class="text-start">
                                        <v-label class="mb-2 font-weight-medium text-capitalize mr-4">Logo</v-label>

                                        <v-avatar size="50" class="border">
                                            <img
                                                v-if="!userProfilePic"
                                                src="@/assets/images/profile/uploadLogo.png"
                                                height="20"
                                                alt="image"
                                            />
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
                                         file input for upload and edit profile -->
                                <!-- <input
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
                                </v-col> -->
                                <!---------------------------------- Company name ------------------------------- -->
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
                                    <v-text-field
                                        v-model="area"
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="Bodakdev"
                                        :rules="arearule"
                                    />
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
                                    <v-text-field
                                        v-model="state"
                                        color="primary"
                                        variant="outlined"
                                        type="text"
                                        placeholder="Gujarat"
                                        :rules="staterule"
                                    />
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
                    </v-card-item>
                </v-card>
            </v-col>
            <!-- change password -->
            <v-col cols="12">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Change Password</h5>
                        <v-col cols="6">
                            <div class="mt-5">
                                <v-label class="mb-2 font-weight-medium">New Password</v-label>
                                <v-text-field color="primary" variant="outlined" type="password" v-model="newpwd" />
                                <v-label class="mb-2 font-weight-medium">Confirm Password</v-label>
                                <v-text-field color="primary" variant="outlined" type="password" v-model="confirmpwd" hide-details />
                            </div>
                        </v-col>
                        <div class="text-end mt-5">
                            <v-btn color="error" class="mr-3" @click="closeDialog()" v-if="!issubmit">Cancel</v-btn>
                            <v-btn color="primary" type="submit" v-if="!issubmit">Save</v-btn>
                            <v-btn color="error" class="mr-3" v-if="issubmit" disabled>Cancel</v-btn>
                            <v-btn color="primary" v-if="issubmit" disabled>Save</v-btn>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-card>
</template>
