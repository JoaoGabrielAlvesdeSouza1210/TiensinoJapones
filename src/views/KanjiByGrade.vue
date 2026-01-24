<template>
  <div class="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          📚 Kanjis por Grau Escolar
        </h1>
        <p class="text-lg text-base-content/70">
          Explore os kanjis ensinados em cada série do ensino fundamental japonês
        </p>
      </div>

      <!-- Seletor de Grau -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title mb-4">Selecione o Grau Escolar</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <button
                v-for="grade in 6"
                :key="grade"
                @click="selectGrade(grade)"
                class="btn btn-lg"
                :class="selectedGrade === grade ? 'btn-primary' : 'btn-outline btn-primary'"
              >
                {{ grade }}º Ano
                <div class="badge badge-sm" v-if="selectedGrade === grade && kanjis.length > 0">
                  {{ kanjis.length }}
                </div>
              </button>
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

      <!-- Estatísticas -->
      <div v-else-if="kanjis.length > 0" class="max-w-7xl mx-auto mb-8">
        <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <div class="stat-title">Grau Selecionado</div>
            <div class="stat-value text-primary">{{ selectedGrade }}º Ano</div>
            <div class="stat-desc">Ensino fundamental japonês</div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="stat-title">Total de Kanjis</div>
            <div class="stat-value text-secondary">{{ kanjis.length }}</div>
            <div class="stat-desc">Neste grau escolar</div>
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

      <!-- Grid de Kanjis -->
      <div v-if="kanjis.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
        <div
          v-for="(kanji, index) in kanjis"
          :key="kanji"
          class="card bg-gradient-to-br from-base-100 to-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2"
          :class="[
            isLearned(kanji) ? 'border-success ring-2 ring-success' : 'border-primary/30 hover:border-primary'
          ]"
          :style="{ animationDelay: `${index * 0.05}s` }"
          @click="viewDetails(kanji)"
        >
          <div class="card-body items-center text-center p-4">
            <div class="text-6xl font-bold mb-2">{{ kanji }}</div>
            
            <div class="card-actions">
              <button
                @click.stop="toggleLearned(kanji)"
                class="btn btn-circle btn-sm"
                :class="isLearned(kanji) ? 'btn-success' : 'btn-ghost'"
              >
                <svg v-if="isLearned(kanji)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!loading && !error" class="text-center py-20">
        <div class="text-6xl mb-4">📚</div>
        <h3 class="text-2xl font-bold mb-2">Selecione um Grau</h3>
        <p class="text-base-content/70">Escolha um ano escolar acima para ver os kanjis</p>
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
              <div class="badge badge-primary badge-lg">Grau {{ kanjiApiDetails.grade }}</div>
              <div class="badge badge-secondary badge-lg" v-if="kanjiApiDetails.jlpt">JLPT N{{ kanjiApiDetails.jlpt }}</div>
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
                  <div class="flex justify-between">
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

const selectedGrade = ref<number | null>(null)
const kanjis = ref<string[]>([])
const learnedKanjis = ref<Set<string>>(new Set())
const selectedKanji = ref<string | null>(null)
const detailsModal = ref<HTMLDialogElement | null>(null)

const { 
  loading,
  error,
  loading: loadingDetails,
  error: errorDetails,
  kanjiDetails: kanjiApiDetails,
  fetchKanjisByGrade,
  fetchKanjiDetails
} = useKanjiApi()

const learnedCount = computed(() => {
  return kanjis.value.filter(k => learnedKanjis.value.has(k)).length
})

const learnedPercentage = computed(() => {
  if (kanjis.value.length === 0) return 0
  return Math.round((learnedCount.value / kanjis.value.length) * 100)
})

const selectGrade = async (grade: number) => {
  selectedGrade.value = grade
  const kanjiSet = await fetchKanjisByGrade(grade)
  kanjis.value = Array.from(kanjiSet)
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
  if (selectedGrade.value) {
    localStorage.setItem(`kanji-grade-${selectedGrade.value}-learned`, JSON.stringify([...learnedKanjis.value]))
  }
}

const loadLearnedState = () => {
  if (selectedGrade.value) {
    try {
      const saved = localStorage.getItem(`kanji-grade-${selectedGrade.value}-learned`)
      if (saved) {
        learnedKanjis.value = new Set(JSON.parse(saved))
      } else {
        learnedKanjis.value = new Set()
      }
    } catch (e) {
      console.error('Error loading learned state:', e)
      learnedKanjis.value = new Set()
    }
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