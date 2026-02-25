<script setup lang="ts">
import { BApp } from 'bootstrap-vue-next'
import { storeToRefs } from 'pinia';
import { useTaskStore } from './store/TaskStore';
import { onMounted, ref } from 'vue';
import Navbar from './components/Navbar.vue';

const TaskStorage = useTaskStore();
const { totalCount: CountAll, loading: isLoading } = storeToRefs(TaskStorage);
const { getTasks, loading } = TaskStorage;
const isTimer = ref(true);

onMounted(() => {
   setTimeout(() => {
    getTasks();
    isTimer.value = false;
   }, 2500);
})

</script>

<template>
  <BApp>
      <main class="main-sc">
        <Navbar :-count-all="CountAll" :is-timer="isTimer" />
          <section class="container d-flex sc-cont">
              <RouterView />
          </section>
      </main>
  </BApp>
</template>

<style scoped>

:root{
  --bg-green: #2F5941;
  --bg-green-1: #119500;
  --bg-white: #F2F2F2;
}

.main-sc{
  padding-bottom: 50px;
  padding-top: 120px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

</style>
