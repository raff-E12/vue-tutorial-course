<script setup lang="ts">
import { BCard, BTabs, BTab, BCardText } from 'bootstrap-vue-next';
import { useRoute, useRouter } from 'vue-router';
import { useTaskStore, type Task } from '../store/TaskStore';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, toRefs, watch, watchEffect } from 'vue';

const router = useRoute();
const route = useRouter();
const { taskId: ID } = router.params;
const storage = useTaskStore();
const { toogleFav } = storage;
const { task: isTasks } = storeToRefs(storage);
const props = defineProps(['totals', 'taskId'])
const { taskId } = toRefs(props);
const isTabsIndex = ref(0);

const FindTask = computed(() => {
    if(ID === "") return null;
    const current = isTasks.value.find((item) => { return item.id === ID });
    if (current && ID) {
        const { id, text, title, sub, favourites } = (current as Task);
        return {
            id: id || "",
            title: title || "",
            text: text || "",
            sub: sub || "",
            favourites: favourites || false
        }
    }
});

const isShow = computed(() => {
    if (FindTask.value !== null && FindTask.value !== undefined) {
        const isLength = Object.values(FindTask.value).length;
        return isLength > 0;
    }

    return false;
});

onMounted(() => {
    if(!ID || !isShow.value){
        route.replace({ name: 'homepage' }); // Cambio di Rotta in name
    }
})

// Visualizzazione Rotta Child
watch(isTabsIndex, (newIndex) => {
    if (newIndex === 2) {
      route.push({ name: 'comments-task', params: { taskId: ID } });   
    } else {
      route.push({ name: 'detail-task', params: { taskId: ID } });
    }
})

</script>

<template>
    <main class="main-detail-task">
        <h2 class="text-success">Dettaglio della Card</h2>
        <section class="w-50 mt-5">
            
            <template v-if="isShow">
                <BCard no-body>
                    <BTabs card v-model:index="isTabsIndex">
                        <BTab
                        title="Dettaglio Card"
                        active
                        >
                        <BCardText>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{{ FindTask!.title || "" }}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">{{ FindTask!.sub || "" }}</h6>
                                    <p class="card-text">{{ FindTask!.text || "" }}</p>
                                    <div class="w-auto">
                                        <span class="badge text-bg-success">ID Task: {{ taskId }}</span>
                                    </div>
                                </div>
                            </div>
                        </BCardText>
                        </BTab>
                        <BTab title="Azioni Rapide">
                            <BCardText>
                                <div class="w-auto d-flex flex-rown gap-2 p-2">
                                    <button class="btn btn-primary" type="button" @click="() => route.push({ name: 'homepage' })">Torna in Homepage</button>
                                    <button class="btn btn-primary" type="button" @click="toogleFav(FindTask!.id)">
                                        <i v-if="FindTask!.favourites" class="fa-solid fa-heart-circle-minus"></i>
                                        <i v-if="!FindTask!.favourites" class="fa-solid fa-heart-circle-plus"></i>
                                    </button>
                                </div>
                            </BCardText>
                        </BTab>
                        <BTab title="Commenti">
                            <BCardText>
                               <RouterView />
                            </BCardText>
                        </BTab>
                    </BTabs>
                </BCard>
            </template>
            
            <template v-if="!isShow">
                <div class="card">
                    <div class="card-body">
                        Caricamento...
                    </div>
                </div>
            </template>
        </section>
    </main>
</template>

<style scoped>

.main-detail-task{
  width: 100%;
  padding-bottom: 50px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

</style>
