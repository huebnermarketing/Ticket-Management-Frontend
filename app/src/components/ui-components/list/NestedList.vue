<script setup>
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import UiTableCard from '@/components/shared/UiTableCard.vue';
import UiChildCard from '@/components/shared/UiChildCard.vue';
import WidgetCard from '@/components/shared/WidgetCard.vue';
import UserListing from '@/views/users/UserListing.vue'
import { UserIcon, SettingsIcon, UsersIcon, TicketIcon } from 'vue-tabler-icons';
const props = defineProps(['icon']);

const open = ref(['Users']);

//main tabs items
const items = ref([
    {
        name: 'Settings',
        value: 'settings',
        icon: 'SettingsIcon',
        component:UserListing,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Users',
        value: 'users',
        icon: 'UserIcon',
        component:UserListing,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Contract & Ticket',
        value: 'contract and ticket',
        icon: 'TicketIcon',
        component:UserListing,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Customers',
        value: 'customers',
        icon: 'UsersIcon',
        component:UserListing,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
]);
function onScroll(e) { 
     console.log("calledd 11")
    // e is native scroll/mouse event
      const el = e?.target
      if (!el) return
      const scrollPercent =
        (100 * el.scrollTop) / (el.scrollHeight - el.clientHeight)
      if (scrollPercent > 60) {
        console.log("calledd")
      }
    }

//sub tabs for contracts and tickets
const contracts = ref([
    {
        name: 'Contact Type',
        value: 'contact type',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Problem Type',
        value: 'problem type',    
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Ticket Status',
        value: 'ticket status',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
        name: 'Product Services',
        value: 'product services',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
]);
const tab = ref(null);
const subtab = ref(null);
</script>
<template>
    <v-card>
        <v-tabs v-model="tab" bg-color="transparent" color="primary" stacked centered class="c-main-tabs">
            <v-tab v-for="(item, i) in items" :key="i" :value="item.value">
                <div class="d-flex">
                    <component v-bind:is="item.icon" size="20" stroke-width="1.5" class="mr-2"></component>
                    <span>{{ item.name }}</span>
                </div>
            </v-tab>
        </v-tabs>
         <v-tabs v-model="subtab" bg-color="transparent" color="primary" v-if="tab == 'contract and ticket'"  align-tabs="start">
            <v-tab v-for="(data, i) in contracts" :key="i" :value="data.value">
                {{ data.name }}
            </v-tab>
        </v-tabs>
          <v-card variant="outlined" elevation="0" class="mb-6 m-5 overflow-hidden c-inner-card" v-if="tab == 'contract and ticket'">
            <UiChildCard :title="'contracts'">
                <v-window v-model="subtab">
                    <v-window-item v-for="(item, i) in contracts" :key="i" :value="item.value">
                        <v-card color="text-primary" flat>
                            <v-card-text>{{ item.text }}</v-card-text>
                        </v-card>
                    </v-window-item>
                </v-window>
            </UiChildCard>
        </v-card>
        <v-card variant="outlined" elevation="0" class="mb-6 m-5 overflow-hidden c-inner-card" v-if="tab !== 'contract and ticket'">
            <UiChildCard :title="'table'">
                <v-window v-model="tab">
                    <v-window-item v-for="(item, i) in items" :key="i" :value="item.value">
                        <v-card>
                           <component v-bind:is="item.component"></component>
                        </v-card>
                    </v-window-item>
                </v-window>
            </UiChildCard>
        </v-card>
    </v-card>
</template>
<style scoped>
.c-inner-card {
    margin: 20px 20px 10px 20px !important;
    width: auto !important;
    overflow: hidden !important;
    border: 0 !important
}
.c-parent-card,.c-child-card{
    margin-bottom: 20px !important;
}
.c-main-tabs{
    border-bottom: 1px solid rgb(var(--v-theme-borderColor)) !important;    
}
</style>
