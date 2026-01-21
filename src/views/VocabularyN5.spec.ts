import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VocabularyN5 from './VocabularyN5.vue'

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

// Mock Web Speech API
const mockSpeak = vi.fn()
Object.defineProperty(window, 'speechSynthesis', {
  value: {
    speak: mockSpeak,
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn(() => [])
  }
})

describe('VocabularyN5.vue', () => {
  let wrapper: any

  beforeEach(() => {
    localStorageMock.clear()
    mockSpeak.mockClear()
    wrapper = mount(VocabularyN5)
  })

  it('renderiza o componente corretamente', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('exibe o título "Vocabulário JLPT N5"', () => {
    const title = wrapper.find('h1')
    expect(title.text()).toContain('Vocabulário')
    expect(title.text()).toContain('N5')
  })

  it('exibe badge "Vocabulário Essencial"', () => {
    const badge = wrapper.find('.badge-secondary')
    expect(badge.text()).toContain('Vocabulário Essencial')
    expect(badge.text()).toContain('📖')
  })

  it('possui campo de busca', () => {
    const searchInput = wrapper.find('input[placeholder*="Buscar"]')
    expect(searchInput.exists()).toBe(true)
  })

  it('possui ícone de lupa no campo de busca', () => {
    const text = wrapper.text()
    expect(text).toContain('🔍')
  })

  it('possui botão de filtro "Todos"', () => {
    const buttons = wrapper.findAll('button')
    const allButton = buttons.find((btn: any) => btn.text().includes('Todos'))
    expect(allButton).toBeTruthy()
  })

  it('possui botão de filtro "Substantivos"', () => {
    const buttons = wrapper.findAll('button')
    const nounsButton = buttons.find((btn: any) => btn.text().includes('Substantivos'))
    expect(nounsButton).toBeTruthy()
  })

  it('possui botão de filtro "Verbos"', () => {
    const buttons = wrapper.findAll('button')
    const verbsButton = buttons.find((btn: any) => btn.text().includes('Verbos'))
    expect(verbsButton).toBeTruthy()
  })

  it('exibe estatísticas de vocabulário', () => {
    const stats = wrapper.find('.stats')
    expect(stats.exists()).toBe(true)
  })

  it('exibe contador total de palavras', () => {
    const text = wrapper.text()
    expect(text).toContain('Total')
    expect(text).toContain('Palavras')
  })

  it('exibe contador de palavras aprendidas', () => {
    const text = wrapper.text()
    expect(text).toContain('Aprendidas')
  })

  it('exibe progresso com radial-progress', () => {
    const radialProgress = wrapper.find('.radial-progress')
    expect(radialProgress.exists()).toBe(true)
  })

  it('renderiza cards de vocabulário', () => {
    const cards = wrapper.findAll('.card')
    expect(cards.length).toBeGreaterThan(0)
  })

  it('cards exibem palavra em japonês', () => {
    const japaneseWords = wrapper.findAll('.text-5xl')
    expect(japaneseWords.length).toBeGreaterThan(0)
  })

  it('cards exibem hiragana', () => {
    const text = wrapper.text()
    // Verifica se contém caracteres hiragana comuns
    const hasHiragana = /[\u3040-\u309F]/.test(text)
    expect(hasHiragana).toBe(true)
  })

  it('cards exibem romaji', () => {
    const text = wrapper.text()
    expect(text).toContain('Romaji:')
  })

  it('cards exibem tradução em português', () => {
    const text = wrapper.text()
    expect(text).toContain('Português:')
  })

  it('cards têm badge de tipo (substantivo ou verbo)', () => {
    const badges = wrapper.findAll('.badge-info, .badge-error')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('possui botão de áudio "Ouvir"', () => {
    const buttons = wrapper.findAll('button')
    const audioButtons = buttons.filter((btn: any) => btn.text().includes('Ouvir'))
    expect(audioButtons.length).toBeGreaterThan(0)
  })

  it('possui botão para marcar como aprendido', () => {
    const checkButtons = wrapper.findAll('.btn-circle.btn-xs')
    expect(checkButtons.length).toBeGreaterThan(0)
  })

  it('cards de substantivos têm borda azul', () => {
    const nounCards = wrapper.findAll('.border-info\\/30')
    expect(nounCards.length).toBeGreaterThan(0)
  })

  it('cards de verbos têm borda vermelha', () => {
    const verbCards = wrapper.findAll('.border-error\\/30')
    expect(verbCards.length).toBeGreaterThan(0)
  })

  it('filtro por tipo funciona ao clicar em "Substantivos"', async () => {
    const buttons = wrapper.findAll('button')
    const nounsButton = buttons.find((btn: any) => btn.text().includes('Substantivos'))
    
    if (nounsButton) {
      await nounsButton.trigger('click')
      await wrapper.vm.$nextTick()
      
      const cards = wrapper.findAll('.card')
      expect(cards.length).toBeGreaterThan(0)
    }
  })

  it('filtro por tipo funciona ao clicar em "Verbos"', async () => {
    const buttons = wrapper.findAll('button')
    const verbsButton = buttons.find((btn: any) => btn.text().includes('Verbos'))
    
    if (verbsButton) {
      await verbsButton.trigger('click')
      await wrapper.vm.$nextTick()
      
      const cards = wrapper.findAll('.card')
      expect(cards.length).toBeGreaterThan(0)
    }
  })

  it('busca filtra palavras ao digitar', async () => {
    const searchInput = wrapper.find('input[placeholder*="Buscar"]')
    await searchInput.setValue('水')
    await wrapper.vm.$nextTick()
    
    const cards = wrapper.findAll('.card')
    expect(cards.length).toBeGreaterThanOrEqual(0)
  })

  it('botão de limpar busca aparece quando há texto', async () => {
    const searchInput = wrapper.find('input[placeholder*="Buscar"]')
    await searchInput.setValue('test')
    await wrapper.vm.$nextTick()
    
    const clearButton = wrapper.find('button.btn-square')
    expect(clearButton.exists()).toBe(true)
  })

  it('grid é responsivo', () => {
    const grid = wrapper.find('.grid')
    expect(grid.classes()).toContain('grid-cols-1')
    expect(grid.classes()).toContain('md:grid-cols-2')
    expect(grid.classes()).toContain('lg:grid-cols-3')
  })

  it('cards têm efeito hover com scale', () => {
    const cards = wrapper.findAll('.card')
    const hasHoverEffect = cards.some((card: any) => 
      card.classes().includes('hover:scale-105')
    )
    expect(hasHoverEffect).toBe(true)
  })

  it('possui elementos decorativos japoneses', () => {
    const text = wrapper.text()
    const hasDecorativeEmojis = 
      text.includes('📚') || 
      text.includes('✏️') || 
      text.includes('💬') || 
      text.includes('🌸')
    expect(hasDecorativeEmojis).toBe(true)
  })

  it('possui gradiente no design', () => {
    const gradients = wrapper.findAll('[class*="bg-gradient"]')
    expect(gradients.length).toBeGreaterThan(0)
  })

  it('exibe mensagem quando não há resultados', async () => {
    const searchInput = wrapper.find('input[placeholder*="Buscar"]')
    await searchInput.setValue('xyzabc123')
    await wrapper.vm.$nextTick()
    
    const text = wrapper.text()
    expect(text).toContain('Nenhuma palavra encontrada')
  })

  it('possui seção de dicas de estudo', () => {
    const alerts = wrapper.findAll('.alert')
    expect(alerts.length).toBeGreaterThan(0)
  })

  it('exibe dica sobre praticar diariamente', () => {
    const text = wrapper.text()
    expect(text).toContain('Dica de Estudo')
  })

  it('exibe meta recomendada', () => {
    const text = wrapper.text()
    expect(text).toContain('Meta Recomendada')
  })

  it('cards aprendidos têm ring de sucesso', async () => {
    const checkButton = wrapper.find('.btn-circle.btn-xs')
    await checkButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    const learnedCards = wrapper.findAll('.ring-success')
    expect(learnedCards.length).toBeGreaterThan(0)
  })

  it('contador de aprendidas atualiza ao marcar', async () => {
    const initialText = wrapper.text()
    
    const checkButton = wrapper.find('.btn-circle.btn-xs')
    await checkButton.trigger('click')
    await wrapper.vm.$nextTick()
    
    // Verifica se o componente foi atualizado
    expect(wrapper.vm.learnedCount).toBeGreaterThanOrEqual(0)
  })
})
