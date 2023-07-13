
<script setup>
import { ref, defineExpose, onMounted, computed } from 'vue';
import { baseURlApi } from '@/api/axios';

import { useCustomizerStore } from '@/stores/customizer';
const store = useCustomizerStore();
import useEventsBus from '@/mixins/eventBus';
import { router } from '@/router';
import { useRoute } from 'vue-router';

const {emit}=useEventsBus()

const ticketDropdowns = ref(store.ticketFilterOptions)
const sections = ref([
    {
        id: 'customers',
        name: 'Customer Name',
        items: ticketDropdowns.value.customers,
        selected: null,
        loading: true,
        title: (e) => [e.first_name, e.last_name].filter(Boolean).join(' ')
    },
    {
        id: 'problem_types',
        name: 'Problem Type',
        items: ticketDropdowns.value.problem_types,
        selected: null,
        loading: true,
        title:'problem_name'
    },
    {
        id: 'ticket_status',
        name: 'Ticket Status',
        items: ticketDropdowns.value.ticket_status,
        selected: [],
        multiple: true,
        loading: true,
        title:'status_name'
    },
    {
        id: 'appointment_type',
        name: 'Appointment Type ',
        items: ticketDropdowns.value.appointment_type,
        selected: null,
        loading: true,
        title:'appointment_name'
    },
    {
        id: 'payment_status',
        name: 'Payment Status',
        items: ticketDropdowns.value.payment_status,
        selected: null,
        loading: true,
        title:'payment_type'
    },
    {
        id: 'ticket_priorities',
        name: 'Priority',
        items: ticketDropdowns.value.ticket_priorities,
        selected: null,
        loading: true,
        title:'priority_name'
    }
]);

//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

const canApplyFilter = computed(() =>
    !!sections.value.filter((e) => !!e
        .selected && (Array.isArray(
                e.selected) ? e
            .selected.length :
            Object.keys(e.selected)
            .length)).length)

/*******************************************************  methods  *************************************************/
function getSections(){
  sections.value  =  [
    {
        id: 'customer_name',
        name: 'Customer Name',
        items: ticketDropdowns.value.customers,
        selected: null,
        title: (e) => [e.first_name, e.last_name].filter(Boolean).join(' ')
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
function updateSectionItems() {
    const queryObj = { ...route.query }
    sections.value.forEach(section=>{
        section.items = ticketDropdowns.value[section.id]
        section.loading = false
        const val = queryObj[section.id]
        if (!!val) {
            if (Array.isArray(val)) {
                if (val.length) {
                    section.selected = section.items.filter((e) => val.map(Number).includes(parseInt(e.id)))
                }
            } else {
                section.selected = section.items.find((e) => e.id == val)
            }
        }
    })
}

const route = useRoute()
function applyFilter() {
    if (!canApplyFilter.value) return
    // const filterData = {
    //     customer_id: sections.value.find(e=>e.id==='customers').selected,
    //     problem_type_id:sections.value.find(e=>e.id==='problem_types').selected,
    //     ticket_status_id:sections.value.find(e=>e.id==='ticket_status').selected,
    //     appointment_type_id:sections.value.find(e=>e.id==='appointment_type').selected,
    //     payment_type_id:sections.value.find(e=>e.id==='payment_status').selected,
    //     priority_id:sections.value.find(e=>e.id==='ticket_priorities').selected,
    //     // is_filter:true
    // }
    const filterData = {}
    for (const section of sections.value) {
        if (Array.isArray(section.selected)) {
            if (section.selected.length)
                filterData[section.id] = section.selected.map(e=>e.id)
        } else if (typeof section.selected === 'object' && !!section.selected) {
            if(Object.keys(section.selected).length)
                filterData[section.id] = section.selected.id
        } else if (!!section.selected) {
            filterData[section.id] = section.selected
        }
    }
    emit('filterdata',filterData)
    store.SET_FILTER_DATA(filterData)
    store.SET_CUSTOMIZER_DRAWER(store.Customizer_drawer = false);
    updateQuery(filterData)
}
function updateQuery(filters) {
    const queryObj = {}
    Object.keys(filters).forEach(key=>{
        if (Array.isArray(filters[key]) && filters[key].length) {
            // queryObj[key] = encodeURI([...filters[key].map(e=>e.id)])
            // queryObj[key] = encodeURI([...filters[key]])
            queryObj[key] = filters[key]
        } else if (typeof filters[key] === 'object' && !!filters[key]) {
            queryObj[key] = encodeURI(filters[key].id)
        } else if (!!filters[key]) queryObj[key] = filters[key]
    })
    router.push({
        query: {
            // ...route.query,
            ...queryObj
        }
    })
}

function clearFilters() {
    // emit('filterdata')
    router.push({
        query: {}
    })
    closeDialog()
}
function closeDialog(){
    // store.SET_CUSTOMIZER_DRAWER(store.Customizer_drawer = false);
    store.SET_CUSTOMIZER_DRAWER(false);
    // filterSelect.value.reset()
}
/************************************************* mounted ************************************************/

onMounted(() => {
    // getTicketData();
    if (Object.keys(ticketDropdowns.value || {}).length) {
        sections.value.forEach((e) => e.loading = false)
        updateSectionItems()
    }
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
                        :disabled="section.loading"
                        :loading="section.loading"
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="mt-5 pa-6">
            <v-btn color="primary" type="submit" v-if="!issubmit" @click="applyFilter()" :disabled="!canApplyFilter">Apply</v-btn>
            <v-btn color="error" class="ml-3" @click="clearFilters()" v-if="!issubmit">Reset</v-btn>
        </div>
    </perfect-scrollbar>
    <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
        <v-icon left>{{ icon }}</v-icon>
        {{ message }}
    </v-snackbar>
</template>