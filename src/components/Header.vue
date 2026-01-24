<template>
  <div class="navbar bg-gradient-to-r from-base-100 via-base-200 to-base-100 shadow-lg backdrop-blur-lg sticky top-0 z-50 border-b border-base-300">
    <!-- Mobile Menu Button -->
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" role="button" class="btn btn-ghost btn-circle lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul
          tabindex="-1"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-64 p-2 shadow-2xl border border-base-300">
          <li v-for="(menu, index) in menus" :key="index">
            <router-link 
              v-if="!menu.submenus" 
              :to="menu.link || '#'"
              class="gap-2"
              active-class="active"
            >
              <span>{{ menu.icon }}</span>
              <span>{{ menu.title }}</span>
            </router-link>
            <details v-else>
              <summary class="gap-2">
                <span>{{ menu.icon }}</span>
                <span>{{ menu.title }}</span>
              </summary>
              <ul class="p-2 bg-base-200 rounded-lg">
                <li v-for="(submenu, subIndex) in menu.submenus" :key="subIndex">
                  <router-link :to="submenu.link" class="gap-2" active-class="active">
                    <span>{{ submenu.icon }}</span>
                    <span>{{ submenu.title }}</span>
                  </router-link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      
      <!-- Logo -->
      <router-link to="/" class="btn btn-ghost text-xl font-bold gap-2 hover:scale-105 transition-transform">
        <span class="text-2xl">🌸</span>
        <span class="hidden sm:inline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Tiensino Japonês
        </span>
        <span class="sm:hidden bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Tiensino
        </span>
      </router-link>
    </div>

    <!-- Desktop Menu -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-2">
        <li v-for="(menu, index) in menus" :key="index">
          <router-link 
            v-if="!menu.submenus" 
            :to="menu.link || '#'"
            class="gap-2 hover:bg-primary/10 hover:text-primary transition-all rounded-lg font-semibold"
            active-class="bg-primary text-primary-content"
          >
            <span class="text-xl">{{ menu.icon }}</span>
            <span>{{ menu.title }}</span>
          </router-link>
          <details v-else>
            <summary class="gap-2 hover:bg-primary/10 hover:text-primary transition-all rounded-lg font-semibold cursor-pointer">
              <span class="text-xl">{{ menu.icon }}</span>
              <span>{{ menu.title }}</span>
            </summary>
            <ul class="p-2 bg-base-100 rounded-box w-52 shadow-xl border border-base-300 z-50">
              <li v-for="(submenu, subIndex) in menu.submenus" :key="subIndex">
                <router-link 
                  :to="submenu.link" 
                  class="gap-2 hover:bg-primary/10 hover:text-primary transition-all"
                  active-class="bg-primary text-primary-content"
                >
                  <span class="text-lg">{{ submenu.icon }}</span>
                  <span>{{ submenu.title }}</span>
                </router-link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>

    <!-- Call to Action -->
    <div class="navbar-end gap-2">
      <!-- Theme Toggle -->
      <label class="swap swap-rotate btn btn-ghost btn-circle">
        <input type="checkbox" class="theme-controller" value="dark" />
        <svg class="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
        </svg>
        <svg class="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
        </svg>
      </label>

      <!-- CTA Button -->
      <a href="#contato" class="btn btn-primary gap-2 shadow-lg hover:shadow-xl transition-all hidden sm:flex">
        <span>📅</span>
        <span>Aulas Particulares</span>
      </a>
      <a href="#contato" class="btn btn-primary btn-circle sm:hidden shadow-lg">
        <span>📅</span>
      </a>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { RouterLink } from 'vue-router'

const menus = [
  {
    title: 'Início',
    icon: '🏠',
    link: '/',
  },
  {
    title: 'Lista de Kanjis',
    icon: '📚',
    submenus: [
      { title: 'Kanjis N5', icon: '📖', link: '/jlpt-n5' },
    ]
  },
  {
    title: 'Flashcards',
    icon: '🎴',
    submenus: [
      { title: 'Praticar N5', icon: '✨', link: '/flashcards-n5' }
    ],
  },
  {
    title: 'Vocabulários',
    icon: 'あ',
    submenus: [
      { title: 'Vocabulário N5', icon: '📝', link: '/vocabulario-n5' }
    ]
  },
  {
    title: 'Buscar Kanjis',
    icon: '🔍',
    submenus: [
      { title: 'Kanjis por grade', icon: '📝', link: '/grades' },
      { title: 'Kanjis por leitura', icon: '📝', link: '/romaji-ou-kana' },
      { title: 'Kanjis de Nomes', icon: '📝', link: '/kanjis-de-nomes' },
      { title: 'Kanjis Essenciais', icon: '📝', link: '/kanjis-essenciais' },
      { title: 'Palavras com Kanji', icon: '📝', link: '/palavras-com-kanji' }
    ]
  }
]
</script>

<style scoped>
/* Animação suave para o logo */
.navbar-start a:hover span:first-child {
  animation: rotate 0.6s ease-in-out;
}

@keyframes rotate {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(15deg);
  }
}

/* Efeito de hover no menu */
.menu li > * {
  transition: all 0.3s ease;
}

/* Estilo para o active link */
.router-link-active {
  font-weight: 600;
}

/* Animação do dropdown */
details summary {
  list-style: none;
}

details summary::-webkit-details-marker {
  display: none;
}

details[open] summary {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

details[open] > ul {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efeito gradient no texto do logo */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Backdrop blur para o header sticky */
.backdrop-blur-lg {
  backdrop-filter: blur(12px);
}
</style>