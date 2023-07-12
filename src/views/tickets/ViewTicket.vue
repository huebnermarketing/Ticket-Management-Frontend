

<template>
    <div class="pa-6 d-flex justify-space-between bg-primary">
        <h5 class="text-h5">{{ ticketItems.unique_id }}- {{ ticketItems.problem_title }}</h5>
        <div>
            <v-btn color="secondry" class="text-primary" @click="openEditDialog()">Edit</v-btn>
            <v-btn color="error" class="ml-3" @click="closeDialog()">close</v-btn>
        </div>
    </div>

    <v-col cols="12">
        <v-row>
            <v-col cols="12" lg="3" md="3" sm="3" v-for="card in topCardsData" :key="card.title">
                <div :class="'text-decoration-none d-flex align-center justify-center text-center rounded-md pa-6  bg-' + card.bgcolor">
                    <div :class="'bg-' + card.bgcolor">
                        <div
                            :class="'text-subtitle-1 text-capitalize font-weight-bold mt-3 text-' + card.textcolor"
                            v-text="card.title"
                        ></div>
                        <h4 :class="'text-h4 mt-1 text-' + card.textcolor" v-text="card.number"></h4>
                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <!-- :color="statusColors"
                :track-color="statusColors" -->
                <!-- :track-fill-color="statusColors"    -->
                <!-- #03CFCF
#FF7601
12CB36
#D5D5D6
#f1f3f4 -->
                <!-- <div class="d-none">{{ colorComputed }}</div> -->
                <!-- {{ticketStatus[0] ? ticketStatus[0].toLowerCase() : ''}} -->
                <!-- <v-slider
                    :color="statusColors"
                    :track-color="statusColors"
                    track-fill-color="#03CFCF"
                    v-model="ticketStatusVal"
                    @input="clicked()"
                    :ticks="ticketStatus"
                    tick-size="20"
                    :max="4"
                    step="1"
                    show-ticks="always"
                    rounded="true"
                >
                </v-slider> -->

                <div class="task_process">
                    <div class="process_info" v-for="(data, i) in ticketStatus" :key="i">
                        <span class="text-warning" :style="{ background: `${data.background_color}` }">&nbsp;</span>
                        <h5>{{ data.status_name }}</h5>
                        <!-- :style="{'color':`${data.text_color}`}" -->
                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <v-card class="overflow-auto border" elevation="0">
                    <v-container>
                        <!--------------------------------------------------- ticket details ---------------------------------->
                        <div class="mb-4">
                            <label class="text-h4 font-weight-regular">Ticket Details</label>
                        </div>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">Customer Name</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems?.customer?.first_name + ' ' + ticketItems?.customer?.last_name }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">Problem Type</label></v-col>
                            <v-col class="detail_info">
                                <h5 v-for="(data, i) in problem_types" :key="i">
                                    {{ data && i < problem_types.length - 1 ? data + ',' : data }}
                                </h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">problem title</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems.problem_title }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">description</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems.description }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">due date</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems.due_date }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">assign engineer</label></v-col>
                            <v-col class="detail_info">
                                <img v-if="!profileimg" src="@/assets/images/profile/user.png" alt="image" />
                                <img v-if="profileimg" :src="profileimg" alt="image" />
                                <h5>{{ erName }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">appointment type</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems?.appointment_type?.appointment_name }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">Address</label></v-col>
                            <v-col class="detail_info">
                                <h5>
                                    {{
                                        ticketItems?.customer_location?.address_line1 +
                                        ',' +
                                        ticketItems?.customer_location?.area +
                                        ',' +
                                        ticketItems?.customer_location?.city +
                                        '-' +
                                        ticketItems?.customer_location?.zipcode
                                    }}
                                </h5>
                            </v-col>
                        </v-row>
                        <!----------------------------------------------------- payment details --------------------------------------------------->
                        <v-divider class="mt-4"></v-divider>
                        <div class="mb-4 mt-4">
                            <label class="text-h4 font-weight-regular">Payment Details</label>
                        </div>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">Ticket amount</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems.amount }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">payment status</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems?.payment_status?.payment_type }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">paid amount</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems?.collected_amount }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">payment mode</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems?.payment_mode }}</h5>
                            </v-col>
                        </v-row>
                        <v-row class="ticket_detail_info">
                            <v-col sm="3"><label class="text-capitalize">remaining amount</label></v-col>
                            <v-col class="detail_info">
                                <h5>{{ ticketItems?.remaining_amount }}</h5>
                            </v-col>
                        </v-row>
                        <!----------------------------------------------------------- comments ---------------------------------------------->
                        <v-divider class="mt-4"></v-divider>
                        <div>
                            <div class="mb-4 mt-4">
                                <label class="text-h4 font-weight-regular mb-4">Comments</label>
                            </div>

                            <v-card variant="outlined" v-for="(data, i) in comments" :key="i" class="mt-3">
                                <v-card-item>
                                    <div>
                                        <div class="d-flex gap-3 align-center">
                                            <v-avatar size="40">
                                                <img src="@/assets/images/profile/user.png" width="40" alt="avatar" />
                                            </v-avatar>
                                            <div class="d-block d-sm-flex align-center gap-3">
                                                <h6 class="text-h6">{{ data?.users?.first_name + ' ' + data?.users?.last_name }}</h6>
                                                <span class="text-subtitle-2 opacity-50">
                                                    <CircleIcon size="8" fill="inherit" class="opacity-50 mr-1" />
                                                    {{ data?.comment_time }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="py-4 text-body-1">{{ data?.comment }}</div>
                                        <v-text-field
                                            v-if="isEditable && data.id == editId"
                                            name="problemType1"
                                            v-model="editCommentText"
                                            variant="outlined"
                                            color="primary"
                                            class="mt-2"
                                        >
                                        </v-text-field>
                                        <div v-if="data.user_id === userData.id && data.id !== editId">
                                            <v-btn
                                                color="primary"
                                                variant="flat"
                                                class="mt-4"
                                                @click="editComment(data.id, data?.comment)"
                                                :disabled="isLoading"
                                            >
                                                Edit Comment
                                            </v-btn>
                                            <v-btn
                                                color="error"
                                                variant="flat"
                                                class="mt-4 ml-2"
                                                @click="deleteComment(data.id)"
                                                :disabled="isLoading"
                                            >
                                                Delete Comment
                                            </v-btn>
                                        </div>

                                        <div v-if="isEditable && data.id == editId && !isEdit">
                                            <v-btn
                                                color="primary"
                                                variant="flat"
                                                class="mt-4"
                                                @click="saveComment(data.id)"
                                                :disabled="isLoading"
                                            >
                                                Save Comment
                                            </v-btn>
                                            <v-btn
                                                color="error"
                                                variant="flat"
                                                class="mt-4 ml-2"
                                                @click="cancelComment(data.id)"
                                                :disabled="isLoading"
                                            >
                                                Cancel
                                            </v-btn>
                                        </div>
                                    </div>
                                </v-card-item>
                            </v-card>
                            <v-form>
                                <div class="d-block d-sm-flex gap-3 align-center mb-4 pt-5 mt-5">
                                <v-avatar class="flex-shrink-0 d-none d-sm-block" size="33">
                                    <img
                                        v-if="!userData.profile_photo"
                                        src="@/assets/images/profile/user.png"
                                        width="33"
                                        height="33"
                                        alt="avatar"
                                    />
                                    <img v-if="userData.profile_photo" :src="userData.profile_photo" width="33" height="33" alt="avatar" />
                                </v-avatar>
                                <v-text-field
                                    variant="outlined"
                                    color="primary"
                                    v-model="commentMsg"
                                    placeholder="Comment"
                                    hide-details
                                ></v-text-field>
                                <v-btn
                                    color="primary"
                                    variant="flat"
                                    :disabled="commentMsg === '' || isLoading"
                                    class="mt-3 mt-sm-0"
                                    @click="addComment()"
                                    type="submit"
                                >
                                    Comment
                                </v-btn>
                            </div>
                            </v-form>
                        </div>
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
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-snackbar :color="color" :timeout="timer" v-model="showSnackbar" v-if="isSnackbar">
            <v-icon left>{{ icon }}</v-icon>
            {{ message }}
        </v-snackbar>
    </v-col>
</template>
<script setup>
import { ref, defineExpose, onMounted, computed } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { baseURlApi } from '@/api/axios';
import dialogBox from '@/components/TicketComponents/dialog.vue';
import TopCards from '@/components/cards/TopCards.vue';
import { router } from '@/router';
const store = useCustomizerStore();
const ticketItems = ref([]);
const ticketid = ref(0);
const isEdit = ref(false);
const sections = ref([
    {
        name: 'Customer Name',
        items: [
            {
                id: 1,
                name: 'pratibha'
            }
        ],
        selected: null
    },
    {
        name: 'Problem Type',
        items: [],
        selected: null
    },
    {
        name: 'Ticket Status',
        items: [
            {
                id: 1,
                name: 'pratibha'
            },
            {
                id: 2,
                name: 'pratibha2'
            },
            {
                id: 3,
                name: 'pratibha3'
            }
        ],
        selected: [],
        multiple: true
    },
    {
        name: 'Appointment Type ',
        items: [],
        selected: null
    },
    {
        name: 'Payment Status',
        items: [],
        selected: null
    },
    {
        name: 'Contract Name',
        items: [],
        selected: null
    },
    {
        name: 'Priority',
        items: [],
        selected: null
    }
]);
const ticketDashboard = ref({});
const topCardsData = ref([]);
const colors = ref([]);
const ticketStatus = ref([]);
const sliderColor = ref([]);
const statusColors = ref('');
// const ticketStatusVal = ref('');
// const colorComputed = ref('');
const problem_types = ref([]);
const erName = ref('');
const profileimg = ref(null);

/******************* login user detail***********/
const userData = JSON.parse(localStorage.getItem('user'));

/*********************comments ******************/
const commentMsg = ref('');
const loggedinUserName = ref('');
const loggedinUserProfile = ref('');
const comments = ref([]);
const isLoading = ref(false);
const isEditable = ref(false);
const editId = ref(0);
const editCommentText = ref('');

const ticketDetailsArray = ref([]);
//props for toastification
const showSnackbar = ref(false);
const message = ref('');
const color = ref('');
const icon = ref('');
const timer = ref(5000);
const isSnackbar = ref(false);

//dialog props
const dialog = ref(false);
const dialogTitle = ref('Are you sure you want to delete this comment ?');
const dialogText = ref('This will delete this comment permanently, you can not undo this action.');
const cancelText = ref('Cancel');
const confirmText = ref('Delete');
const title = ref('Delete comment');
const deleteDialog = ref();
const deleteId = ref(0);
/************************************************* methods  ***********************************************/
function getCardData() {
    topCardsData.value = [
        {
            title: 'Ticket Amount',
            key: 'amount',
            number: ticketItems.value.amount,
            bgcolor: 'lightprimary',
            textcolor: 'primary'
        },
        {
            title: 'Paid Amount',
            key: 'collected_amount',
            number: ticketItems.value.collected_amount,
            bgcolor: 'lightwarning',
            textcolor: 'warning'
        },
        {
            title: 'Remaining Amount',
            key: 'remaining_amount',
            number: ticketItems.value.remaining_amount,
            bgcolor: 'lightprimary',
            textcolor: 'primary'
        },
        {
            title: 'Payment Status',
            key: 'payment_status',
            number: ticketItems.value.payment_status.payment_type,
            bgcolor: 'lightwarning',
            textcolor: 'warning'
        }
    ];
}
function cancelComment() {
    isEditable.value = false;
    isEdit.value = false;
    editId.value = 0;
}
function deleteComment(id) {
    deleteId.value = id;
    deleteDialog.value?.open();  
}
//cancel delete from dialog
function cancelClick() {
    deleteDialog.value?.close();
}

//confirm delete from dialog
function confirmClick() {
   isLoading.value = true;
    baseURlApi
        .delete(`ticket/comment/delete/${deleteId.value}`)
        .then((res) => {
            deleteDialog.value?.close();
            isLoading.value = false;
            getComments();
        })
        .catch((error) => {
            console.log('errr', error);
            deleteDialog.value?.close();
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function saveComment(id) {
    isLoading.value = true;
    isEdit.value = true;
    const requestBody = {
        comment: editCommentText.value
    };
    baseURlApi
        .post(`ticket/comment/update/${id}`, requestBody)
        .then((res) => {
            isLoading.value = false;
            isEditable.value = false;
            isEdit.value = false;
            editId.value = 0;
            getComments();
        })
        .catch((error) => {
            console.log('errr', error);
            isLoading.value = false;
            isEditable.value = false;
            isEdit.value = false;
            editId.value = 0;
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}

function openEditDialog() {
    const id = store.ticketID;
    router.push({
        name: 'EditTicket',
        params: { id }
    });
}

function editComment(id, text) {
    editCommentText.value = text;
    isEditable.value = true;
    editId.value = id;
}
function getComments() {
    baseURlApi
        .get(`ticket/comment/${store.ticketID}/list`)
        .then((res) => {
            isLoading.value = false;
            comments.value = res.data.data;
            console.log('dataa11 ccc', comments.value);
        })
        .catch((error) => {
            console.log('errr', error);
            isLoading.value = false;
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function addComment() {
    if (commentMsg.value.length > 0) {
        isLoading.value = true;
        ticketid.value = store.ticketID;
        const requestbody = {
            comment: commentMsg.value,
            ticket_id: ticketid.value
        };
        baseURlApi
            .post(`ticket/comment/add`, requestbody)
            .then((res) => {
                isLoading.value = false;
                commentMsg.value = '';
                getComments();
                console.log('dataa11 ppp', res.data);
            })
            .catch((error) => {
                isLoading.value = false;
                isSnackbar.value = true;
                showSnackbar.value = true;
                commentMsg.value = '';
                message.value = error.response.data.message;
                color.value = 'error';
                icon.value = 'mdi-close-circle';
            });
    }
}
function getTicketData() {
    console.log('storee', store.ticketID);
    ticketid.value = store.ticketID;
    baseURlApi
        .get(`ticket/view/${ticketid.value}`)
        .then((res) => {
            // isLoading.value = false;

            ticketItems.value = res.data.data.ticket_detail;
            console.log('errr 111', ticketItems.value.assigned_engineer.first_name);
            ticketStatus.value = res.data.data.ticket_status;
            erName.value = ticketItems.value.assigned_engineer.first_name + ' ' + ticketItems.value.assigned_engineer.last_name;
            // const object = res.data.data.ticket_status.map((element, index) => {
            //     return (index = element.status_name);
            // });
            profileimg.value = ticketItems.value.assigned_engineer.profile_photo;
            // ticketStatus.value = { ...object };

            // const colors = res.data.data.ticket_status.map((element, index) => {
            //     return (index = element.background_color);
            // });
            // sliderColor.value = { ...colors };
            problem_types.value = ticketItems.value.problem_types.map((data) => {
                return data.problem_name;
            });

            getCardData();
            console.log('dataa11 ppp', ticketItems.value);
        })
        .catch((error) => {
            console.log('errr', error);
            // isLoading.value = false;
            isSnackbar.value = true;
            showSnackbar.value = true;
            message.value = error.response.data.message;
            color.value = 'error';
            icon.value = 'mdi-close-circle';
        });
}
function closeDialog() {
    console.log('closeddd');

    store.SET_CUSTOMIZER_DRAWER((store.Customizer_drawer = false));
    // filterSelect.value.reset()
}
// /************************************************* mounted ************************************************/
onMounted(() => {
    getTicketData();
    getComments();
});
</script>

<style >
.v-slider-track__ticks--always-show .v-slider-track__tick,
.v-slider--focused .v-slider-track__tick {
    opacity: 1;
    /* background: #c75555; */
    border-radius: 50%;
}
.ticket_detail_info {
    display: flex;
    align-items: center;
}
.ticket_detail_info + .ticket_detail_info {
    margin-top: 10px;
}
.ticket_detail_info label {
    min-width: 180px;
    font-size: 14px;
}
.ticket_detail_info .detail_info {
    display: flex;
    align-items: center;
}
.ticket_detail_info .detail_info img {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    margin-right: 10px;
}
.ticket_detail_info .detail_info h5 {
    font-size: 14px;
}

.task_process {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.task_process:before {
    position: absolute;
    content: '';
    left: 0px;
    right: 0px;
    top: 15px;
    height: 1px;
    background-color: rgba(var(--v-border-color), 1);
}
.task_process .process_info {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.task_process .process_info:first-child {
    align-items: flex-start;
}
.task_process .process_info:last-child {
    align-items: flex-end;
}
.task_process .process_info span {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    margin-bottom: 10px;
    position: relative;
    z-index: 2;
}
.task_process .process_info h5 {
}
</style>