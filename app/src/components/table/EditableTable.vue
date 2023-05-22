<template>
<div>
        <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Search" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-right">
             <v-btn
          color="primary"
           @click="redirectAddTicket()"
        >
            <PlusIcon stroke-width="1.5" size="20" class="text-white"/>Add data
        </v-btn>
         <!-- <AddTicket :dialog.sync="dialog" @update = updateDialog() /> -->
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold">Id</th>
                <th class="text-subtitle-1 font-weight-semibold">UserInfo</th>
                <th class="text-subtitle-1 font-weight-semibold">Phone</th>
                <th class="text-subtitle-1 font-weight-semibold">Joining Date</th>
                <th class="text-subtitle-1 font-weight-semibold">Role</th>
                <th class="text-subtitle-1 font-weight-semibold">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key="item.id">
                <td class="text-subtitle-1">{{ item.id }}</td>
                <td>
                    <div class="d-flex align-center py-4">
                        <div>
                            <v-img :src="item.avatar" width="45px" class="rounded-circle img-fluid"></v-img>
                        </div>

                        <div class="ml-5">
                            <h4 class="text-h6 font-weight-semibold">{{ item.userinfo }}</h4>
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.usermail }}</span>
                        </div>
                    </div>
                </td>
                <td class="text-subtitle-1">{{ item.phone }}</td>
                <td class="text-subtitle-1">{{ item.jdate }}</td>
                <td>
                    <v-chip :color="item.rolestatus" size="small" label>{{ item.role }}</v-chip>
                </td>
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Edit">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="editItem(item)" v-bind="props"
                                    ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Delete">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(item)" v-bind="props"
                                    ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/apps/contact';
import AddTicket from '@/views/tickets/Addticket.vue'
import { useRouter, useRoute } from 'vue-router'

import contact from '@/_mockApis/apps/contact';

const store = useContactStore();
const router = useRouter()
const route = useRoute()
const tableProps = defineProps({
    userDetails: Object,
    title: String,
    breadcrumbs: Array,
    icon: String
});
onMounted(() => {
    store.fetchContacts();
});
const getContacts = computed(() => {
    return store.contacts;
});
function redirectAddTicket(){
    router.push({ path: '/add-ticket'})
}
const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const desserts = ref(contact);
const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    avatar: '1.jpg',
    userinfo: '',
    usermail: '',
    phone: '',
    jdate: '',
    role: '',
    rolestatus: ''
});
const defaultItem = ref({
    id: '',
    avatar: '1.jpg',
    userinfo: '',
    usermail: '',
    phone: '',
    jdate: '',
    role: '',
    rolestatus: ''
});

//Methods
const filteredList = computed(() => {
    return desserts.value.filter((user) => {
        return user.userinfo.toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item) {
    const index = desserts.value.indexOf(item);
    confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
    } else {
        desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Contact' : 'Edit Contact';
});
</script>
