<script setup lang="ts">
import { computed, ref, toRef, toRefs, watch, watchEffect } from 'vue';
import { BProgressBar, BProgress } from "bootstrap-vue-next"

</script>

<template>
    <main class="box-modal">
        <div class="card">
            <div class="card-body">
                This is some text within a card body.
            </div>
        </div>
    </main>
</template>

<style scoped>
  .box-modal{
    width: auto;
    height: auto;
    padding: 2px 2px;
    display: flex;
  }

</style>