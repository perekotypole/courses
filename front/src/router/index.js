import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/groups/Home.vue'),
    children: [
      {
        meta: {
          showModal: true,
        },
        path: 'group/add',
        component: () => import('../views/groups/ModalGroupAdd.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: '/group/success',
        component: () => import('../views/ModalSuccess.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: '/group/error',
        component: () => import('../views/ModalError.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: 'group/update/:id',
        component: () => import('../views/groups/ModalGroupUpdate.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: 'group/:id',
        component: () => import('../views/groups/ModalGroup.vue'),
      },

    ],
  },
  {
    path: '/requests',
    name: 'requests',
    component: () => import('../views/requests/Requests.vue'),
    children: [
      {
        meta: {
          showModal: true,
        },
        path: 'success',
        component: () => import('../views/ModalSuccess.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: 'error',
        component: () => import('../views/ModalError.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: ':id',
        component: () => import('../views/requests/ModalRequest.vue'),
      },
    ],
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: () => import('../views/teachers/Teachers.vue'),
    children: [
      {
        meta: {
          showModal: true,
        },
        path: 'add',
        component: () => import('../views/teachers/ModalTeacherAdd.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: 'success',
        component: () => import('../views/ModalSuccess.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: 'error',
        component: () => import('../views/ModalError.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: 'update/:id',
        component: () => import('../views/teachers/ModalTeacherUpdate.vue'),
      },
    ],
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/courses/Courses.vue'),
    children: [
      {
        meta: {
          showModal: true,
        },
        path: 'add',
        component: () => import('../views/courses/ModalCourseAdd.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: 'success',
        component: () => import('../views/ModalSuccess.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: 'error',
        component: () => import('../views/ModalError.vue'),
      },
      {
        meta: {
          showModal: true,
        },
        path: 'update/:id',
        component: () => import('../views/courses/ModalCourseUpdate.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
