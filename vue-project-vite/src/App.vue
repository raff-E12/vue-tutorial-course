<script setup lang="ts">
import { BApp, BNavbar, BButton, BFormRadioGroup } from "bootstrap-vue-next"
import CountsTable from "./components/CountsTable.vue";
import { computed, ref, watch, watchEffect } from "vue";
import CardUser from "./components/CardUser.vue";
import BoxColorChange from "./components/BoxColorChange.vue";
import SelectionA from "./assets/SelectionA.vue";
import SelectionB from "./assets/SelectionB.vue";
import SelectionC from "./assets/SelectionC.vue";

const isShow = ref(false);
const count = ref(0);
const isSelectionChange = computed(() => {
  return isSelected.value === 'SelectionA' ? SelectionA : isSelected.value === 'SelectionC' ? SelectionB : SelectionC;
})

const HandleCountAdd = () => {
   count.value++;
}

const HandleShowCount = () => {
  isShow.value = !isShow.value;
}

const isSelected = ref("");
const options = [
  {text: 'Red', value: 'SelectionA'},
  {text: 'Blue', value: 'SelectionB'},
  {text: 'Yellow', value: 'SelectionC'},
];

watchEffect(() => { console.log(isSelected.value) });

</script>

<template>
   <BApp class="app-bt">
    <main class="main-sc">
     <BNavbar
         class="navbar"
         fixed="top"
        >
          <BNavbarBrand
            tag="h1"
            class="navbrand-sc"
            >Vue <b class="text-success">CLI</b>
            </BNavbarBrand>
      </BNavbar>

      <div class="container-sc">
        <h2>Benvenuto in Vue.js</h2>

        <section class="section-components">
          <BButton variant="success" @click="HandleShowCount">Mostra Contatore</BButton>
           <CountsTable title="Contatore A" text="Clicca qui!!" v-on:click-count="HandleCountAdd" :count="count" :show="isShow" />
        </section>

        <section class="section-components">
          <CardUser :title="'Mario Rossi'" :subtitle="'Dettaglio Utente'">
            <template #text-message>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Phasellus iaculis quis nisl ac venenatis. Cras eleifend erat leo. Pellentesque ligula quam, suscipit ac pharetra a, auctor ut ipsum.
            </template>
          </CardUser>
        </section>

        <section class="section-components">
            <div class="color-btns">
                 <BFormRadioGroup
                  v-model="isSelected"
                  :options="options"
                  button-variant="primary"
                  name="radios-btn-default"
                  buttons
                />
            </div>
            <div class="w-auto h-auto mt-4">
              <!-- Uso di Componets -->
              <component :is="isSelectionChange"></component>
            </div>
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
  height: auto;
  padding-bottom: 6em;
  padding-top: 6em;
  background-color: #f8f9fa;
}

.app-bt{
  width: auto;
  height: auto;
}

.navbar{
  background-color: #004a28;
  padding: 16px;
  border-bottom: 5px solid #198754;
}

.navbar .navbrand-sc{
  font-family: var(--font-montserrant);
  color: #ffff;
  font-size: 1.13em;
  font-weight: 700;
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
