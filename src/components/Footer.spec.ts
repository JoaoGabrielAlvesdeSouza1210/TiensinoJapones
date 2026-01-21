import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from './Footer.vue'

describe('Footer.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(Footer)
  })

  it('renderiza o componente corretamente', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o emoji de flor de cerejeira 🌸', () => {
    const text = wrapper.text()
    expect(text).toContain('🌸')
  })

  it('exibe o nome "Tiensino Japonês"', () => {
    expect(wrapper.text()).toContain('Tiensino Japonês')
  })

  it('exibe texto em japonês', () => {
    expect(wrapper.text()).toContain('日本語を学びましょう')
  })

  it('exibe o slogan "Ensino de japonês de forma descomplicada"', () => {
    expect(wrapper.text()).toContain('Ensino de japonês de forma')
    expect(wrapper.text()).toContain('descomplicada')
  })

  it('exibe badge de certificação JLPT N1', () => {
    const badge = wrapper.find('.badge-primary')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toContain('Professora Certificada JLPT N1')
    expect(badge.text()).toContain('⭐')
  })

  it('renderiza seção de navegação', () => {
    const text = wrapper.text()
    expect(text).toContain('Navegação')
    expect(text).toContain('📚')
  })

  it('possui link para Página Inicial', () => {
    expect(wrapper.text()).toContain('Página Inicial')
    expect(wrapper.text()).toContain('🏠')
  })

  it('possui link para Kanjis N5', () => {
    expect(wrapper.text()).toContain('Kanjis N5')
    expect(wrapper.text()).toContain('📖')
  })

  it('possui link para Flashcards N5', () => {
    expect(wrapper.text()).toContain('Flashcards N5')
    expect(wrapper.text()).toContain('🎴')
  })

  it('renderiza seção de contato', () => {
    const text = wrapper.text()
    expect(text).toContain('Contato')
    expect(text).toContain('📞')
  })

  it('possui link de e-mail', () => {
    const emailLink = wrapper.find('a[href^="mailto:"]')
    expect(emailLink.exists()).toBe(true)
    expect(wrapper.text()).toContain('E-mail')
    expect(wrapper.text()).toContain('✉️')
  })

  it('possui link de WhatsApp', () => {
    const whatsappLink = wrapper.find('a[href^="https://wa.me/"]')
    expect(whatsappLink.exists()).toBe(true)
    expect(wrapper.text()).toContain('WhatsApp')
    expect(wrapper.text()).toContain('📱')
  })

  it('menciona Aulas Online', () => {
    expect(wrapper.text()).toContain('Aulas Online')
    expect(wrapper.text()).toContain('📍')
  })

  it('renderiza seção de redes sociais', () => {
    const text = wrapper.text()
    expect(text).toContain('Redes Sociais')
    expect(text).toContain('🌐')
  })

  it('possui ícones de redes sociais (Twitter, YouTube, Facebook, Instagram)', () => {
    const socialButtons = wrapper.findAll('.btn-circle')
    expect(socialButtons.length).toBe(4)
  })

  it('botões de redes sociais têm classes hover', () => {
    const socialButtons = wrapper.findAll('.btn-circle')
    socialButtons.forEach((button: any) => {
      expect(button.classes()).toContain('hover:bg-primary/20')
      expect(button.classes()).toContain('hover:text-primary')
    })
  })

  it('exibe ano atual no copyright', () => {
    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(currentYear.toString())
  })

  it('exibe texto de copyright', () => {
    expect(wrapper.text()).toContain('©')
    expect(wrapper.text()).toContain('Todos os direitos reservados')
  })

  it('possui link para Política de Privacidade', () => {
    expect(wrapper.text()).toContain('Política de Privacidade')
  })

  it('possui link para Termos de Uso', () => {
    expect(wrapper.text()).toContain('Termos de Uso')
  })

  it('tem elementos decorativos japoneses no fundo', () => {
    const decorativeElements = wrapper.findAll('.absolute.opacity-5')
    expect(decorativeElements.length).toBeGreaterThan(0)
  })

  it('usa gradiente no fundo', () => {
    const footer = wrapper.find('.bg-gradient-to-br')
    expect(footer.exists()).toBe(true)
  })

  it('possui linha decorativa colorida no final', () => {
    const decorativeLine = wrapper.find('.bg-gradient-to-r.from-primary.via-secondary.to-accent')
    expect(decorativeLine.exists()).toBe(true)
  })

  it('links têm efeito hover', () => {
    const links = wrapper.findAll('.link-hover')
    links.forEach((link: any) => {
      expect(link.classes()).toContain('transition-colors')
    })
  })

  it('footer tem overflow hidden', () => {
    const footer = wrapper.find('footer')
    expect(footer.classes()).toContain('overflow-hidden')
  })

  it('footer está posicionado relativamente', () => {
    const footer = wrapper.find('footer')
    expect(footer.classes()).toContain('relative')
  })

  it('possui títulos de seção estilizados', () => {
    const footerTitles = wrapper.findAll('.footer-title')
    expect(footerTitles.length).toBeGreaterThan(0)
  })

  it('conteúdo principal tem z-index adequado', () => {
    const mainContent = wrapper.findAll('.relative.z-10')
    expect(mainContent.length).toBeGreaterThan(0)
  })
})
