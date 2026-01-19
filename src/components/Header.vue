<template>
  <div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        Tiensino Japonês
      </div>
      <ul
        tabindex="-1"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li v-for="(menu, index) in menus" :key="index">
            <router-link :to="menu.link || '#'">{{ menu.title }}</router-link>
            <ul class="p-2">
                <router-link v-for="(submenu, index) in menu.submenus" :key="index" :to="submenu.link">
                    {{ submenu.title }}
                </router-link>
            </ul>
        </li>
      </ul>
    </div>
    <a class="btn btn-ghost text-xl">Tiensino Japonês</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul
        class="menu menu-horizontal px-1">
        <li v-for="(menu, index) in menus" :key="index">
            <router-link v-if="!menu.submenus" :to="menu.link || '#'">{{ menu.title }}</router-link>
            <details v-else>
                <summary> {{ menu.title }} </summary>
                <ul class="p-2 bg-base-100 w-40 z-1">
                    <router-link v-for="(submenu, index) in menu.submenus" :key="index" :to="submenu.link">
                        {{ submenu.title }}
                    </router-link>
                </ul>
            </details>
        </li>
      </ul>
  </div>
  <div class="navbar-end">
    <a class="btn">Aulas Particulares</a>
  </div>
</div>
</template>

<script setup lang='ts'>
import { RouterLink } from 'vue-router'

const menus = [
  {
    title: 'Página Inicial',
    link: '/',
  },
  {
    title: '（感じ）Kanjis',
    submenus: [
      { title: 'JLPT N5', link: '/flashcards-n5' }
    ],
  },
]

</script>