<script setup lang="ts">
import { BApp, BNavbar, BNavbarBrand } from 'bootstrap-vue-next'
import Tasks from './components/Tasks.vue';
import AddTaskForm from './components/AddTaskForm.vue';
import { storeToRefs } from 'pinia';
import { useTaskStore } from './store/TaskStore';
import LoadingTask from './components/LoadingTask.vue';
import { onMounted, ref } from 'vue';

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

          <BNavbar
            class="navbar-sc"
            variant="success"
            fixed="top"
          >
            <BNavbarBrand class="nav-brand-sc">
                <img
                  src="./assets/pinia-1.svg"
                  class="imgs-sc"
                  alt="logo-pinia"
                />
              <p class="text-nav">Pania Store Manager</p>
            </BNavbarBrand>

            <AddTaskForm :count="CountAll" :loading="isTimer" />
          </BNavbar>

          <section class="container d-flex sc-cont">
                <LoadingTask v-if="isTimer" />
                <Tasks :timer="isTimer"  />
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
  width: 100%;
  padding-bottom: 50px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.navbar-sc {
  background-color: var(--bg-green);
  padding: .90em;
}

.imgs-sc{
  width: 2%;
}

::selection{
  background-color: #2F5941;
  color: #F2F2F2;
}

.sc-cont{
  padding-top: 9em;
}

.nav-brand-sc{
  display: flex !important;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  gap: 10px;
}

.text-nav{
  text-align: left;
  font-weight: 600;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  color: white;
  margin-bottom: 0px;
}

</style>
