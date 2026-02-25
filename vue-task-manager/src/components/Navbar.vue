<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import ImgNav from "../assets/pinia-1.svg"
import { BNavbar, BNavbarBrand, BNavbarToggle, BOffcanvas, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from "bootstrap-vue-next"
import AddTaskForm from './AddTaskForm.vue';

const props = defineProps(['CountAll', 'isTimer']);
const { CountAll, isTimer } = toRefs(props);
const router = useRoute();

// Link di Navigazione
const NavLink = [
  { id: 0, title: 'HomePage', link: '/', name: 'homepage' },
  { id: 2, title: 'Task', link: '/task', name: 'task-page' }
]

//${router.name === links.name ? 'btn-success' : 'btn-secondary'}

</script>

<template lang="html">
    <div class="w-auto position-fixed top-0 z-3">
     <BNavbar
          class="navbar-sc"
          variant="success"
          :toggleable="true"
        >
          <BNavbarBrand class="nav-brand-sc">
                <img
                  :src="ImgNav"
                  class="imgs-sc"
                  alt="logo-pinia"
                />
              <p class="text-nav">Pania Store Manager</p>
          </BNavbarBrand>

          <BNavbarToggle target="nav-offcanvas" />
          <BOffcanvas
            id="nav-offcanvas"
            title="Menu Principale"
            placement="end"
            
            is-nav
          >
          <div class="w-100 d-flex flex-column gap-2">
            
            <section class="w-auto d-flex flex-column gap-2 justify-content-center align-items-center">
              <h4 class="text-center text-success fw-bolder">Link di Rotta</h4>
              <RouterLink v-for="(links, index) in NavLink" :key="`$link-${index}`" 
              active-class="btn-success"
              :class="`btn w-50 btn-secondary`" 
              :to="links.link">{{ links.title }}</RouterLink>
            </section>

            <section class="w-auto d-flex flex-column gap-2 justify-content-center align-items-center mt-5">
               <AddTaskForm :count="CountAll" :loading="isTimer" />
            </section>

          </div>
          </BOffcanvas>
        </BNavbar>
    </div>
</template>

<style scoped>
  .navbar.navbar-sc {
    background-color: var(--bg-green);
    padding: .90em;
    width: 100%;
  }

  .navbar.navbar-sc .container-fluid{
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
  }

  .imgs-sc{
    width: 4%;
  }

  ::selection{
    background-color: #2F5941;
    color: #F2F2F2;
  }

  .sc-cont{
    padding-top: 9em;
  }

  .navbar-brand.nav-brand-sc{
    display: flex !important;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    gap: 10px;
    width: 50%;
  }

  .text-nav{
    text-align: left;
    font-weight: 600;
    font-family: 'Lu\cida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: white;
    margin-bottom: 0px;
  }

  .navbar-toggler{
    border: 2px solid #F2F2F2;
  }

  .navbar-toggler .navbar-toggler-icon{
    background-image: none !important;
    display: none !important;
  }
</style>