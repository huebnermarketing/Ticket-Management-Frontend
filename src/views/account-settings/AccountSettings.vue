<script setup>
import { ref } from 'vue';

/*import tabler icons*/
import { UserCircleIcon,ArticleIcon,LockIcon } from 'vue-tabler-icons';

//components
import AccountTab from '@/views/account-settings/AccountTab.vue';

/*tab*/
const tab = ref(null);

</script>

<template>
    <v-row class="justify-center">
        <v-col cols="12" md="12">
            <v-card elevation="10" class=" " rounded="md">
                <v-tabs v-model="tab" bg-color="transparent" min-height="70" height="70" color="primary">
                    <v-tab value="Account" class="text-medium-emphasis" ><UserCircleIcon class="mr-2" size="20"/>User Profile</v-tab>
                    <v-tab value="Bills"  class="text-medium-emphasis"><ArticleIcon class="mr-2" size="20"/>Bills</v-tab>
                    <v-tab value="Security"  class="text-medium-emphasis"><LockIcon class="mr-2" size="20"/>Security</v-tab> 
                </v-tabs>
                <v-divider></v-divider>
                <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                    <v-window v-model="tab">
                        <v-window-item value="Account">
                            <AccountTab/>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
