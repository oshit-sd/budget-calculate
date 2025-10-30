import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@views/Dashboard.vue'),
  },
  {
    path: '/budget-calculator',
    name: 'budget-calculator',
    meta: { title: 'Budget Calculator' },
    component: () => import('@views/BudgetCalculator.vue'),
  },
  {
    path: '/reports',
    name: 'reports',
    meta: { title: 'Reports' },
    component: () => import('@views/Reports.vue'),
  },
  {
    path: '/faq',
    name: 'faq',
    meta: { title: 'Frequently Asked Questions' },
    component: () => import('@views/Faq.vue'),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@views/errors/404.vue"),
  },
]

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
      behavior: "instant",
    };
  },
});

export default router
