<template>
  <RouterView></RouterView>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
<style>
.required:after {
    content:" *";
    color: red;
    font-size:13px;
  }

</style>