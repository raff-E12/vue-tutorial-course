<script setup lang="ts">
import { BApp, BNavbar, BButton } from "bootstrap-vue-next"
import { ref } from "vue";

const props = defineProps({
  title: { type: String, required: true }, 
  text: { 
   type: String, 
   required: true,
   validator(value, props) {
      // Uso del Validatore per seguenti valori di props
      return ['Clicca qui!!', 'Clicca', 'Aumenta'].includes(value)
    } 
  },
  count: { type: Number, required: true },
  show: Boolean
});

const emits = defineEmits(['click-count']);

// Con uso della funzione setup() senza la funzione di
// "setup" in script

// export default {
   // props: [ 'title', 'text', 'count', 'show'],
   // emits: ['click-count'],
   // setup(props, ctx){
      // const HandleClick = () => {
         // console.log("click bottone")
         // ctx.emit('click-count')
      // }

      // return {
         // HandleClick
      // }
   // }
//}

</script>

<template>
   <main class="count-sc shadow" v-if="show">
      <div class="display-count-sc">
         <h3>{{ props.title }}</h3>
         <p class="count-num">{{ count }}</p>
      </div>
      <div class="cotainer-btns">
         <BButton @click="emits('click-count')">{{ props.text }}</BButton>
      </div>
   </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Quicksand:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

:root{
  --font-montserrant: "Montserrat", sans-serif;
  --font-nunito: "Nunito Sans", sans-serif;
  --bg-success: #198754;
}

 .count-sc{
   width: 400px;
   background: #c8c8c8;
   border-radius: 20px;
   padding: 16px 17px;
   text-align: center;
   color: #fff;
   margin-top: 1em;
 }

 .count-num{
    background: #6c6c6c;
    width: 60px;
    padding: 12px;
    border-radius: 12px;
    font-family: monospace;
    text-align: center;
    font-weight: 800;
 }

 .display-count-sc{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
 }
</style>
