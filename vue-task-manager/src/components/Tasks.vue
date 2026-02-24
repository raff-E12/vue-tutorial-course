<script setup lang="ts">
import Task from './Task.vue';
import { useTaskStore } from '../store/TaskStore';
import { BButtonGroup, BButton } from 'bootstrap-vue-next';
import { onMounted, ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';

const TaskStorage = useTaskStore();
const { getTasks } = TaskStorage;
const props = defineProps(['timer']);
const { timer: isTimer } = toRefs(props);

// Uso della Refs nello store
const { task: TaskList, totalCount: countAll, favs: ListFav, favCount: CountFav, loading: isLoading } = storeToRefs(TaskStorage);
const ListSelection = ref('all');

const HandleFavSelection = (value: string) => {
   ListSelection.value = value;
}

</script>

<template>
    <main class="main-tk-sc" v-if="!isTimer">
      <div class="w-auto p-2 mb-5">
        <BButtonGroup>
          <BButton variant="success" @click="HandleFavSelection('all')">Lista Completa</BButton>
          <BButton variant="success" @click="HandleFavSelection('fav')">Preferiti</BButton>
        </BButtonGroup>
      </div>

      <template v-if="ListSelection === 'all' && !isTimer">
        <section class="w-100 d-flex flex-column justify-content-center align-items-center">
            <h2 class="mb-5 text-success position-relative">
            Liste Task
          <span class="badge text-bg-success">{{ countAll }}</span>
          </h2>
            <div class="tk-sc" >
              <template v-for="tasks in TaskList">
              <Task
                :title="tasks.title" 
                :subtitle="tasks.sub" 
                :text="tasks.text"
                :id="tasks.id"
                :fav="tasks.favourites"
              />
              </template>
              <p v-if="countAll === 0" class="mt-2 text-danger fw-bold fs-3">Lista Vuota.</p>
            </div>
        </section>
      </template>

     <template v-if="ListSelection === 'fav' && !isTimer">
        <section class="w-100 d-flex flex-column justify-content-center align-items-center">
            <h2 class="mb-5 text-success position-relative">
            Preferiti
          <span class="badge text-bg-success">{{ CountFav }}</span>
          </h2>
            <div class="tk-sc" >
              <template v-for="tasks in ListFav">
              <Task
                :title="tasks.title" 
                :subtitle="tasks.sub" 
                :text="tasks.text"
                :id="tasks.id"
                :fav="tasks.favourites"
              />
              </template>
            <p v-if="CountFav === 0" class="mt-2 text-danger fw-bold fs-3">Lista Vuota.</p>
            </div>
        </section>
     </template>

    </main>
</template>

<style scoped>

.main-tk-sc{
  width: 100%;
  height: auto;
  padding: 2px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.tk-sc{
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

</style>
