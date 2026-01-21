import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import Header from './Header.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/jlpt-n5', name: 'jlpt-n5', component: { template: '<div>JLPT N5</div>' } },
    { path: '/flashcards-n5', name: 'flashcards', component: { template: '<div>Flashcards</div>' } }
  ]
})

describe('Header.vue', () => {
  let wrapper: any

  beforeEach(async () => {
    router.push('/')
    await router.isReady()
    
    wrapper = mount(Header, {
      global: {
        plugins: [router]
      }
    })
  })

  it('renderiza o componente corretamente', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o logo com emoji de flor de cerejeira', () => {
    const logo = wrapper.find('.text-2xl')
    expect(logo.text()).toContain('🌸')
  })

  it('exibe o nome "Tiensino Japonês" no desktop', () => {
    const brandName = wrapper.find('.hidden.sm\\:inline')
    expect(brandName.text()).toBe('Tiensino Japonês')
  })

  it('exibe versão reduzida "Tiensino" no mobile', () => {
    const brandNameMobile = wrapper.find('.sm\\:hidden')
    expect(brandNameMobile.text()).toBe('Tiensino')
  })

  it('renderiza todos os itens do menu', () => {
    const menuItems = wrapper.findAll('.menu li')
    expect(menuItems.length).toBeGreaterThan(0)
  })

  it('renderiza o menu "Início" com ícone correto', () => {
    const homeLink = wrapper.find('a[href="/"]')
    expect(homeLink.text()).toContain('🏠')
    expect(homeLink.text()).toContain('Início')
  })

  it('renderiza o submenu JLPT', () => {
    const jlptMenu = wrapper.findAll('details')
    const jlptText = jlptMenu.some((detail: any) => detail.text().includes('JLPT'))
    expect(jlptText).toBe(true)
  })

  it('renderiza o submenu Flashcards', () => {
    const flashcardsMenu = wrapper.findAll('details')
    const flashcardsText = flashcardsMenu.some((detail: any) => detail.text().includes('Flashcards'))
    expect(flashcardsText).toBe(true)
  })

  it('renderiza o botão de toggle de tema', () => {
    const themeToggle = wrapper.find('.theme-controller')
    expect(themeToggle.exists()).toBe(true)
  })

  it('tema toggle tem valor "dark"', () => {
    const themeToggle = wrapper.find('.theme-controller')
    expect(themeToggle.attributes('value')).toBe('dark')
  })

  it('renderiza o botão CTA "Aulas Particulares" no desktop', () => {
    const ctaButton = wrapper.find('.btn-primary')
    expect(ctaButton.text()).toContain('Aulas Particulares')
    expect(ctaButton.text()).toContain('📅')
  })

  it('renderiza o botão CTA circular no mobile', () => {
    const ctaMobile = wrapper.find('.btn-circle')
    expect(ctaMobile.exists()).toBe(true)
    expect(ctaMobile.text()).toContain('📅')
  })

  it('navbar tem classe sticky e z-50', () => {
    const navbar = wrapper.find('.navbar')
    expect(navbar.classes()).toContain('sticky')
    expect(navbar.classes()).toContain('z-50')
  })

  it('navbar tem gradiente e backdrop blur', () => {
    const navbar = wrapper.find('.navbar')
    expect(navbar.classes()).toContain('bg-gradient-to-r')
    expect(navbar.classes()).toContain('backdrop-blur-lg')
  })

  it('menu mobile está oculto em telas grandes', () => {
    const mobileMenu = wrapper.find('.btn-ghost.btn-circle.lg\\:hidden')
    expect(mobileMenu.exists()).toBe(true)
  })

  it('menu desktop está oculto em telas pequenas', () => {
    const desktopMenu = wrapper.find('.navbar-center.hidden.lg\\:flex')
    expect(desktopMenu.exists()).toBe(true)
  })

  it('links do menu usam RouterLink', () => {
    const routerLinks = wrapper.findAllComponents({ name: 'RouterLink' })
    expect(routerLinks.length).toBeGreaterThan(0)
  })

  it('submenu contém link para Kanjis N5', () => {
    const text = wrapper.text()
    expect(text).toContain('Kanjis N5')
  })

  it('submenu contém link para Praticar N5', () => {
    const text = wrapper.text()
    expect(text).toContain('Praticar N5')
  })

  it('botões CTA têm href para #contato', () => {
    const ctaButtons = wrapper.findAll('a[href="#contato"]')
    expect(ctaButtons.length).toBeGreaterThan(0)
  })

  it('ícones SVG para tema claro e escuro estão presentes', () => {
    const svgs = wrapper.findAll('svg')
    expect(svgs.length).toBeGreaterThan(2) // Pelo menos 3 SVGs (menu, sol, lua)
  })

  it('menu tem espaçamento adequado', () => {
    const menu = wrapper.find('.menu-horizontal')
    expect(menu.classes()).toContain('gap-2')
  })
})
