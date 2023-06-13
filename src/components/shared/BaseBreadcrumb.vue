<script setup>
import { ChevronRightIcon } from 'vue-tabler-icons';
const props = defineProps({
    title: String,
    breadcrumbs: Array,
    icon: String
});

const emit = defineEmits(['btnclicked'])
function clicked() {
  emit('btnclicked')
}
</script>
<template>
    <v-card class="elevation-0 rounded-md">
        <div class="py-10 py-lg-0">
            <div class="d-flex justify-space-between">
                <div class="d-flex py-0 align-center">
                    <div>
                        <v-breadcrumbs :items="breadcrumbs" class="text-h6 font-weight-medium pa-0 ml-n1" @click="clicked">
                            <template v-slot:divider>
                                <div class="d-flex align-center text-h3 text-primary"><chevron-right-icon /></div>
                            </template>
                            <template v-slot:title="{ item }">
                                <h6 class="text-medium-emphasis text-subtitle-1">{{ item.title }}</h6>
                            </template>
                        </v-breadcrumbs>
                    </div>
                </div>
            </div>
        </div>
    </v-card>
</template>

<style lang="scss">
.page-breadcrumb {
    .v-toolbar {
        background: transparent;
    }
}
</style>
