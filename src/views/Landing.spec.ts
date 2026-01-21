import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Landing from './Landing.vue'

describe('Landing.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(Landing)
  })

  it('renderiza o componente corretamente', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renderiza a hero section', () => {
    const hero = wrapper.find('.hero')
    expect(hero.exists()).toBe(true)
  })

  it('hero section tem altura mínima de 80vh', () => {
    const hero = wrapper.find('.hero')
    expect(hero.classes()).toContain('min-h-[80vh]')
  })

  it('exibe badge de "Professora Descendente"', () => {
    const badge = wrapper.find('.badge-primary')
    expect(badge.text()).toContain('Professora Descendente')
    expect(badge.text()).toContain('⭐')
  })

  it('exibe o título principal com "Tie 先生"', () => {
    const title = wrapper.find('h1')
    expect(title.text()).toContain('Aprenda Japonês')
    expect(title.text()).toContain('Tie 先生')
  })

  it('exibe descrição das aulas', () => {
    const text = wrapper.text()
    expect(text).toContain('Aulas personalizadas')
    expect(text).toContain('online e presenciais')
    expect(text).toContain('conversação e leitura')
  })

  it('destaca "prático e divertido" no texto', () => {
    const description = wrapper.find('.text-primary')
    expect(description.text()).toContain('prático e divertido')
  })

  it('possui botão CTA "Agende uma Aula Grátis"', () => {
    const ctaButton = wrapper.find('.btn-primary')
    expect(ctaButton.text()).toContain('Agende uma Aula Grátis')
    expect(ctaButton.text()).toContain('📅')
  })

  it('possui botão "Ver Planos e Preços"', () => {
    const button = wrapper.find('.btn-outline')
    expect(button.text()).toContain('Ver Planos e Preços')
    expect(button.text()).toContain('📚')
  })

  it('exibe estatística "5+ Anos de Experiência"', () => {
    const text = wrapper.text()
    expect(text).toContain('5+')
    expect(text).toContain('Anos de Experiência')
  })

  it('exibe estatística "100+ Alunos Satisfeitos"', () => {
    const text = wrapper.text()
    expect(text).toContain('100+')
    expect(text).toContain('Alunos Satisfeitos')
  })

  it('exibe estatística "N1 Certificação JLPT"', () => {
    const text = wrapper.text()
    expect(text).toContain('N1')
    expect(text).toContain('Certificação JLPT')
  })

  it('renderiza imagem da professora com avatar circular', () => {
    const avatar = wrapper.find('.avatar')
    expect(avatar.exists()).toBe(true)
    const image = wrapper.find('img')
    expect(image.attributes('alt')).toBe('Tie Sensei')
  })

  it('avatar tem ring decorativo', () => {
    const avatarDiv = wrapper.find('.ring')
    expect(avatarDiv.exists()).toBe(true)
    expect(avatarDiv.classes()).toContain('ring-primary')
  })

  it('possui elementos decorativos japoneses (🌸⛩️)', () => {
    const text = wrapper.text()
    expect(text).toContain('🌸')
    expect(text).toContain('⛩️')
  })

  it('renderiza seção "Por que escolher a Tie 先生?"', () => {
    const heading = wrapper.findAll('h2')
    const hasTitle = heading.some((h: any) => h.text().includes('Por que escolher a Tie 先生?'))
    expect(hasTitle).toBe(true)
  })

  it('exibe card "Aulas Individuais"', () => {
    const text = wrapper.text()
    expect(text).toContain('Aulas Individuais')
    expect(text).toContain('👤')
    expect(text).toContain('Personalizado')
  })

  it('exibe card "Acompanhamento Completo"', () => {
    const text = wrapper.text()
    expect(text).toContain('Acompanhamento Completo')
    expect(text).toContain('📝')
    expect(text).toContain('Suporte Total')
  })

  it('exibe card "Conversação Real"', () => {
    const text = wrapper.text()
    expect(text).toContain('Conversação Real')
    expect(text).toContain('💬')
    expect(text).toContain('Desde o Dia 1')
  })

  it('cards de diferenciais têm efeito hover com translate', () => {
    const cards = wrapper.findAll('.card')
    cards.forEach((card: any) => {
      expect(card.classes()).toContain('hover:-translate-y-2')
      expect(card.classes()).toContain('transition-all')
    })
  })

  it('renderiza seção de chamada para ação final', () => {
    const ctaSection = wrapper.findAll('.alert')
    expect(ctaSection.length).toBeGreaterThan(0)
  })

  it('possui alert de sucesso com ícone de foguete', () => {
    const text = wrapper.text()
    expect(text).toContain('🚀')
    expect(text).toContain('Pronto para começar?')
  })

  it('botão final "Comece Agora" está presente', () => {
    const buttons = wrapper.findAll('.btn-primary')
    const hasStartButton = buttons.some((btn: any) => btn.text().includes('Comece Agora'))
    expect(hasStartButton).toBe(true)
  })

  it('usa gradientes em múltiplas seções', () => {
    const gradients = wrapper.findAll('[class*="bg-gradient"]')
    expect(gradients.length).toBeGreaterThan(3)
  })

  it('layout é responsivo com flex-col em mobile', () => {
    const heroContent = wrapper.find('.hero-content')
    expect(heroContent.classes()).toContain('flex-col')
    expect(heroContent.classes()).toContain('lg:flex-row-reverse')
  })

  it('estatísticas são flexíveis e responsivas', () => {
    const statsContainer = wrapper.find('.flex.gap-8')
    expect(statsContainer.exists()).toBe(true)
  })

  it('grid de cards usa grid-cols-1 em mobile e md:grid-cols-3 em desktop', () => {
    const grid = wrapper.find('.grid')
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-3')
  })
})
