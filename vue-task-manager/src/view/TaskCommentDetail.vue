<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { taskId: isKey } = route.params;
const commentiTask = [
    {
        id: 101,
        testo: "Ho completato la configurazione dell'ambiente di sviluppo, tutto funziona correttamente.",
        persona: "Marco Ferrari",
        taskId: 1,
        taskTitolo: "Configurare ambiente di sviluppo"
    },
    {
        id: 102,
        testo: "Ritardo sulla consegna a causa di un problema con le dipendenze.",
        persona: "Sofia Conti",
        taskId: 1,
        taskTitolo: "Configurare ambiente di sviluppo"
    },
    {
        id: 103,
        testo: "Ho bisogno di chiarimenti sui requisiti del database.",
        persona: "Luca Romano",
        taskId: 2,
        taskTitolo: "Progettare il database"
    },
    {
        id: 104,
        testo: "Ho creato lo schema ER, domani lo condivido per feedback.",
        persona: "Chiara Marino",
        taskId: 2,
        taskTitolo: "Progettare il database"
    },
    {
        id: 105,
        testo: "L'API REST è stata implementata e testata localmente.",
        persona: "Alessandro Greco",
        taskId: 3,
        taskTitolo: "Sviluppare API backend"
    },
    {
        id: 106,
        testo: "Attenzione: l'endpoint /users restituisce un errore 500 in alcuni casi.",
        persona: "Elena Vitale",
        taskId: 3,
        taskTitolo: "Sviluppare API backend"
    },
    {
        id: 107,
        testo: "Ho finito il mockup della homepage, aspetto approvazione.",
        persona: "Davide Fontana",
        taskId: 4,
        taskTitolo: "Creare interfaccia utente"
    },
    {
        id: 108,
        testo: "I colori non rispecchiano il brand, possiamo modificarli?",
        persona: "Francesca Leone",
        taskId: 4,
        taskTitolo: "Creare interfaccia utente"
    },
    {
        id: 109,
        testo: "Test superati con successo su Chrome e Firefox.",
        persona: "Roberto Galli",
        taskId: 5,
        taskTitolo: "Testare compatibilità browser"
    },
    {
        id: 110,
        testo: "Problema su Safari, il menu non si apre correttamente.",
        persona: "Valentina De Luca",
        taskId: 5,
        taskTitolo: "Testare compatibilità browser"
    },
    {
        id: 111,
        testo: "Ho scritto la documentazione per l'installazione.",
        persona: "Giuseppe Verdi",
        taskId: 6,
        taskTitolo: "Scrivere documentazione"
    },
    {
        id: 112,
        testo: "Manca la sezione sulla configurazione avanzata.",
        persona: "Anna Neri",
        taskId: 6,
        taskTitolo: "Scrivere documentazione"
    },
    {
        id: 113,
        testo: "Il deploy su staging è completato, tutto OK.",
        persona: "Marco Ferrari",
        taskId: 7,
        taskTitolo: "Effettuare deploy su staging"
    },
    {
        id: 114,
        testo: "La pipeline CI/CD si è bloccata durante il build.",
        persona: "Sofia Conti",
        taskId: 7,
        taskTitolo: "Effettuare deploy su staging"
    },
    {
        id: 115,
        testo: "Bug #42 risolto e testato.",
        persona: "Luca Romano",
        taskId: 8,
        taskTitolo: "Risolvere bug critici"
    }
];

const isComments = computed(() => {
    return commentiTask.filter(comment => comment.taskId === Number(isKey));
})

</script>

<template>
    <div class="main-comment-task">
        <template v-if="isComments.length !== 0">
            <h2 class="text-success">Commenti della Task</h2>
            <ul class="list-group mt-5">
                <li class="list-group-item" v-for="(items, index) in isComments" :key="`comment-${index}`">
                <div class="card w-full">
                        <div class="card-body">
                            <h5 class="card-title">{{ items.taskTitolo }}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">{{ items.persona }}</h6>
                            <p class="card-text">{{ items.testo }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </template>
        <template v-if="isComments.length === 0">
            <div class="card w-100">
                <div class="card-body text-center fw-bolder">
                    Commenti non Visibili.
                </div>
            </div>
        </template>
        <!-- <div class="mt-5">
            <button class="btn btn-primary" type="button" @click="() => router.go(-1)">Indietro</button>
        </div> -->
    </div>
</template>

<style scoped>
    
.main-comment-task{
  width: 100%;
  padding-bottom: 50px;
  height: auto;
  display: flex;
  padding-top: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}


</style>