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
        },
        {
          path: 'grades',
          name: 'Grades',
          component: () => import('@/views/KanjiByGrade.vue'),
          meta: {
            breadcrumb: [
              { name: 'Home', path: '/' },
              { name: 'Grades', path: '/grades' }
            ]
          }
        },
        {
          path: 'romaji-ou-kana',
          name: 'Achar Por Leitura',
          component: () => import('@/views/KanjiByReading.vue'),
          meta: {
            breadcrumb: [
              { name: 'Home', path: '/' },
              { name: 'Achar Por Leitura', path: '/romaji-ou-kana' }
            ]
          }
        },
        {
          path: 'kanjis-de-nomes',
          name: 'Kanjis de Nomes',
          component: () => import('@/views/KanjiJinmeiyo.vue'),
          meta: {
            breadcrumb: [
              { name: 'Home', path: '/' },
              { name: 'Kanjis de Nomes', path: '/kanjis-de-nomes' }
            ]
          }
        },
        {
          path: 'kanjis-essenciais',
          name: 'Kanjis Essenciais',
          component: () => import('@/views/KanjiJoyo.vue'),
          meta: {
            breadcrumb: [
              { name: 'Home', path: '/' },
              { name: 'Kanjis Essenciais', path: '/kanjis-essenciais' }
            ]
          }
        },
        {
          path: 'palavras-com-kanji',
          name: 'Palavras com Kanji',
          component: () => import('@/views/WordsByKanji.vue'),
          meta: {
            breadcrumb: [
              { name: 'Home', path: '/' },
              { name: 'Palavras com Kanji', path: '/palavras-com-kanji' }
            ]
          }
        }
      ]
    },
  ],
})

export default router
