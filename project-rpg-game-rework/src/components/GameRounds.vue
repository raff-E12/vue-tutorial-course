<script setup lang="ts">
import { computed, ref } from 'vue';
import { BApp, BNavbar, BButton, BFormRadioGroup, BNavText, BCollapse } from "bootstrap-vue-next"

const props = defineProps({
    rounds: {
        type: Number,
        required: true,
        default: 0
    }
})

</script>

<template>
     <BNavbar
         class="navbar"
         fixed="top"
        >
          <BNavbarBrand
            tag="h1"
            class="navbrand-sc"
            >RPG <b class="text-success">Game</b>
            </BNavbarBrand>

              <BCollapse
                is-nav
                id="nav-text-sc"
                class="w-auto"
            >
                <BNavbarNav class="list-text w-100">
                    <BNavText class="d-flex justify-content-center w-100">
                        <b class="font-bold text-white font-sans-serif m-0 d-block w-auto">Game | {{ props.rounds }}</b>
                    </BNavText>
                </BNavbarNav>
            </BCollapse>

      </BNavbar>
</template>

<style scoped>
  .box-selection{
    width: auto;
    height: auto;
    padding: 2px 2px;
    display: flex;
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

#nav-text-sc .list-text{
    list-style: none !important;
}
</style>