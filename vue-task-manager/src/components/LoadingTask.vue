<script setup lang="ts">
 import { BSpinner } from 'bootstrap-vue-next';
</script>

<template>
    <div class="main-load-sc">
        <div class="card w-25">
            <div class="card-body ">
                <section class="container-loading">
                    <p class="m-0 fw-bolder fs-5 text-success">Caricamento</p>
                    <BSpinner
                    label="Spinning"
                    variant="success"
                    class="mx-1"
                    />
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped>

.main-load-sc{
    margin-top: 3px;
    width: 100%;
    height: 60px;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

}

.container-loading{
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 2%;
}
</style>