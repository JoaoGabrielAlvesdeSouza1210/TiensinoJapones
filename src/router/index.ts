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
        },
        {
          path: 'jlpt-n5',
          name: 'JLPTN5',
          component: () => import('@/views/JLPTN5.vue'),
          meta: {
            breadcrumb: [
              { name: 'Home', path: '/' },
              { name: 'JLPT N5', path: '/jlpt-n5' }
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
        },
        {
          path: 'vocabulario-n5',
          name: 'Vocabulário N5',
          component: () => import('@/views/VocabularyN5.vue'),
          meta: {
            breadcrumb: [
              { name: 'Home', path: '/' },
              { name: 'Vocabulário N5', path: '/vocabulario-n5' }
            ]
          }
        }
      ]
    },
  ],
})

export default router
