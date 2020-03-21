import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/requests',
    name: 'requests',
    component: () => import('../views/Requests.vue'),
    children: [
      {
        meta: {
          showModal: true,
        },
        path: ':id',
        component: () => import('../views/ModalRequest.vue'),
      },
    ],
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: () => import('../views/Teachers.vue'),
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/Courses.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
