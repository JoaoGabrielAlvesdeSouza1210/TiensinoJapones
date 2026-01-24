<template>
  <div class="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
    <!-- Header Section com tema japonês -->
    <div class="hero min-h-[30vh] bg-gradient-to-br from-secondary/10 via-base-200 to-accent/10 relative overflow-hidden">
      <!-- Elementos decorativos japoneses no fundo -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute top-10 left-10 text-8xl">📚</div>
        <div class="absolute top-20 right-20 text-8xl">✏️</div>
        <div class="absolute bottom-20 left-1/4 text-8xl">💬</div>
        <div class="absolute bottom-10 right-1/3 text-8xl">🌸</div>
      </div>

      <div class="hero-content text-center relative z-0">
        <div class="max-w-4xl">
          <div class="badge badge-secondary badge-lg mb-4 gap-2 animate-pulse">
            📖 Vocabulário Essencial
          </div>
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Vocabulário <span class="text-secondary">JLPT N5</span>
          </h1>
          <p class="text-lg md:text-xl text-base-content/80 mb-6">
            Aprenda <span class="font-semibold text-secondary">substantivos e verbos</span> essenciais do japonês
          </p>

          <!-- Filtro de tipo -->
          <div class="flex justify-center gap-4 mb-6">
            <button 
              @click="filterType = 'all'"
              :class="['btn', filterType === 'all' ? 'btn-secondary' : 'btn-outline']"
            >
              📚 Todos ({{ VOCABULARY_N5.length }})
            </button>
            <button 
              @click="filterType = 'noun'"
              :class="['btn', filterType === 'noun' ? 'btn-secondary' : 'btn-outline']"
            >
              📦 Substantivos ({{ nouns.length }})
            </button>
            <button 
              @click="filterType = 'verb'"
              :class="['btn', filterType === 'verb' ? 'btn-secondary' : 'btn-outline']"
            >
              ⚡ Verbos ({{ verbs.length }})
            </button>
          </div>

          <!-- Estatísticas no header -->
          <div class="stats shadow-lg bg-base-100/90 backdrop-blur">
            <div class="stat place-items-center">
              <div class="stat-title">Total</div>
              <div class="stat-value text-secondary">{{ filteredVocabulary.length }}</div>
              <div class="stat-desc">Palavras</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Aprendidas</div>
              <div class="stat-value text-success">{{ learnedCount }}</div>
              <div class="stat-desc">{{ learnedPercentage }}%</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Progresso</div>
              <div class="stat-value">
                <div class="radial-progress text-secondary" :style="`--value:${learnedPercentage};`" role="progressbar">
                  {{ learnedPercentage }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Área de Vocabulário -->
    <div class="container mx-auto px-4 py-12">
      <!-- Barra de Busca -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="form-control">
          <div class="input-group">
            <span class="bg-base-300">🔍</span>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar por japonês, romaji ou português..." 
              class="input input-bordered w-full"
            />
            <button v-if="searchQuery" @click="searchQuery = ''" class="btn btn-square">
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Grid de Vocabulário ATUALIZADO -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div 
          v-for="item in displayedVocabulary" 
          :key="item.id"
          class="card bg-gradient-to-br from-base-100 to-base-200 shadow-lg border-2 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          :class="[
            item.type === 'noun' ? 'border-info/30 hover:border-info' : 'border-error/30 hover:border-error',
            learned.has(item.id) ? 'ring-2 ring-success' : ''
          ]"
          @click="showWordDetails(item)"
        >
          <div class="card-body">
            <!-- Badge de tipo -->
            <div class="flex justify-between items-start mb-2">
              <div 
                class="badge gap-2"
                :class="item.type === 'noun' ? 'badge-info' : 'badge-error'"
              >
                <span>{{ item.type === 'noun' ? '📦' : '⚡' }}</span>
                <span>{{ item.type === 'noun' ? 'Substantivo' : 'Verbo' }}</span>
              </div>
              <button 
                @click="toggleLearned(item.id)"
                class="btn btn-circle btn-ghost btn-xs"
                :class="learned.has(item.id) ? 'text-success' : 'text-base-content/30'"
              >
                {{ learned.has(item.id) ? '✓' : '○' }}
              </button>
            </div>

            <!-- Palavra em japonês -->
            <div class="text-center mb-4">
              <div class="text-5xl font-bold mb-2 hover:scale-110 transition-transform cursor-pointer" @click="speakWord(item.hiragana)">
                {{ item.word }}
              </div>
              <div class="text-lg text-base-content/70 font-mono">
                {{ item.hiragana }}
              </div>
            </div>

            <!-- Divider -->
            <div class="divider my-2"></div>

            <!-- Informações -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-xs opacity-60">Romaji:</span>
                <span class="font-mono text-sm font-semibold">{{ item.romaji }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs opacity-60">Português:</span>
                <span class="text-sm font-semibold text-secondary">{{ item.meaning_pt }}</span>
              </div>
            </div>

            <!-- Botão de áudio -->
            <div class="card-actions justify-center mt-4">
              <button 
                @click="speakWord(item.hiragana)"
                class="btn btn-sm btn-outline gap-2 w-full"
              >
                🔊 Ouvir
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há resultados -->
      <div v-if="displayedVocabulary.length === 0" class="text-center py-20">
        <div class="text-8xl mb-4">🔍</div>
        <h3 class="text-2xl font-bold mb-2">Nenhuma palavra encontrada</h3>
        <p class="text-base-content/60">Tente ajustar sua busca ou filtros</p>
      </div>

      <!-- Dicas de Estudo -->
      <div class="mt-12 max-w-4xl mx-auto space-y-4">
        <div class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <div class="font-bold">💡 Dica de Estudo</div>
            <div class="text-sm">Pratique 10 palavras novas por dia. Marque como aprendidas quando conseguir lembrar sem olhar!</div>
          </div>
        </div>

        <div class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div>
            <div class="font-bold">🎯 Meta Recomendada</div>
            <div class="text-sm">Domine todas as 80 palavras essenciais para ter uma base sólida no N5!</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes da Palavra -->
    <dialog ref="wordDetailsModal" class="modal">
      <div class="modal-box max-w-3xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        
        <div v-if="selectedWord" class="space-y-6">
          <!-- Palavra Principal -->
          <div class="text-center">
            <div class="text-7xl font-bold mb-2">{{ selectedWord.word }}</div>
            <div class="text-2xl text-base-content/70 font-mono mb-2">{{ selectedWord.hiragana }}</div>
            <div class="badge badge-lg gap-2" :class="selectedWord.type === 'noun' ? 'badge-info' : 'badge-error'">
              {{ selectedWord.type === 'noun' ? '📦 Substantivo' : '⚡ Verbo' }}
            </div>
          </div>

          <div class="divider"></div>

          <!-- Informações Básicas -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="card bg-base-200">
              <div class="card-body p-4">
                <h4 class="font-semibold mb-2">🗣️ Romaji</h4>
                <p class="font-mono text-lg">{{ selectedWord.romaji }}</p>
              </div>
            </div>
            <div class="card bg-base-200">
              <div class="card-body p-4">
                <h4 class="font-semibold mb-2">🇧🇷 Português</h4>
                <p class="text-lg">{{ selectedWord.meaning_pt }}</p>
              </div>
            </div>
          </div>

          <!-- Análise de Kanjis -->
          <div v-if="wordKanjis.length > 0" class="space-y-4">
            <h4 class="font-semibold text-lg flex items-center gap-2">
              <span>📚</span>
              <span>Kanjis na Palavra</span>
            </h4>
            
            <div class="grid grid-cols-1 gap-4">
              <div v-for="(kanjiDetail, idx) in wordKanjis" :key="idx" class="card bg-gradient-to-br from-primary/5 to-secondary/5">
                <div class="card-body p-4">
                  <div class="flex items-start gap-4">
                    <!-- Kanji Grande -->
                    <div class="text-6xl font-bold">{{ kanjiDetail.kanji }}</div>
                    
                    <!-- Informações -->
                    <div class="flex-1 space-y-2">
                      <div>
                        <span class="font-semibold">Significados:</span>
                        <span class="ml-2">{{ kanjiDetail.br_meanings.join(', ') }}</span>
                      </div>
                      <div>
                        <span class="font-semibold">Significados no inglês:</span>
                        <span class="ml-2">{{ kanjiDetail.meanings.join(', ') }}</span>
                      </div>
                      <div class="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span class="font-semibold">Kun:</span>
                          <span class="ml-2 font-mono">{{ formatKunReadings(kanjiDetail.kun_readings) }}</span>
                        </div>
                        <div>
                          <span class="font-semibold">On:</span>
                          <span class="ml-2 font-mono">{{ formatOnReadings(kanjiDetail.on_readings) }}</span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <div class="badge badge-sm">{{ kanjiDetail.stroke_count }} traços</div>
                        <div class="badge badge-sm">Grau {{ kanjiDetail.grade }}</div>
                        <div class="badge badge-sm">JLPT N{{ kanjiDetail.jlpt || 5 }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botão de Áudio -->
          <div class="text-center">
            <button 
              @click="speakWord(selectedWord.hiragana)"
              class="btn btn-primary gap-2"
            >
              🔊 Ouvir Pronúncia
            </button>
          </div>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>Fechar</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VOCABULARY_N5 } from '@/data/vocabulary-n5'
import { useKanjiApi } from '@/composables/useKanjiApi'

const searchQuery = ref('')
const filterType = ref<'all' | 'noun' | 'verb'>('all')
const learned = ref<Set<string>>(new Set())

// Load learned state from localStorage
const loadLearned = () => {
  try {
    const saved = localStorage.getItem('vocabulary-n5-learned')
    if (saved) {
      learned.value = new Set(JSON.parse(saved))
    }
  } catch (e) {
    console.error('Error loading learned vocabulary:', e)
  }
}

// Save learned state to localStorage
const saveLearned = () => {
  try {
    localStorage.setItem('vocabulary-n5-learned', JSON.stringify([...learned.value]))
  } catch (e) {
    console.error('Error saving learned vocabulary:', e)
  }
}

// Toggle learned status
const toggleLearned = (id: string) => {
  if (learned.value.has(id)) {
    learned.value.delete(id)
  } else {
    learned.value.add(id)
  }
  saveLearned()
}

// Computed properties
const nouns = computed(() => VOCABULARY_N5.filter(v => v.type === 'noun'))
const verbs = computed(() => VOCABULARY_N5.filter(v => v.type === 'verb'))

const filteredVocabulary = computed(() => {
  let result = VOCABULARY_N5

  // Filter by type
  if (filterType.value === 'noun') {
    result = nouns.value
  } else if (filterType.value === 'verb') {
    result = verbs.value
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item =>
      item.word.includes(query) ||
      item.hiragana.includes(query) ||
      item.romaji.toLowerCase().includes(query) ||
      item.meaning_pt.toLowerCase().includes(query)
    )
  }

  return result
})

const displayedVocabulary = computed(() => filteredVocabulary.value)

const learnedCount = computed(() => {
  return filteredVocabulary.value.filter(v => learned.value.has(v.id)).length
})

const learnedPercentage = computed(() => {
  if (filteredVocabulary.value.length === 0) return 0
  return Math.round((learnedCount.value / filteredVocabulary.value.length) * 100)
})

// Speech synthesis
const speakWord = (text: string) => {
  if (!('speechSynthesis' in window)) {
    alert('Seu navegador não suporta síntese de voz.')
    return
  }

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ja-JP'
  utterance.rate = 0.8
  window.speechSynthesis.speak(utterance)
}

// Composable da API para análise de kanjis no vocabulário
const { 
  fetchKanjiDetails,
  formatKunReadings,
  formatOnReadings
} = useKanjiApi()

const selectedWord = ref<typeof VOCABULARY_N5[0] | null>(null)
const wordKanjis = ref<any[]>([])
const wordDetailsModal = ref<HTMLDialogElement | null>(null)

/**
 * Extrai kanjis de uma palavra
 * @param word - Palavra em japonês
 * @returns Array de caracteres kanji
 */
const extractKanjis = (word: string): string[] => {
  const kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/g
  return word.match(kanjiRegex) || []
}

/**
 * Mostra detalhes da palavra incluindo análise de kanjis
 * @param item - Item do vocabulário
 */
const showWordDetails = async (item: typeof VOCABULARY_N5[0]): Promise<void> => {
  selectedWord.value = item
  wordDetailsModal.value?.showModal()
  
  // Busca informações de cada kanji na palavra
  const kanjis = extractKanjis(item.word)
  wordKanjis.value = []
  if (kanjis.length > 0) {
    const palavrasKanji = []
    for (const kanji of kanjis) {
      const details = await fetchKanjiDetails(kanji)
      if (details) {
        palavrasKanji.push(details)
      }
    }
    wordKanjis.value = palavrasKanji
  }
}

// Initialize
loadLearned()
</script>

<style scoped>
/* Animação do radial progress */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.radial-progress {
  transition: --value 0.5s ease;
}

/* Efeito hover nos cards */
.card:hover {
  transform: scale(1.05) translateY(-5px);
}

/* Animação da palavra japonesa */
.card-body > div:nth-child(2) > div:first-child {
  font-family: 'Noto Sans JP', 'Yu Gothic', 'Meiryo', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* Transição suave para os filtros */
.btn {
  transition: all 0.3s ease;
}

/* Grid responsivo com animação */
.grid > div {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilo para itens aprendidos */
.ring-success {
  animation: pulse-ring 2s ease-in-out infinite;
}

@keyframes pulse-ring {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
}
</style>
