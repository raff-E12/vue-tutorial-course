<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import LoadingTask from '../components/LoadingTask.vue';
import Tasks from '../components/Tasks.vue';

const isTimer = ref(true);

onMounted(() => {
   setTimeout(() => {
    isTimer.value = false;
   }, 2500);
})

</script>

<template>
    <main class="main-box-sc-home">
        <LoadingTask v-if="isTimer"/>
        <Tasks :timer="isTimer"  />
    </main>
</template>

<style scoped>

.main-box-sc-home{
  width: 100%;
  padding-bottom: 50px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

</style>
