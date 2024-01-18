import { createRouter, createWebHistory } from "vue-router";
import ApartmentDetail from './components/pages/ApartmentDetail.vue';
 

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/dettaglio-appartamento',
      name: 'ApartmenDetail',
      component: ApartmentDetail
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error404",
      component: Error404
    }
  ]
});

export { router };
