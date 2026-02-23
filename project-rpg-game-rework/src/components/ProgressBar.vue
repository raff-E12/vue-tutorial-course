<script setup lang="ts">
import { computed, ref, toRef, toRefs, watch, watchEffect } from 'vue';
import { BProgressBar, BProgress } from "bootstrap-vue-next"

const props = defineProps({
    progress1: {
        type: Number,
        required: true,
        default: 100
    },
    progress2: {
        type: Number,
        required: true,
        default: 100
    }
})

const { progress1: progress1, progress2: progress2 } = toRefs(props);

</script>

<template>
   <div class="progress-sc">
      <div class="d-flex flex-column justify-content-center align-items-center">
          <h3>Enemy</h3>
           <div class="w-100">
               <BProgress
                    striped
                    variant="danger"
                    :max="100"
                    :value="progress1"
                    show-value
                />
           </div>
      </div>
        <div class="d-flex flex-column justify-content-center align-items-center mt-5">
          <h3>Player</h3>
           <div class="w-100">
               <BProgress
                    striped
                    variant="success"
                    :max="100"
                    :value="progress2"
                    show-value
                />
           </div>
      </div>
   </div>
</template>

<style scoped>
  .box-selection{
    width: auto;
    height: auto;
    padding: 2px 2px;
    display: flex;
  }

  .progress-sc{
    width: 100%;
    margin-top: 10px;
  }
</style>