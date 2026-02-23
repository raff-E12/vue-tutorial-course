<script setup lang="ts">
  import { BApp, BNavbar, BButton, BFormRadioGroup } from "bootstrap-vue-next"

  const props = defineProps({
    title: {
        type: String,
        default: "Title Message"
    },
    text: {
        type: String,
        default: "Text Message"
    },
    color: {
        type: String,
        default: "#a0a0a0"
    }
  })
  
</script>

<template>
    <div class="card overflow-hidden" style="width: 18rem;">
        <!-- <img :src="props.src" class="card-img-top" :alt="alt"> -->
        <div class="container-bg" :style="{ backgroundColor: props.color }">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ props.title }}</h5>
            <p class="card-text">{{ props.text }}</p>
        </div>
    </div>
</template>

<style scoped>
 
 .container-bg{
    width: 100%;
    padding: 80px;
    height: auto;
 }
</style>