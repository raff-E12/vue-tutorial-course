<script setup lang="ts">
import { BButton } from 'bootstrap-vue-next';
import { useRouter } from 'vue-router';

const route = useRouter();
</script>

<template>
    <div class="main-sc-404">
        <section class="card w-100 d-flex p-4">
            <div class="card-body w-auto d-flex flex-column justify-content-center align-items-center gap-4">
                <h2 class="w-auto text-center text-uppercase text-success fs-2 mb-2">Pagina non trovata!!</h2>
                <BButton variant="success" class="w-25" @click="() => route.go(-1)">Torna in DashBoard</BButton>
            </div>
        </section>
    </div>
</template>

<style scoped>

:root{
  --bg-green: #2F5941;
  --bg-green-1: #119500;
  --bg-white: #F2F2F2;
}

.main-sc-404{
  padding-bottom: 50px;
  padding-top: 120px;
  height: auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

</style>