import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/Layout.vue'),
      children: [
        {
          path: '',
          name: 'Landing',
          component: () => import('@/views/Landing.vue'),
          meta: {
            breadcrumb: [
              { name: 'Home', path: '/' }
            ]
          }
        }
        ,
        {
          path: 'flashcards-n5',
          name: 'Flashcards',
          component: () => import('@/views/FlashcardsN5.vue'),
          meta: { 
            breadcrumb: [
              { name: 'Home', path: '/' },
              { name: 'Flashcards', path: '/flashcards-n5' }
            ] 
        }
        }
      ]
    },
  ],
})

export default router
