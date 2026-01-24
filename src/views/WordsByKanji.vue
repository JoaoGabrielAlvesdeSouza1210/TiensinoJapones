<template>
  <div class="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          📝 Palavras por Kanji
        </h1>
        <p class="text-lg text-base-content/70">
          Descubra palavras japonesas que contêm um kanji específico
        </p>
      </div>

      <!-- Busca -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Digite um Kanji</span>
              </label>
              <div class="join w-full">
                <input
                  v-model="searchKanji"
                  type="text"
                  placeholder="Ex: 学, 日, 本..."
                  class="input input-bordered input-lg join-item flex-1 text-center text-4xl"
                  maxlength="1"
                  @keyup.enter="searchWords"
                />
                <button
                  @click="searchWords"
                  class="btn btn-primary btn-lg join-item"
                  :disabled="!searchKanji || loading"
                >
                  <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span v-if="loading" class="loading loading-spinner"></span>
                  {{ loading ? 'Buscando...' : 'Buscar' }}
                </button>
              </div>
              <label class="label">
                <span class="label-text-alt">Digite apenas um kanji por vez</span>
              </label>
            </div>

            <!-- Sugestões Rápidas -->
            <div class="mt-4">
              <p class="text-sm font-semibold mb-2">Kanjis populares:</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="kanji in popularKanjis"
                  :key="kanji"
                  @click="quickSearch(kanji)"
                  class="btn btn-outline btn-sm"
                >
                  {{ kanji }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="alert alert-error max-w-4xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
      </div>

      <!-- Resultados -->
      <div v-else-if="words.length > 0" class="space-y-6">
        <!-- Info Card -->
        <div class="max-w-4xl mx-auto">
          <div class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 class="font-bold">Kanji: <span class="text-4xl">{{ currentKanji }}</span></h3>
              <div class="text-sm">{{ words.length }} palavra(s) encontrada(s)</div>
            </div>
          </div>
        </div>

        <!-- Estatísticas -->
        <div class="max-w-7xl mx-auto">
          <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div class="stat">
              <div class="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="stat-title">Total de Palavras</div>
              <div class="stat-value text-primary">{{ words.length }}</div>
              <div class="stat-desc">Com o kanji {{ currentKanji }}</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
              </div>
              <div class="stat-title">Filtradas</div>
              <div class="stat-value text-secondary">{{ filteredWords.length }}</div>
              <div class="stat-desc">{{ searchQuery ? 'Resultados da busca' : 'Todas visíveis' }}</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div class="stat-title">Favoritas</div>
              <div class="stat-value text-accent">{{ favoriteCount }}</div>
              <div class="stat-desc">Palavras marcadas</div>
            </div>
          </div>
        </div>

        <!-- Filtros e Ordenação -->
        <div class="max-w-7xl mx-auto">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Busca -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Buscar Palavra</span>
                  </label>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Filtrar resultados..."
                    class="input input-bordered"
                  />
                </div>

                <!-- Ordenação -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Ordenar Por</span>
                  </label>
                  <select v-model="sortBy" class="select select-bordered">
                    <option value="default">Padrão</option>
                    <option value="alphabetical">Alfabética (A-Z)</option>
                    <option value="variants">Mais Variantes</option>
                    <option value="meanings">Mais Significados</option>
                  </select>
                </div>

                <!-- Filtro de Favoritos -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Filtrar</span>
                  </label>
                  <div class="flex items-center h-12">
                    <label class="label cursor-pointer">
                      <input 
                        v-model="showOnlyFavorites" 
                        type="checkbox" 
                        class="checkbox checkbox-primary mr-2"
                      />
                      <span class="label-text">Apenas Favoritas</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de Palavras -->
        <div class="max-w-7xl mx-auto space-y-4">
          <div
            v-for="(word, index) in paginatedWords"
            :key="word?.variants[0]?.written"
            class="card bg-gradient-to-br from-base-100 to-base-200 shadow-lg hover:shadow-2xl transition-all duration-300"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <div class="card-body">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <!-- Palavra e Leitura -->
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-3xl font-bold">{{ word?.variants[0]?.written }}</h3>
                    <button
                      @click="toggleFavorite(word?.variants[0]?.written)"
                      class="btn btn-circle btn-sm"
                      :class="isFavorite(word?.variants[0]?.written) ? 'btn-warning' : 'btn-ghost'"
                    >
                      <svg v-if="isFavorite(word?.variants[0]?.written)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div class="text-lg text-base-content/70 mb-3">
                    {{ word?.variants[0]?.pronounced }}
                  </div>

                  <!-- Significados -->
                  <div class="space-y-2">
                    <div v-for="(meaning, idx) in word.meanings" :key="idx" class="flex items-start gap-2">
                      <span class="badge badge-primary badge-sm mt-1">{{ idx + 1 }}</span>
                      <div>
                        <p class="font-medium">{{ meaning.glosses.join(', ') }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Badges -->
                <div class="flex flex-wrap gap-2">
                  <div v-if="word.variants.length > 1" class="badge badge-info">
                    {{ word.variants.length }} variantes
                  </div>
                  <div v-if="word.meanings.length > 1" class="badge badge-secondary">
                    {{ word.meanings.length }} significados
                  </div>
                </div>
              </div>

              <!-- Variantes (se existirem) -->
              <div v-if="word.variants.length > 1" class="mt-4">
                <div class="divider text-sm">Outras Escritas</div>
                <div class="flex flex-wrap gap-2">
                  <div 
                    v-for="(variant, idx) in word.variants.slice(1)" 
                    :key="idx"
                    class="badge badge-outline badge-lg"
                  >
                    {{ variant.written }} ({{ variant.pronounced }})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Paginação -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8">
          <div class="join">
            <button 
              class="join-item btn"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              «
            </button>
            <button class="join-item btn">
              Página {{ currentPage }} de {{ totalPages }}
            </button>
            <button 
              class="join-item btn"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              »
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State - Sem Busca -->
      <div v-else-if="!searched && !loading" class="text-center py-20">
        <div class="text-6xl mb-4">📝</div>
        <h3 class="text-2xl font-bold mb-2">Busque Palavras por Kanji</h3>
        <p class="text-base-content/70">Digite um kanji acima para descobrir palavras que o contêm</p>
      </div>

      <!-- Empty State - Sem Resultados -->
      <div v-else-if="searched && !loading" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-2xl font-bold mb-2">Nenhuma Palavra Encontrada</h3>
        <p class="text-base-content/70">Tente outro kanji ou verifique se digitou corretamente</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useKanjiApi } from '@/composables/useKanjiApi'

interface WordVariant {
  written: string
  pronounced: string
  priorities: string[]
}

interface WordMeaning {
  glosses: string[]
}

interface Word {
  variants: WordVariant[]
  meanings: WordMeaning[]
}

const searchKanji = ref('')
const currentKanji = ref('')
const words = ref<Word[]>([])
const searched = ref(false)
const searchQuery = ref('')
const sortBy = ref<'default' | 'alphabetical' | 'variants' | 'meanings'>('default')
const showOnlyFavorites = ref(false)
const favorites = ref<Set<string>>(new Set())
const currentPage = ref(1)
const itemsPerPage = 20

const popularKanjis = ['学', '日', '本', '人', '生', '会', '国', '時', '手', '水']

const { loading, error, fetchWords } = useKanjiApi()

// Computed
const filteredWords = computed(() => {
  let result = [...words.value]

  // Filtro de busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(word => 
      word.variants.some(v => 
        v.written.includes(searchQuery.value) || 
        v.pronounced.toLowerCase().includes(query)
      ) ||
      word.meanings.some(m => 
        m.glosses.some(g => g.toLowerCase().includes(query))
      )
    )
  }

  // Filtro de favoritos
  if (showOnlyFavorites.value) {
    result = result.filter(word => favorites.value.has(word?.variants[0]?.written || ''))
  }

  // Ordenação
  switch (sortBy.value) {
    case 'alphabetical':
      result.sort((a, b) => a?.variants[0]?.written.localeCompare(b?.variants[0]?.written || '', 'ja') || 0)
      break
    case 'variants':
      result.sort((a, b) => b.variants.length - a.variants.length)
      break
    case 'meanings':
      result.sort((a, b) => b.meanings.length - a.meanings.length)
      break
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredWords.value.length / itemsPerPage))

const paginatedWords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredWords.value.slice(start, end)
})

const favoriteCount = computed(() => {
  return words.value.filter(w => favorites.value.has(w?.variants[0]?.written || '')).length
})

// Métodos
const searchWords = async () => {
  if (!searchKanji.value.trim()) return
  
  searched.value = true
  currentKanji.value = searchKanji.value
  currentPage.value = 1
  
  const result = await fetchWords(searchKanji.value)
  words.value = result || []
  
  loadFavorites()
}

const quickSearch = (kanji: string) => {
  searchKanji.value = kanji
  searchWords()
}

const toggleFavorite = (word: string | undefined) => {
    if (!word) return
  if (favorites.value.has(word)) {
    favorites.value.delete(word)
  } else {
    favorites.value.add(word)
  }
  saveFavorites()
}

const isFavorite = (word: string | undefined) => {
    if (!word) return false
  return favorites.value.has(word)
}

const saveFavorites = () => {
  localStorage.setItem('words-favorites', JSON.stringify([...favorites.value]))
}

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem('words-favorites')
    if (saved) {
      favorites.value = new Set(JSON.parse(saved))
    }
  } catch (e) {
    console.error('Error loading favorites:', e)
  }
}

// Watchers
watch([searchQuery, sortBy, showOnlyFavorites], () => {
  currentPage.value = 1
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.5s ease-out backwards;
}

.card:hover {
  transform: translateY(-2px);
}

input[type="text"]:focus {
  outline: none;
  border-color: oklch(var(--p));
}
</style>