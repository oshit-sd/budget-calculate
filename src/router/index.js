import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@views/Dashboard.vue'),
  },
  {
    path: '/budget-calculate',
    name: 'budgetCalculate',
    meta: { title: 'Budget Calculate' },
    component: () => import('@views/budget/Index.vue'),
  },
  {
    path: '/budget-calculate/create',
    name: 'budgetCalculate.create',
    component: () => import('@views/budget/Create.vue'),
  },
  {
    path: '/templates',
    name: 'templates',
    meta: { title: 'Templates' },
    component: () => import('@views/template/Index.vue'),
  },
  {
    path: '/templates/create',
    name: 'templates.create',
    meta: { title: 'Templates' },
    component: () => import('@views/template/Create.vue'),
  },
  {
    path: '/heads',
    name: 'heads',
    meta: { title: 'Heads' },
    component: () => import('@views/heads/Index.vue'),
  },
  {
    path: '/heads/create',
    name: 'heads.create',
    meta: { title: 'Heads' },
    component: () => import('@views/heads/Create.vue'),
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
