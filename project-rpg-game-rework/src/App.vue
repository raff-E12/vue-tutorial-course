<script setup lang="ts">
import { BApp, BModal, BvTriggerableEvent, BButton } from "bootstrap-vue-next"
import { computed, reactive, ref, watch, watchEffect } from "vue";
import GameRounds from "./components/GameRounds.vue";
import ProgressBar from "./components/ProgressBar.vue";
import ActionPlayer from "./components/ActionPlayer.vue";
import BattleLogsList from "./components/BattleLogsList.vue";
import { handleAttack, handleAttackSpecial, handleLeaveSession, handleMediKit, handleNewGame } from "./assets/FunctionGame";

const MAX_HEALTH = 100;
const ATTACK_MIN = 5;
const ATTACK_MAX = 15;
const SPECIAL_MIN = 10;
const SPECIAL_MAX = 25;
const MEDIKIT_MIN = 10;
const MEDIKIT_MAX = 20;
const SPECIAL_ROUND_UNLOCK = 3;

const HealthPlayer = ref(MAX_HEALTH);
const HealthEnemy = ref(MAX_HEALTH);
const rounds = ref(0);
const winner = ref(null);
const LogsMessage = ref([]);

const ModalRef = ref(false);
const DisabledMedikit = computed(() => HealthPlayer.value >= MAX_HEALTH);
const AttackEnemyDisabled = computed(() => rounds.value % SPECIAL_ROUND_UNLOCK !== 0 || rounds.value === 0);

const actions = {
  attack: () => handleAttack(
    rounds,
    ATTACK_MIN,
    ATTACK_MAX,
    HealthEnemy,
    HealthPlayer,
    winner,
    LogsMessage,
    ATTACK_MAX,
    ATTACK_MIN,
  ),

  special_attack: () => handleAttackSpecial(
    rounds,
    SPECIAL_MIN,
    SPECIAL_MAX,
    HealthEnemy,
    HealthPlayer,
    winner,
    LogsMessage,
    AttackEnemyDisabled,
    ATTACK_MAX,
    ATTACK_MIN,
  ),

  medikit: () => handleMediKit(
    rounds,
    MEDIKIT_MIN,
    MEDIKIT_MAX,
    MAX_HEALTH,
    HealthPlayer,
    HealthEnemy,
    winner,
    LogsMessage,
    DisabledMedikit,
    ATTACK_MAX,
    ATTACK_MIN,
  ),

  leave: () => handleLeaveSession(winner),

  new_game: () => handleNewGame(
    HealthPlayer,
    HealthEnemy,
    rounds,
    winner,
    LogsMessage,
    MAX_HEALTH,
    ModalRef
  ),

  close_modal: () => {
     ModalRef.value = false;
     setTimeout(() => {
       actions.new_game();
     }, 1500);
  }
}

watch(winner, (val) => {
  if (val && !ModalRef.value) {
     ModalRef.value = true;
  }
})

const preventFn = (e: BvTriggerableEvent) => {
  if (ModalRef.value) e.preventDefault()
}

</script>

<template>
   <BApp class="app-bt">
    <main class="main-sc">
        <BModal
        v-model="ModalRef"
        @hide="preventFn"
        no-footer
        :title="winner === 'leave' ? 'Terminata Sessione' : 'Fine Partita'"
      >
        <div class="w-auto d-flex">
            <p v-if="winner === 'enemy'">Hai Perso!!</p>
            <p v-else-if="winner === 'player'">Hai Vinto!!</p>
            <p v-else-if="winner === 'leave'">Hai Abbandonato la Partita.</p>
            <p v-else>Parita!!</p>
        </div>
        <div class="w-auto d-flex flex-rown gap-2">
          <BButton variant="secondary" @click="actions.close_modal()">Chiudi</BButton>
          <BButton variant="primary" @click="actions.new_game()">Nuova Partita</BButton>
        </div>
      </BModal>
      
      <GameRounds :rounds="rounds" />
      <div class="container-sc">
        <h2 class="text-success my-2">Benvenuto nella Battaglia!!</h2>

        <section class="section-components">
           <h2 class="text-primary-emphasis">Vita dei Personaggi</h2>
           <ProgressBar :progress1="HealthEnemy" :progress2="HealthPlayer" />
        </section>

        <section class="section-components mt-5">
           <h2 class="text-primary-emphasis">Azioni del Giocatore</h2>
           <ActionPlayer 
            @attack="actions.attack()" 
            @medikit="actions.medikit()" 
            @special-attack="actions.special_attack()"
            @leave-battle="actions.leave()"
            :dis_medikit="DisabledMedikit"
            :dis_attack_special="AttackEnemyDisabled"
            />
        </section>

        <section class="section-components mt-5">
           <BattleLogsList :lenght="LogsMessage.length || 0" :logs="LogsMessage" />
        </section>

      </div>
    </main>
   </BApp>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

:root{
  --font-montserrant: "Montserrat", sans-serif;
  --font-nunito: "Nunito Sans", sans-serif;
  --bg-success: #198754;
}

.main-sc{
  width: 100%;
  height: 100dvh;
  padding-bottom: 6em;
  padding-top: 6em;
  background-color: #f8f9fa;
}

.app-bt{
  width: auto;
  height: auto;
}

.container-sc{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
}

.section-components{
  margin-top: 20px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
}

.color-btns{
   width: auto;
   padding: 3px 4px;
}
</style>
