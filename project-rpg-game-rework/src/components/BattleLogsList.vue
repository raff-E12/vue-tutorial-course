<script setup lang="ts">
import { computed, ref, toRef, toRefs } from 'vue';

const props = defineProps({
    lenght: {
        type: Number,
        default: 0
    },
    logs: {
        type: Array,
        default: []
    }
});

// 
const { lenght: IsLength, logs: isLogsList } = toRefs(props);

</script>

<template>
    <div class="box-logs flex-xl-row flex-xxl-row flex-sm-column">
        <section class="container-sm shadow p-3 mb-5 bg-body-tertiary rounded text-center">
            <h2 class="fw-bolder mb-3">Battle Log | ({{ IsLength }})</h2>
            <ul class="list-group">
                <!-- Logs -->
                <li class="list-group-item text-start" v-for="(logs, index) in isLogsList" :key="`logs-${index}`">
                    <span class="w-full d-flex flex-row justify-content align-items-center gap-2">
                        <b class="fw-bold">{{ index }}:</b>
                        <span class="badge text-bg-primary" v-if="logs.actionBy === 'player' || logs.actionBy === 'enemy'">{{ logs.actionBy === 'player' ? 'Player' : 'Enemy' }}</span>
                        <b v-if="logs.actionType === 'medikit'" class="fw-light">usa medikit con <span class="badge text-bg-secondary">{{ logs.actionValue + ' punti' }}</span></b>
                        <b v-else class="fw-light">attacca con <span class="badge text-bg-secondary">{{ logs.actionValue + ' punti' }}</span></b>
                    </span>
                </li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
  .box-logs{
    width: auto;
    height: auto;
    padding: 2px 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

</style>