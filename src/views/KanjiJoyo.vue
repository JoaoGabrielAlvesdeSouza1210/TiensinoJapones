<template>
  <div class="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          📋 Kanjis Jōyō (常用漢字)
        </h1>
        <p class="text-lg text-base-content/70 max-w-3xl mx-auto">
          Os 2136 kanjis de uso regular no Japão, estabelecidos pelo Ministério da Educação
        </p>
      </div>

      <!-- Botão de Carregar -->
      <div v-if="!loaded" class="text-center mb-8">
        <button
          @click="loadKanjis"
          class="btn btn-primary btn-lg gap-2"
          :disabled="loading"
        >
          <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span v-if="loading" class="loading loading-spinner"></span>
          {{ loading ? 'Carregando...' : 'Carregar Lista Completa' }}
        </button>
        <p class="text-sm text-base-content/60 mt-2">
          Pode levar alguns segundos para carregar todos os kanjis
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col justify-center items-center py-20">
        <span class="loading loading-spinner loading-lg text-primary mb-4"></span>
        <p class="text-lg">Carregando {{ kanjis.length }} / ~2136 kanjis...</p>
        <progress class="progress progress-primary w-56 mt-2" :value="kanjis.length" max="2136"></progress>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="alert alert-error max-w-4xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
      </div>

      <!-- Estatísticas e Filtros -->
      <div v-else-if="loaded" class="space-y-8">
        <!-- Stats -->
        <div class="max-w-7xl mx-auto">
          <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div class="stat">
              <div class="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div class="stat-title">Total de Kanjis</div>
              <div class="stat-value text-primary">{{ kanjis.length }}</div>
              <div class="stat-desc">Kanjis Jōyō oficiais</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
              </div>
              <div class="stat-title">Filtrados</div>
              <div class="stat-value text-secondary">{{ filteredKanjis.length }}</div>
              <div class="stat-desc">{{ searchQuery ? 'Resultados da busca' : 'Todos visíveis' }}</div>
            </div>

            <div class="stat">
              <div class="stat-figure text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <div class="stat-title">Aprendidos</div>
              <div class="stat-value text-accent">{{ learnedCount }}</div>
              <div class="stat-desc">{{ learnedPercentage }}% completo</div>
            </div>
          </div>

          <!-- Barra de Progresso -->
          <div class="w-full bg-base-300 rounded-full h-4 mt-4">
            <div 
              class="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500"
              :style="{ width: `${learnedPercentage}%` }"
            ></div>
          </div>
        </div>

        <!-- Filtros -->
        <div class="max-w-7xl mx-auto">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Busca -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Buscar Kanji</span>
                  </label>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Digite um kanji..."
                    class="input input-bordered"
                  />
                </div>

                <!-- Filtro por Status -->
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-semibold">Filtrar por Status</span>
                  </label>
                  <select v-model="filterStatus" class="select select-bordered">
                    <option value="all">Todos</option>
                    <option value="learned">Aprendidos</option>
                    <option value="notLearned">Não Aprendidos</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Grid de Kanjis -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-3 max-w-7xl mx-auto">
          <div
            v-for="(kanji, index) in displayedKanjis"
            :key="kanji"
            class="card bg-gradient-to-br from-base-100 to-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2"
            :class="[
              isLearned(kanji) ? 'border-success ring-2 ring-success' : 'border-primary/30 hover:border-primary'
            ]"
            :style="{ animationDelay: `${(index % 50) * 0.02}s` }"
            @click="viewDetails(kanji)"
          >
            <div class="card-body items-center text-center p-3">
              <div class="text-4xl font-bold mb-1">{{ kanji }}</div>
              
              <button
                @click.stop="toggleLearned(kanji)"
                class="btn btn-circle btn-xs"
                :class="isLearned(kanji) ? 'btn-success' : 'btn-ghost'"
              >
                <svg v-if="isLearned(kanji)" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
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
    </div>

    <!-- Modal de Detalhes -->
    <dialog ref="detailsModal" class="modal">
      <div class="modal-box max-w-3xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        
        <div v-if="loadingDetails" class="flex justify-center items-center py-12">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <div v-else-if="errorDetails" class="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errorDetails }}</span>
        </div>

        <div v-else-if="kanjiApiDetails" class="space-y-6">
          <div class="text-center">
            <h3 class="text-8xl font-bold mb-4">{{ selectedKanji }}</h3>
            <div class="flex gap-2 justify-center flex-wrap">
              <div class="badge badge-primary badge-lg">Jōyō</div>
              <div class="badge badge-secondary badge-lg" v-if="kanjiApiDetails.jlpt">JLPT N{{ kanjiApiDetails.jlpt }}</div>
              <div class="badge badge-accent badge-lg" v-if="kanjiApiDetails.grade">Grau {{ kanjiApiDetails.grade }}</div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">🇧🇷 Significados</h4>
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="(meaning, idx) in kanjiApiDetails.br_meanings" :key="idx">
                    {{ meaning }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">US Significados</h4>
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="(meaning, idx) in kanjiApiDetails.meanings" :key="idx">
                    {{ meaning }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">📊 Informações</h4>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="font-semibold">Traços:</span>
                    <span>{{ kanjiApiDetails.stroke_count }}</span>
                  </div>
                  <div class="flex justify-between" v-if="kanjiApiDetails.grade">
                    <span class="font-semibold">Grau:</span>
                    <span>{{ kanjiApiDetails.grade }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-semibold">Unicode:</span>
                    <span class="font-mono text-xs">{{ kanjiApiDetails.unicode }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">🔤 Leituras Kun</h4>
                <div v-if="kanjiApiDetails.kun_readings.length > 0">
                  <div v-for="(reading, idx) in kanjiApiDetails.kun_readings" :key="idx" class="badge badge-outline mr-2 mb-2">
                    {{ reading }}
                  </div>
                </div>
                <div v-else class="text-sm opacity-60">Não disponível</div>
              </div>
            </div>

            <div class="card bg-base-200">
              <div class="card-body">
                <h4 class="card-title text-sm">📖 Leituras On</h4>
                <div v-if="kanjiApiDetails.on_readings.length > 0">
                  <div v-for="(reading, idx) in kanjiApiDetails.on_readings" :key="idx" class="badge badge-outline mr-2 mb-2">
                    {{ reading }}
                  </div>
                </div>
                <div v-else class="text-sm opacity-60">Não disponível</div>
              </div>
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
import { useKanjiApi } from '@/composables/useKanjiApi'

const loaded = ref(false)
const kanjis = ref<string[]>([])
const learnedKanjis = ref<Set<string>>(new Set())
const selectedKanji = ref<string | null>(null)
const detailsModal = ref<HTMLDialogElement | null>(null)
const searchQuery = ref('')
const filterStatus = ref<'all' | 'learned' | 'notLearned'>('all')
const currentPage = ref(1)
const itemsPerPage = 100

const { 
  loading,
  error,
  loading: loadingDetails,
  error: errorDetails,
  kanjiDetails: kanjiApiDetails,
  fetchJoyoSet,
  fetchKanjiDetails
} = useKanjiApi()

const filteredKanjis = computed(() => {
  let result = kanjis.value

  if (searchQuery.value) {
    result = result.filter(k => k.includes(searchQuery.value))
  }

  if (filterStatus.value === 'learned') {
    result = result.filter(k => learnedKanjis.value.has(k))
  } else if (filterStatus.value === 'notLearned') {
    result = result.filter(k => !learnedKanjis.value.has(k))
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredKanjis.value.length / itemsPerPage))

const displayedKanjis = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredKanjis.value.slice(start, end)
})

const learnedCount = computed(() => {
  return kanjis.value.filter(k => learnedKanjis.value.has(k)).length
})

const learnedPercentage = computed(() => {
  if (kanjis.value.length === 0) return 0
  return Math.round((learnedCount.value / kanjis.value.length) * 100)
})

const loadKanjis = async () => {
  const kanjiSet = await fetchJoyoSet()
  kanjis.value = Array.from(kanjiSet)
  loaded.value = true
  loadLearnedState()
}

const toggleLearned = (kanji: string) => {
  if (learnedKanjis.value.has(kanji)) {
    learnedKanjis.value.delete(kanji)
  } else {
    learnedKanjis.value.add(kanji)
  }
  saveLearnedState()
}

const isLearned = (kanji: string) => {
  return learnedKanjis.value.has(kanji)
}

const viewDetails = async (kanji: string) => {
  selectedKanji.value = kanji
  detailsModal.value?.showModal()
  await fetchKanjiDetails(kanji)
}

const saveLearnedState = () => {
  localStorage.setItem('kanji-joyo-learned', JSON.stringify([...learnedKanjis.value]))
}

const loadLearnedState = () => {
  try {
    const saved = localStorage.getItem('kanji-joyo-learned')
    if (saved) {
      learnedKanjis.value = new Set(JSON.parse(saved))
    }
  } catch (e) {
    console.error('Error loading learned state:', e)
  }
}
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
  transform: translateY(-4px) scale(1.02);
}
</style>