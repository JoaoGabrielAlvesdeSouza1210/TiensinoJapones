<template>
  <div class="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          🔤 Kanjis por Leitura
        </h1>
        <p class="text-lg text-base-content/70">
          Busque kanjis pela sua leitura em hiragana ou katakana
        </p>
      </div>

      <!-- Busca -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Digite uma leitura (hiragana/katakana)</span>
              </label>
              <div class="join w-full">
                <input
                  v-model="searchReading"
                  type="text"
                  placeholder="Ex: あい, コウ, がく..."
                  class="input input-bordered input-lg join-item flex-1"
                  @keyup.enter="searchKanjis"
                />
                <button
                  @click="searchKanjis"
                  class="btn btn-primary btn-lg join-item"
                  :disabled="!searchReading || loading"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar
                </button>
              </div>
              <label class="label">
                <span class="label-text-alt">Exemplos comuns: あい, き, こう, せい, がく</span>
              </label>
            </div>

            <!-- Sugestões Rápidas -->
            <div class="mt-4">
              <p class="text-sm font-semibold mb-2">Leituras populares:</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="reading in popularReadings"
                  :key="reading"
                  @click="quickSearch(reading)"
                  class="badge badge-lg badge-outline cursor-pointer hover:badge-primary"
                >
                  {{ reading }}
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
      <div v-else-if="kanjis.length > 0">
        <!-- Info Card -->
        <div class="max-w-4xl mx-auto mb-8">
          <div class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 class="font-bold">Leitura: {{ currentReading }}</h3>
              <div class="text-sm">{{ kanjis.length }} kanji(s) encontrado(s) com esta leitura</div>
            </div>
          </div>
        </div>

        <!-- Grid de Kanjis -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-7xl mx-auto">
          <div
            v-for="(kanji, index) in kanjis"
            :key="kanji"
            class="card bg-gradient-to-br from-base-100 to-base-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-primary/30 hover:border-primary"
            :style="{ animationDelay: `${index * 0.05}s` }"
            @click="viewDetails(kanji)"
          >
            <div class="card-body items-center text-center p-4">
              <div class="text-6xl font-bold">{{ kanji }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="searched && !loading" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-2xl font-bold mb-2">Nenhum Kanji Encontrado</h3>
        <p class="text-base-content/70">Tente outra leitura</p>
      </div>

      <!-- Initial State -->
      <div v-else class="text-center py-20">
        <div class="text-6xl mb-4">🔤</div>
        <h3 class="text-2xl font-bold mb-2">Busque Kanjis por Leitura</h3>
        <p class="text-base-content/70">Digite uma leitura em hiragana ou katakana acima</p>
      </div>
    </div>

    <!-- Modal de Detalhes (mesmo do anterior) -->
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
              <div class="badge badge-primary badge-lg" v-if="kanjiApiDetails.grade">Grau {{ kanjiApiDetails.grade }}</div>
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
import { ref } from 'vue'
import { useKanjiApi } from '@/composables/useKanjiApi'

const searchReading = ref('')
const currentReading = ref('')
const kanjis = ref<string[]>([])
const searched = ref(false)
const selectedKanji = ref<string | null>(null)
const detailsModal = ref<HTMLDialogElement | null>(null)

const popularReadings = ['あい', 'き', 'こう', 'せい', 'がく', 'しん', 'じん', 'にち', 'ほん', 'だい']

const { 
  loading,
  error,
  loading: loadingDetails,
  error: errorDetails,
  kanjiDetails: kanjiApiDetails,
  fetchReadingList,
  fetchKanjiDetails
} = useKanjiApi()

const searchKanjis = async () => {
  if (!searchReading.value.trim()) return
  
  searched.value = true
  currentReading.value = searchReading.value
  const allKanji = await fetchReadingList(searchReading.value)
  kanjis.value = [ ...allKanji.main_kanji, ...allKanji.name_kanji ]
}

const quickSearch = (reading: string) => {
  searchReading.value = reading
  searchKanjis()
}

const viewDetails = async (kanji: string) => {
  selectedKanji.value = kanji
  detailsModal.value?.showModal()
  await fetchKanjiDetails(kanji)
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