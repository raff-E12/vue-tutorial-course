<script setup lang="ts">
import { computed, ref } from 'vue';
import BoxColorChange from '../components/BoxColorChange.vue';

const color = ref('red');

const isFormat = computed(() => {
   if (color.value === 'red') {
      return { color: '#F21847', title: 'Color Red', message: 'Ho Selezionato il colore Rosso'}
   }  if (color.value === 'blue') {
      return { color: '#2E40A6', title: 'Color Blue', message: 'Ho Selezionato il colore Blue'}
   }  if (color.value === 'yellow') {
      return { color: '#F2D64B', title: 'Color Yellow', message: 'Ho Selezionato il colore Giallo'}
   } else {
      return { color: '#F0F0F2', title: 'Color Gray', message: 'Il Colore non è Stato Selezionato'}
   }
});      
</script>

<template>
    <div class="box-selection">
        <BoxColorChange :title="isFormat.title" :text="isFormat.message" :color="isFormat.color" />
    </div>
</template>

<style scoped>
  .box-selection{
    width: auto;
    height: auto;
    padding: 2px 2px;
    display: flex;
  }
</style>