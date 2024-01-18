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
    // // Otros routes pueden ir aquí
    // // {
    // //   path: "/:pathMatch(.*)*",
    // //   name: "error404",
    // //   component: Error404
    // }
  ]
});

export { router };
