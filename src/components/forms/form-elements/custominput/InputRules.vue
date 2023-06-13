<script setup>
import { ref, computed } from 'vue';
const rules = ref([
    (value) => !!value || 'Required.',
    (value) => (value && value.length >= 3) || 'Min 3 characters',
    (value) => (value || '').length <= 20 || 'Max 20 characters',
    (value) => {
        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || 'Invalid e-mail.';
    }
]);
</script>
<template>
    <div>
        <v-text-field :rules="rules" label="Enter Email" hide-details="auto"></v-text-field>
    </div>
</template>
