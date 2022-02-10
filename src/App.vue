<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import config from "@/utils/config";
onMounted(() => {
  console.log(
    "\n" +
      "%c Release " +
      config.Release +
      " Powered by %cVue " +
      config.Vue +
      " 🍍%c" +
      config.Pinia +
      " \n",
    "color: #fadfa3; background: #030307; padding:5px 0;",
    "color: #42b883; background: #030307; padding:5px 0;",
    "color: #f3ad61; background: #030307; padding:5px 0;"
  );
});
</script>
