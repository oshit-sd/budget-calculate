import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@views/Dashboard.vue'),
  },
  {
    path: '/budget-calculate',
    name: 'budget-calculate',
    component: () => import('@views/BudgetCalculator.vue'),
  },
  {
    path: '/heads',
    name: 'heads',
    meta: { title: 'Head Templates' },
    component: () => import('@views/Heads.vue'),
  },
  {
    path: '/departments',
    name: 'departments',
    meta: { title: 'Departments' },
    component: () => import('@views/Departments.vue'),
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
