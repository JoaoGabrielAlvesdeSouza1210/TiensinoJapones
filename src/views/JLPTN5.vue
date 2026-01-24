<template>
  <div class="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
    <!-- Header Section com tema japonês -->
    <div class="hero min-h-[40vh] bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 relative overflow-hidden">
      <!-- Elementos decorativos japoneses no fundo -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute top-10 left-10 text-8xl">🌸</div>
        <div class="absolute top-20 right-20 text-8xl">⛩️</div>
        <div class="absolute bottom-20 left-1/4 text-8xl">🎋</div>
        <div class="absolute bottom-10 right-1/3 text-8xl">🏯</div>
        <div class="absolute top-1/3 left-1/2 text-8xl">🌊</div>
      </div>

      <div class="hero-content text-center relative z-0">
        <div class="max-w-4xl">
          <div class="badge badge-primary badge-lg mb-4 gap-2">
            📚 JLPT N5
          </div>
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Kanjis do <span class="text-primary">JLPT N5</span>
          </h1>
          <p class="text-lg md:text-xl text-base-content/80 mb-8 max-w-2xl mx-auto">
            Aprenda os <span class="font-semibold text-primary">80 kanjis essenciais</span> para o nível N5. 
            Cada card contém o kanji, significado em português e leitura em romaji.
          </p>
          
          <!-- Filtros e Controles -->
          <div class="flex flex-wrap gap-4 justify-center items-center mb-6">
            <div class="form-control">
              <div class="input-group">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Buscar kanji..." 
                  class="input input-bordered input-primary w-64"
                />
                <button class="btn btn-square btn-primary">
                  🔍
                </button>
              </div>
            </div>
            
            <div class="dropdown dropdown-hover">
              <label tabindex="0" class="btn btn-outline gap-2">
                {{ sortLabel }} 
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-2">
                <li><a @click="sortBy = 'default'">📋 Ordem Padrão</a></li>
                <li><a @click="sortBy = 'kanji'">🔤 Por Kanji</a></li>
                <li><a @click="sortBy = 'meaning'">🇧🇷 Por Significado</a></li>
              </ul>
            </div>

            <div class="badge badge-lg gap-2">
              <span class="font-semibold">{{ filteredKanjis.length }}</span> kanjis
            </div>
          </div>

          <!-- Estatísticas -->
          <div class="stats shadow-lg bg-base-100/90 backdrop-blur">
            <div class="stat place-items-center">
              <div class="stat-title">Total de Kanjis</div>
              <div class="stat-value text-primary">80</div>
              <div class="stat-desc">Nível N5</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Tempo Estimado</div>
              <div class="stat-value text-secondary">2-3</div>
              <div class="stat-desc">Meses de estudo</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Progresso</div>
              <div class="stat-value text-accent">{{ learnedCount }}</div>
              <div class="stat-desc">Kanjis aprendidos</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de Cards -->
    <div class="container mx-auto px-4 py-12">
      <!-- Mensagem quando não há resultados -->
      <div v-if="filteredKanjis.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">😕</div>
        <p class="text-2xl font-semibold mb-2">Nenhum kanji encontrado</p>
        <p class="text-base-content/60">Tente buscar por outro termo</p>
      </div>

      <!-- Grid responsivo de cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div 
          v-for="kanjiCard in filteredKanjis" 
          :key="kanjiCard.id"
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border border-base-300 hover:border-primary relative overflow-hidden"
          @click="toggleLearned(kanjiCard.id)"
        >
          <!-- Efeito decorativo de fundo -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <!-- Indicador de aprendido -->
          <div v-if="isLearned(kanjiCard.id)" class="absolute top-2 right-2 z-10">
            <div class="badge badge-success gap-1 shadow-lg">
              ✓ Aprendido
            </div>
          </div>

          <div class="card-body items-center text-center relative z-10 p-6">
            <!-- Kanji grande -->
            <div class="text-7xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ kanjiCard.kanji }}
            </div>
            
            <!-- Divider decorativo -->
            <div class="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-4" />
            
            <!-- Significado -->
            <h3 class="card-title text-lg justify-center mb-2">
              {{ kanjiCard.meaning_pt }}
            </h3>
            
            <!-- Romaji -->
            <div class="badge badge-outline badge-lg gap-2 font-mono">
              🗣️ {{ kanjiCard.romaji }}
            </div>

            <!-- Ações do card (aparecem no hover) -->
            <div class="card-actions opacity-0 group-hover:opacity-100 transition-opacity mt-4 w-full">
              <button 
                class="btn btn-sm btn-primary btn-block gap-2"
                @click.stop="viewDetails(kanjiCard)"
              >
                📖 Ver Detalhes
              </button>
            </div>
          </div>

          <!-- Decoração canto -->
          <div class="absolute -bottom-2 -right-2 text-4xl opacity-10 pointer-events-none">
            🌸
          </div>
        </div>
      </div>

      <!-- Botão de carregar mais (para futuras expansões) -->
      <div v-if="filteredKanjis.length > 0" class="text-center mt-12">
        <div class="divider">
          <span class="text-base-content/60">Você chegou ao fim da lista</span>
        </div>
        <div class="flex gap-4 justify-center mt-8">
          <button class="btn btn-outline gap-2">
            📥 Baixar Lista Completa
          </button>
          <button class="btn btn-primary gap-2">
            🎯 Praticar Novamente
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes ATUALIZADO -->
    <dialog ref="detailsModal" class="modal">
      <div class="modal-box max-w-3xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        
        <!-- Loading State -->
        <div v-if="loadingDetails" class="flex justify-center items-center py-12">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <!-- Error State -->
        <div v-else-if="errorDetails" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorDetails }}</span>
        </div>

        <!-- Detalhes do Kanji -->
        <div v-else-if="kanjiApiDetails" class="space-y-6">
          <!-- Kanji Principal -->
          <div class="text-center">
            <h3 class="text-8xl font-bold mb-4">{{ selectedKanji?.kanji }}</h3>
            <div class="badge badge-primary badge-lg">JLPT N{{ kanjiApiDetails.jlpt || 5 }}</div>
          </div>

          <div class="divider"></div>

          <!-- Grid de Informações -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Significados -->
            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">🇧🇷 Significados (google tradutor)</h4>
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="(meaning, idx) in kanjiApiDetails.br_meanings" :key="idx">
                    {{ meaning }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">🇺🇸 Significados (original)</h4>
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="(meaning, idx) in kanjiApiDetails.meanings" :key="idx">
                    {{ meaning }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Informações Básicas -->
            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">📊 Informações</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="font-semibold">Traços:</span>
                    <span>{{ kanjiApiDetails.stroke_count }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-semibold">Grau:</span>
                    <span>{{ kanjiApiDetails.grade }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-semibold">JLPT:</span>
                    <span class="font-mono text-xs">{{ kanjiApiDetails.jlpt }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Leituras Kun -->
            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">🔤 Leituras Kun (訓読み)</h4>
                <div v-if="kanjiApiDetails.kun_readings.length > 0">
                  <div v-for="(reading, idx) in kanjiApiDetails.kun_readings" :key="idx" class="badge badge-outline mr-2 mb-2">
                    {{ reading }}
                  </div>
                </div>
                <div v-else class="text-sm opacity-60">Não disponível</div>
              </div>
            </div>

            <!-- Leituras On -->
            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">📖 Leituras On (音読み)</h4>
                <div v-if="kanjiApiDetails.on_readings.length > 0">
                  <div v-for="(reading, idx) in kanjiApiDetails.on_readings" :key="idx" class="badge badge-outline mr-2 mb-2">
                    {{ reading }}
                  </div>
                </div>
                <div v-else class="text-sm opacity-60">Não disponível</div>
              </div>
            </div>
          </div>

          <!-- Leituras de Nomes -->
          <div v-if="kanjiApiDetails.name_readings.length > 0" class="card bg-base-200">
            <div class="card-body">
              <h4 class="card-title text-sm">👤 Leituras em Nomes</h4>
              <div class="flex flex-wrap gap-2">
                <div v-for="(reading, idx) in kanjiApiDetails.name_readings" :key="idx" class="badge badge-info">
                  {{ reading }}
                </div>
              </div>
            </div>
          </div>

          <!-- Informação do Romaji Original -->
          <div class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <div class="font-bold">Leitura do Curso</div>
              <div>{{ selectedKanji?.romaji }}</div>
            </div>
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
import { KANJI_N5, type KanjiCard } from '@/data/kanji-n5'
import { useKanjiApi } from '@/composables/useKanjiApi'

// Estados
const searchQuery = ref('')
const sortBy = ref<'default' | 'kanji' | 'meaning'>('default')
const learnedKanjis = ref<Set<string>>(new Set())
const selectedKanji = ref<KanjiCard | null>(null)
const detailsModal = ref<HTMLDialogElement | null>(null)

// Computed
const sortLabel = computed(() => {
  switch (sortBy.value) {
    case 'kanji': return '🔤 Por Kanji'
    case 'meaning': return '🇧🇷 Por Significado'
    default: return '📋 Ordem Padrão'
  }
})

const learnedCount = computed(() => learnedKanjis.value.size)

const filteredKanjis = computed(() => {
  let result = [...KANJI_N5]

  // Filtrar por busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(k => 
      k.kanji.includes(query) ||
      k.meaning_pt.toLowerCase().includes(query) ||
      k.romaji.toLowerCase().includes(query)
    )
  }

  // Ordenar
  switch (sortBy.value) {
    case 'kanji':
      result.sort((a, b) => a.kanji.localeCompare(b.kanji))
      break
    case 'meaning':
      result.sort((a, b) => a.meaning_pt.localeCompare(b.meaning_pt))
      break
    // 'default' mantém a ordem original
  }

  return result
})

// Métodos
const toggleLearned = (id: string) => {
  if (learnedKanjis.value.has(id)) {
    learnedKanjis.value.delete(id)
  } else {
    learnedKanjis.value.add(id)
  }
}

const isLearned = (id: string) => {
  return learnedKanjis.value.has(id)
}

// Composable da API
const { 
  loading: loadingDetails, 
  error: errorDetails, 
  kanjiDetails: kanjiApiDetails, 
  fetchKanjiDetails 
} = useKanjiApi()

/**
 * Visualiza detalhes do kanji buscando informações da API
 * @param kanji - Card do kanji selecionado
 */
const viewDetails = async (kanji: KanjiCard): Promise<void> => {
  selectedKanji.value = kanji
  detailsModal.value?.showModal()
  
  // Busca informações da API
  await fetchKanjiDetails(kanji.kanji)
}
</script>

<style scoped>
/* Animação de entrada dos cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.5s ease-out backwards;
}

/* Delay progressivo para cada card */
.card:nth-child(1) { animation-delay: 0.05s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.15s; }
.card:nth-child(4) { animation-delay: 0.2s; }
.card:nth-child(5) { animation-delay: 0.25s; }

/* Efeito de hover suave */
.card:hover {
  transform: translateY(-8px) rotate(1deg);
}

/* Estilo para o kanji com shadow japonês */
.card-body > div:first-of-type {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans JP', 'Yu Gothic', 'Meiryo', sans-serif;
}

/* Animação da barra de progresso */
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.stats {
  background: linear-gradient(90deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    rgba(255, 255, 255, 0.1) 50%, 
    rgba(255, 255, 255, 0.05) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 3s infinite;
}
</style>