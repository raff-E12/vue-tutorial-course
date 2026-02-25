<script setup lang="ts">
import { BDropdown, BDropdownItem, BDropdownForm, BButton } from 'bootstrap-vue-next';
import { computed, ref, toRefs } from 'vue';
import { useTaskStore } from '../store/TaskStore';

const props = defineProps(['count', 'loading']);
const { count: isCountList, loading: isLoading } = toRefs(props);
const { addTask } = useTaskStore(); 

const isTitle = ref('');
const isSubTitle = ref('');
const isText = ref('');
const isCompleted = computed(() => {
    return isText.value !== "" && isSubTitle.value !== "" && isText.value !== "";
})

const HandleAddTask = () => {
    if (isText.value !== "" && isSubTitle.value !== "" && isText.value !== "") {
        if (isCountList?.value > 0) {
            const CostructionTask = {
                id: String(isCountList?.value + 1),
                title: isTitle.value,
                sub: isSubTitle.value,
                text: isText.value,
                favourites: false
            }

            addTask(CostructionTask);
        }
    } else {
        window.alert("Devi Compilare i Campi corrispondenti!!");
    }
}

const HandleResetInput = () => {
    isTitle.value = "";
    isSubTitle.value = "";
    isText.value = "";
}

</script>

<template>
    <div class="box-form-drop">
      <BDropdown
        placement="bottom"
        variant="success"
        auto-close="outside"
        text="Aggiungi Task"
      >
        <BDropdownForm class="drop-add-form">
           <template v-if="!isLoading">
             <div class="form-add-sc">
               <h6 class="text-success fs-bold w-100 text-center mb-4">Aggiungi Task</h6>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Titolo</label>
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Aggiungi Titolo..." v-model="isTitle">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">SottoTitolo</label>
                    <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="Aggiungi Sottotitolo..." v-model="isSubTitle">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Aggiungi Messaggio</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="isText"></textarea>
                </div>
                <div class="w-auto d-flex gap-3 flex-rown">
                    <button type="button" class="btn btn-primary" @click="HandleAddTask">Aggiungi Task</button>
                    <button v-if="isCompleted" type="button" class="btn btn-danger" @click="HandleResetInput"><i class="fa-solid fa-delete-left"></i></button>
                </div>
            </div>
           </template>
           <template v-if="isLoading">
                <div class="card">
                    <div class="card-body d-flex flex-align">
                        <p class="m-0">Caricamento</p>
                        <div class="spinner-border spinner-border-sm text-success" role="status">
                           <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
           </template>
        </BDropdownForm>
      </BDropdown>
    </div>
</template>

<style scoped>

.box-form-drop{
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.drop-add-form{
    width: 300px;
}

.flex-align{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 8px;
}

</style>