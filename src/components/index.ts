import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export const Header = defineAsyncComponent({
  loader: () => import('./Header.vue'),
  hydrate: hydrateOnVisible(),
})

export const Footer = defineAsyncComponent({
  loader: () => import('./Footer.vue'),
  hydrate: hydrateOnVisible(),
})