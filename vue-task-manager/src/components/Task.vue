<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useTaskStore } from '../store/TaskStore';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    title: {
        type: String,
        default: "Titolo Vuoto"
    },
    subtitle: {
        type: String,
        default: "Sottotitolo Card"
    },
    text: {
        type: String,
        default: "Titolo Default della Card"
    },
    id: {
        type: String,
        default: 0
    },
    fav: {
        type: Boolean,
        default: false
    }
})

const { text: isText, subtitle: isSubTitle, title: isTitle, id: isID } = toRefs(props);
const storageTask = useTaskStore();
const { toogleFav, deleteTask } = storageTask;
const route = useRouter();

const HandleLinkDetailRoute = (id: string) => {
    route.push({ name: 'detail-task', params: { taskId: id } });
}

</script>

<template>
    <div class="card" style="width: 80%;" :key="`task-${id}`">
        <div class="card-body">
            <h5 class="card-title">{{ isTitle }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ isSubTitle }}</h6>
            <p class="card-text">{{ isText }}</p>
             <div class="w-auto d-flex flex-rown gap-2">
                <button type="button" class="btn btn-primary" @click="deleteTask(isID)"><i class="fa-solid fa-trash"></i></button>
                <button type="button" class="btn btn-primary" @click="toogleFav(isID, fav)">
                    <i v-if="fav" class="fa-solid fa-heart-circle-minus"></i>
                    <i v-if="!fav" class="fa-solid fa-heart-circle-plus"></i>
                </button>
                <button type="button" class="btn btn-success" @click="HandleLinkDetailRoute(isID)">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
             </div>
        </div>
    </div>
</template>

<style scoped>

.box-sc{
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

</style>