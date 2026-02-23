<script setup lang="ts">
import { BApp, BNavbar, BButton } from "bootstrap-vue-next"

const props = defineProps({
    title: String,
    subtitle: String
})

</script>

<template lang="html">
   <div class="main-card-sc">
        <div class="card w-50 h-auto">
            <div class="card-body">
                <h5 class="card-title">{{ props.title }}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ props.subtitle }}</h6>
                <p class="card-text">
                    <slot name="text-message"></slot>
                </p>
            </div>
        </div>
   </div>
</template>

<style scoped>

.main-card-sc{
    width: auto;
    height: auto;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>