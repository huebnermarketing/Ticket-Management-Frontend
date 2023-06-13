<template>
    <div class="text-center">
        <v-dialog v-model="opendialog" persistent class="dialog-mw">
            <v-card >
               <v-toolbar
              color="primary"
              :title="title"
            ></v-toolbar>
                <v-card-title class="text-h5 mt-3"> {{dialogTitle}} </v-card-title>
                <v-card-text
                    >{{dialogText}}</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  class="text-error" text @click="cancel()" flat> {{cancelText}}</v-btn>
                    <v-btn  class="text-primary" text @click="confirm()" flat> {{confirmText}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import { ref, defineExpose } from 'vue';
const isConfirm = ref(false);
const opendialog = ref(false);
const props = defineProps({
    dialogTitle: String,
    dialogText: String,
    confirmText: String,
    cancelText: String,
    dialog: Boolean,
    title:String
});
const emit=  defineEmits(["confirClk","cancelClk"]);
function open() {
    opendialog.value = true;
}
function close(){
  opendialog.value = false;
    console.log("closee",opendialog.value)

}

function confirm() {
  emit('confirClk')   
}

function cancel() {
    emit('cancelClk')   
}
defineExpose({
    open,
    confirm,
    close,
    cancel
});
</script>
