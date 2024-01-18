import { createRouter, createWebHistory } from "vue-router";
import ApartmentDetail from './components/pages/ApartmentDetail.vue';
import Home from './components/pages/Home.vue';
import AdvancedSearch from './components/pages/AdvancedSearch.vue';
import Error404 from './components/pages/Error404.vue';
 

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: '/dettaglio-appartamento/:slug',
      name: 'ApartmenDetail',
      component: ApartmentDetail
    },
    {
      path: "/ricerca-avanzata",
      name: "AdvancedSearch",
      component: AdvancedSearch
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error404",
      component: Error404
    }
  ]
});

export { router };
