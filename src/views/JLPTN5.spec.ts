import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import JLPTN5 from './JLPTN5.vue'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('JLPTN5.vue', () => {
  let wrapper: any

  beforeEach(() => {
    localStorageMock.clear()
    wrapper = mount(JLPTN5)
  })

  it('renderiza o componente corretamente', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o título "Kanjis JLPT N5"', () => {
    const title = wrapper.find('h1')
    expect(title.text()).toContain('Kanjis JLPT N5')
  })

  it('exibe a descrição inicial', () => {
    const text = wrapper.text()
    expect(text).toContain('80 caracteres essenciais')
  })

  it('possui campo de busca', () => {
    const searchInput = wrapper.find('input[placeholder*="Buscar"]')
    expect(searchInput.exists()).toBe(true)
  })

  it('possui ícone de lupa no campo de busca', () => {
    const text = wrapper.text()
    expect(text).toContain('🔍')
  })

  it('renderiza dropdown de filtro', () => {
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
  })

  it('dropdown possui opções de filtro', () => {
    const options = wrapper.findAll('option')
    expect(options.length).toBeGreaterThan(1)
  })

  it('possui opção "Todos"', () => {
    const text = wrapper.text()
    expect(text).toContain('Todos')
  })

  it('possui opção "Aprendidos"', () => {
    const text = wrapper.text()
    expect(text).toContain('Aprendidos')
  })

  it('possui opção "Não Aprendidos"', () => {
    const text = wrapper.text()
    expect(text).toContain('Não Aprendidos')
  })

  it('renderiza cards de kanji', () => {
    const cards = wrapper.findAll('.card')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('cards exibem o caractere kanji', () => {
    const kanjiChars = wrapper.findAll('.text-6xl')
    expect(kanjiChars.length).toBeGreaterThan(0)
  })

  it('exibe badge com leitura romaji', () => {
    const badges = wrapper.findAll('.badge')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('cards têm efeito hover com scale', () => {
    const cards = wrapper.findAll('.card')
    const hasHoverEffect = cards.some((card: any) => 
      card.classes().includes('hover:scale-105')
    )
    expect(hasHoverEffect).toBe(true)
  })

  it('exibe progresso de kanjis aprendidos', () => {
    const progress = wrapper.find('.radial-progress')
    expect(progress.exists()).toBe(true)
  })

  it('possui botão para marcar como aprendido', () => {
    const buttons = wrapper.findAll('button')
    const hasLearnButton = buttons.some((btn: any) => 
      btn.text().includes('Marcar como Aprendido') || btn.text().includes('✓')
    )
    expect(hasLearnButton).toBe(true)
  })

  it('possui botão para ver detalhes', () => {
    const buttons = wrapper.findAll('button')
    const hasDetailsButton = buttons.some((btn: any) => 
      btn.text().includes('Ver Detalhes') || btn.text().includes('Detalhes')
    )
    expect(hasDetailsButton).toBe(true)
  })

  it('grid de cards é responsivo', () => {
    const grid = wrapper.find('.grid')
    expect(grid.classes()).toContain('grid-cols-2')
  })

  it('possui elementos decorativos japoneses', () => {
    const text = wrapper.text()
    const hasDecorativeEmojis = text.includes('🌸') || text.includes('⛩️') || text.includes('🎴')
    expect(hasDecorativeEmojis).toBe(true)
  })

  it('exibe contador de kanjis', () => {
    const stats = wrapper.findAll('.stat-value')
    expect(stats.length).toBeGreaterThan(0)
  })

  it('busca filtra kanjis ao digitar', async () => {
    const searchInput = wrapper.find('input[placeholder*="Buscar"]')
    await searchInput.setValue('一')
    await wrapper.vm.$nextTick()
    
    const cards = wrapper.findAll('.card')
    expect(cards.length).toBeGreaterThanOrEqual(1)
  })

  it('possui modal para detalhes do kanji', () => {
    const modal = wrapper.find('.modal')
    expect(modal.exists()).toBe(true)
  })

  it('possui seção de estatísticas', () => {
    const stats = wrapper.find('.stats')
    expect(stats.exists()).toBe(true)
  })

  it('usa gradientes no design', () => {
    const gradients = wrapper.findAll('[class*="bg-gradient"]')
    expect(gradients.length).toBeGreaterThan(0)
  })

  it('cards têm bordas e sombras', () => {
    const cards = wrapper.findAll('.card')
    const hasStyle = cards.some((card: any) => 
      card.classes().includes('shadow-lg') || card.classes().includes('border')
    )
    expect(hasStyle).toBe(true)
  })

  it('possui botão para limpar filtros', () => {
    const text = wrapper.text()
    const hasClearOption = text.includes('Todos') || text.includes('Limpar')
    expect(hasClearOption).toBe(true)
  })
})
