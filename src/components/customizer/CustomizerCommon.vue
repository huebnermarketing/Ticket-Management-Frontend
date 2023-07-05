<script setup>
import { onMounted, ref } from 'vue';
import { useCustomizerStore } from '@/stores/customizer'

const store = useCustomizerStore();



</script>
<template>
    <v-navigation-drawer app temporary elevation="10" location="right" :width="store.drawerWidth" v-if="store.Customizer_drawer" v-model="store.Customizer_drawer">
        <component :is="store.ComponentName"/>
    </v-navigation-drawer>
</template>

<style lang="scss"></style>
