<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { BButton } from "bootstrap-vue-next"

const emit = defineEmits([
    'attack',
    'medikit',
    'special-attack',
    'leave-battle'
]);

const props = defineProps({ 
    dis_medikit: { type: Boolean, required: true, default: true },
    dis_attack_special: { type: Boolean, required: true, default: true } 
});

const { 
    dis_medikit: isDisabledMediKit, 
    dis_attack_special: isDisabledSpecial
} = toRefs(props)

</script>

<template>
    <div class="box-btn flex-xl-row flex-xxl-row flex-sm-column">
        <section class="d-flex p-2 flex-sm-column gap-2">
            <BButton variant="primary" class="fw-bold p-2" @click="emit('attack')">Attaco</BButton>
            <BButton variant="info" :disabled="isDisabledMediKit" class="fw-bold p-2"  @click="emit('medikit')">MediKit</BButton>
        </section>
        <section class="d-flex p-2 flex-sm-column gap-2">
            <BButton variant="warning" class="fw-bold p-2" :disabled="isDisabledSpecial"  @click="emit('special-attack')">Speciale Attaco</BButton>
            <BButton variant="danger" class="fw-bold p-2"  @click="emit('leave-battle')">Arresa</BButton>
        </section>
    </div>
</template>

<style scoped>
  .box-btn{
    width: auto;
    height: auto;
    padding: 2px 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

</style>