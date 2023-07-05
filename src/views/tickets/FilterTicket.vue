
<script setup>
import { ref, defineExpose, onMounted } from 'vue';
import { baseURlApi } from '@/api/axios';

import { useCustomizerStore } from '@/stores/customizer';
const store = useCustomizerStore();
import useEventsBus from '@/mixins/eventBus';

const {emit}=useEventsBus()

const ticketDropdowns = ref([])
const sections = ref();

//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

/*******************************************************  methods  *************************************************/
function getSections(){
  sections.value  =  [
    {
        id: 'customer_name',
        name: 'Customer Name',
        items: ticketDropdowns.value.customers,
        selected: null,
        title:'first_name'
    },
    {
        id: 'problem_type',
        name: 'Problem Type',
        items: ticketDropdowns.value.problem_types,
        selected: null,
        title:'problem_name'
    },
    {
        id: 'ticket_status',
        name: 'Ticket Status',
        items: ticketDropdowns.value.ticket_status,
        selected: [],
        multiple: true,
        title:'status_name'
    },
    {
        id: 'appointment_type',
        name: 'Appointment Type ',
        items: ticketDropdowns.value.appointment_type,
        selected: null,
        title:'appointment_name'
    },
    {
        id: 'payment_status',
        name: 'Payment Status',
        items: ticketDropdowns.value.payment_status,
        selected: null,
        title:'payment_type'
    },
    // {
    //     name: 'Contract Name',
    //     items: ticketDropdowns.,
    //     selected: null
    // },
    {
        id: 'priority',
        name: 'Priority',
        items: ticketDropdowns.value.ticket_priorities,
        selected: null,
        title:'priority_name'
    }
]
}
function getTicketData() {
    const requestbody = {
        is_filter: 1
    };
    baseURlApi
        .post('ticket/get-detail', requestbody)
        .then((res) => {
            const data = res.data.data;
            ticketDropdowns.value = data;
            getSections()
        })
        .catch((error) => {
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function applyFilter() {
    const filterData = {
        customer_id: sections.value.find(e=>e.id==='customer_name').selected,
        problem_type_id:sections.value.find(e=>e.id==='problem_type').selected,
        ticket_status_id:sections.value.find(e=>e.id==='ticket_status').selected,
        appointment_type_id:sections.value.find(e=>e.id==='appointment_type').selected,
        payment_type_id:sections.value.find(e=>e.id==='payment_status').selected,
        priority_id:sections.value.find(e=>e.id==='priority').selected,
        is_filter:true
    }
    console.log(filterData)
    emit('filterdata',filterData)
    store.SET_FILTER_DATA(filterData)
    store.SET_CUSTOMIZER_DRAWER(store.Customizer_drawer = false);
}
function closeDialog(){
    store.SET_CUSTOMIZER_DRAWER(store.Customizer_drawer = false);
    // filterSelect.value.reset()
}
/************************************************* mounted ************************************************/

onMounted(() => {
    getTicketData();
});
</script>

<template>
    <div class="pa-6">
        <h5 class="text-h5">Filter</h5>
    </div>
    <v-divider></v-divider>
    <perfect-scrollbar style="height: calc(100vh - 90px)">
        <div class="pa-6">
            <v-row v-for="(section, i) in sections" :key="i">
                <v-col cols="4">
                    <v-label class="mt-3 font-weight-medium text-capitalize required">{{ section.name }}</v-label>
                </v-col>
                <v-col cols="8">
                    <v-select
                        v-model="section.selected"
                        :items="section.items"
                        :item-title="section.title"
                        item-value="id"
                        return-object
                        single-line
                        variant="outlined"
                        label="All"
                        :multiple="section.multiple"
                        :chips="section.multiple"
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="mt-5 pa-6">
            <v-btn color="primary" type="submit" v-if="!issubmit" @click="applyFilter()">Apply</v-btn>
            <v-btn color="error" class="ml-3" @click="closeDialog()" v-if="!issubmit">Reset</v-btn>
        </div>
    </perfect-scrollbar>
    <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
        <v-icon left>{{ icon }}</v-icon>
        {{ message }}
    </v-snackbar>
</template>