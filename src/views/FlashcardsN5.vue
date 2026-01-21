<template>
  <div class="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
    <!-- Header Section com tema japonês -->
    <div class="hero min-h-[30vh] bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 relative overflow-hidden">
      <!-- Elementos decorativos japoneses no fundo -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute top-10 left-10 text-8xl">🌸</div>
        <div class="absolute top-20 right-20 text-8xl">🎴</div>
        <div class="absolute bottom-20 left-1/4 text-8xl">📚</div>
        <div class="absolute bottom-10 right-1/3 text-8xl">✨</div>
      </div>

      <div class="hero-content text-center relative z-0">
        <div class="max-w-4xl">
          <div class="badge badge-primary badge-lg mb-4 gap-2 animate-pulse">
            🎴 Sistema de Repetição Espaçada
          </div>
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Flashcards <span class="text-primary">Kanji N5</span>
          </h1>
          <p class="text-lg md:text-xl text-base-content/80 mb-6">
            Memorize os kanjis com o <span class="font-semibold text-primary">método científico</span> de repetição espaçada
          </p>

          <!-- Estatísticas no header -->
          <div class="stats shadow-lg bg-base-100/90 backdrop-blur">
            <div class="stat place-items-center">
              <div class="stat-title">Cartões Hoje</div>
              <div class="stat-value text-primary">{{ dueCards.length }}</div>
              <div class="stat-desc">Para revisar</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Restantes</div>
              <div class="stat-value text-secondary">{{ queue.length }}</div>
              <div class="stat-desc">Nesta sessão</div>
            </div>
            <div class="stat place-items-center">
              <div class="stat-title">Completos</div>
              <div class="stat-value text-accent">{{ completedCount }}</div>
              <div class="stat-desc">Hoje</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Área de Flashcard -->
    <div class="container mx-auto px-4 py-12">
      <!-- Mensagem quando não há cartões -->
      <div v-if="!current" class="text-center py-20 max-w-2xl mx-auto">
        <div class="card bg-base-100 shadow-xl border border-base-300">
          <div class="card-body items-center text-center gap-6">
            <div class="text-8xl animate-bounce">🎉</div>
            <h2 class="card-title text-3xl">Parabéns!</h2>
            <p class="text-lg text-base-content/80">
              Você revisou todos os cartões disponíveis hoje. Continue assim e domine os kanjis do N5!
            </p>
            <div class="divider"></div>
            <div class="card-actions flex-col sm:flex-row gap-4 w-full">
              <button class="btn btn-primary btn-lg gap-2 flex-1" @click="startAll">
                📚 Revisar Baralho Completo
              </button>
              <button class="btn btn-outline btn-lg gap-2 flex-1" @click="reset">
                🔄 Resetar Estatísticas
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card de Flashcard -->
      <div v-else class="max-w-3xl mx-auto">
        <!-- Indicador de Progresso -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-semibold">Progresso da Sessão</span>
            <span class="text-sm text-base-content/60">
              {{ completedInSession }} / {{ totalInSession }} cartões
            </span>
          </div>
          <progress 
            class="progress progress-primary w-full" 
            :value="completedInSession" 
            :max="totalInSession"
          ></progress>
        </div>

        <!-- Flashcard com efeito 3D -->
        <div class="flex justify-center mb-8">
          <div 
            class="hover-3d my-12 mx-2 cursor-pointer perspective-1000"
            @click="revealed ? null : (revealed = true)"
          >
            <div class="card w-full max-w-xl bg-gradient-to-br from-base-100 to-base-200 shadow-2xl border-4 border-primary/20 hover:border-primary/40 transition-all duration-300 relative overflow-hidden">
              <!-- Padrão decorativo de fundo -->
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--p),0.03)_35%,transparent_36%),radial-gradient(circle_at_top_right,rgba(var(--p),0.03)_35%,transparent_36%)] bg-[length:4.95em_4.95em] pointer-events-none"></div>
              
              <!-- Badge superior -->
              <div class="absolute top-4 left-4 z-10">
                <div class="badge badge-primary gap-2">
                  🎴 Kanji N5
                </div>
              </div>
              
              <!-- Decoração superior direita -->
              <div class="absolute top-4 right-4 text-6xl opacity-10 pointer-events-none">
                日本語
              </div>

              <div class="card-body py-12 px-8 relative z-10">
                <!-- Kanji Principal -->
                <div class="text-center mb-8">
                  <div 
                    class="text-[10rem] leading-none font-bold transition-transform duration-500 hover:scale-110"
                    :class="{ 'animate-pulse': !revealed }"
                  >
                    {{ current.kanji }}
                  </div>
                </div>

                <!-- Divider decorativo -->
                <div class="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent mb-8"></div>

                <!-- Informações do Kanji -->
                <div class="grid grid-cols-2 gap-6">
                  <div class="text-center p-4 rounded-lg bg-base-200/50 backdrop-blur">
                    <div class="text-xs uppercase tracking-wider opacity-60 mb-2">Significado</div>
                    <div class="text-xl font-semibold min-h-[2rem] flex items-center justify-center">
                      <span v-if="revealed" class="animate-fade-in">{{ current.meaning_pt }}</span>
                      <span v-else class="text-4xl">❓</span>
                    </div>
                  </div>
                  <div class="text-center p-4 rounded-lg bg-base-200/50 backdrop-blur">
                    <div class="text-xs uppercase tracking-wider opacity-60 mb-2">Romaji</div>
                    <div class="text-xl font-mono font-semibold min-h-[2rem] flex items-center justify-center">
                      <span v-if="revealed" class="animate-fade-in">{{ current.romaji }}</span>
                      <span v-else class="text-4xl">❓</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Decoração inferior -->
              <div class="absolute -bottom-4 -right-4 text-8xl opacity-5 pointer-events-none">
                🌸
              </div>
            </div>

            <!-- Divs para efeito hover-3d -->
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <!-- Controles de Resposta -->
        <div class="text-center space-y-6">
          <!-- Botão Mostrar Resposta -->
          <div v-if="!revealed" class="animate-bounce">
            <button 
              class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-shadow"
              @click="revealed = true"
            >
              👁️ Mostrar Resposta
            </button>
            <p class="text-sm text-base-content/60 mt-4">
              Tente se lembrar antes de revelar!
            </p>
          </div>

          <!-- Botões de Avaliação -->
          <div v-else class="space-y-6 animate-fade-in">
            <div class="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Como foi sua lembrança?</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button 
                class="btn btn-error btn-lg flex-col h-auto py-4 gap-2 hover:scale-105 transition-transform"
                @click="answer(0)"
              >
                <span class="text-2xl">😓</span>
                <span>De Novo</span>
                <span class="text-xs opacity-70">&lt;1 min</span>
              </button>
              <button 
                class="btn btn-warning btn-lg flex-col h-auto py-4 gap-2 hover:scale-105 transition-transform"
                @click="answer(3)"
              >
                <span class="text-2xl">😕</span>
                <span>Difícil</span>
                <span class="text-xs opacity-70">~10 min</span>
              </button>
              <button 
                class="btn btn-success btn-lg flex-col h-auto py-4 gap-2 hover:scale-105 transition-transform"
                @click="answer(4)"
              >
                <span class="text-2xl">😊</span>
                <span>Bom</span>
                <span class="text-xs opacity-70">~1 dia</span>
              </button>
              <button 
                class="btn btn-primary btn-lg flex-col h-auto py-4 gap-2 hover:scale-105 transition-transform"
                @click="answer(5)"
              >
                <span class="text-2xl">🤩</span>
                <span>Fácil</span>
                <span class="text-xs opacity-70">~4 dias</span>
              </button>
            </div>

            <!-- Botão de Áudio -->
            <div>
              <button 
                class="btn btn-outline gap-2"
                @click="speakRomaji(current.romaji)"
              >
                🔊 Ouvir Pronúncia
              </button>
            </div>

            <!-- Informações Técnicas -->
            <div class="collapse collapse-arrow bg-base-200">
              <input type="checkbox" /> 
              <div class="collapse-title font-medium">
                📊 Estatísticas de Aprendizado
              </div>
              <div class="collapse-content"> 
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div class="stat bg-base-100 rounded-lg">
                    <div class="stat-title">Próxima Revisão</div>
                    <div class="stat-value text-sm">{{ nextDue(current.id) }}</div>
                  </div>
                  <div class="stat bg-base-100 rounded-lg">
                    <div class="stat-title">Fator de Facilidade</div>
                    <div class="stat-value text-2xl">{{ ef(current.id) }}</div>
                  </div>
                  <div class="stat bg-base-100 rounded-lg">
                    <div class="stat-title">Repetições</div>
                    <div class="stat-value text-2xl">{{ repetition(current.id) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dicas de Uso -->
        <div class="mt-12 max-w-2xl mx-auto">
          <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
              <div class="font-bold">💡 Dica de Estudo</div>
              <div class="text-sm">A repetição espaçada aumenta a retenção em até 200%! Revise diariamente.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFlashcards } from '@/composables/useFlashcards'

const { dueCards, sampleNext, review, resetAll } = useFlashcards()

const queue = ref(dueCards.value.slice())
const current = ref(queue.value[0] ?? sampleNext())
const revealed = ref(false)
const totalInSession = ref(queue.value.length || 1)

// Computed properties
const completedInSession = computed(() => totalInSession.value - queue.value.length)

const completedCount = computed(() => {
  // Conta quantos cartões foram completados hoje (com qualquer qualidade)
  try {
    const raw = localStorage.getItem('kanji-flashcards-v1')
    if (!raw) return 0
    const map = JSON.parse(raw)
    const today = new Date().toDateString()
    return Object.values(map).filter((item: any) => {
      const itemDate = new Date(item.due).toDateString()
      return item.repetition > 0 && itemDate !== today
    }).length
  } catch {
    return 0
  }
})

function refreshQueue() {
  queue.value = dueCards.value.slice()
  totalInSession.value = queue.value.length || 1
}

function startAll() {
  refreshQueue()
  current.value = queue.value[0] ?? sampleNext()
  revealed.value = false
}

function answer(quality: number) {
  if (!current.value) return
  review(current.value.id, quality)
  // remove current from queue
  queue.value = queue.value.filter(c => c.id !== current.value!.id)
  current.value = queue.value[0] ?? null
  revealed.value = false
}

function reset() {
  if (confirm('Tem certeza que deseja resetar todas as estatísticas? Esta ação não pode ser desfeita.')) {
    resetAll()
    refreshQueue()
    current.value = queue.value[0] ?? null
  }
}

function speakRomaji(text: string) {
  if (!('speechSynthesis' in window)) {
    alert('Seu navegador não suporta síntese de voz.')
    return
  }
  const reading = text.split('/')[0]
  const utterance = new SpeechSynthesisUtterance(reading)
  utterance.lang = 'ja-JP'
  utterance.rate = 0.8 // Um pouco mais devagar para aprendizado
  window.speechSynthesis.speak(utterance)
}

function nextDue(id: string) {
  try {
    const raw = localStorage.getItem('kanji-flashcards-v1')
    if (!raw) return 'Nunca revisado'
    const map = JSON.parse(raw)
    if (!map[id]) return 'Nunca revisado'
    const dueDate = new Date(map[id].due)
    const now = new Date()
    
    if (dueDate < now) return 'Agora'
    
    const diffMs = dueDate.getTime() - now.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    
    if (diffMins < 60) return `${diffMins} min`
    if (diffHours < 24) return `${diffHours}h`
    return `${diffDays} dias`
  } catch {
    return 'Erro'
  }
}

function ef(id: string) {
  try {
    const raw = localStorage.getItem('kanji-flashcards-v1')
    if (!raw) return '2.5'
    const map = JSON.parse(raw)
    return map[id]?.ef?.toFixed(2) ?? '2.5'
  } catch {
    return '2.5'
  }
}

function repetition(id: string) {
  try {
    const raw = localStorage.getItem('kanji-flashcards-v1')
    if (!raw) return 0
    const map = JSON.parse(raw)
    return map[id]?.repetition ?? 0
  } catch {
    return 0
  }
}

// initialize
if (!current.value) startAll()
</script>

<style scoped>
/* Animações personalizadas */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Efeito 3D para o card */
.hover-3d {
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.hover-3d:hover {
  transform: rotateY(5deg) rotateX(5deg);
}

/* Estilo do kanji com sombra japonesa */
.card-body > div:first-of-type > div {
  font-family: 'Noto Sans JP', 'Yu Gothic', 'Meiryo', sans-serif;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Animação da barra de progresso */
@keyframes progressGlow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.progress {
  animation: progressGlow 2s ease-in-out infinite;
}

/* Efeito hover nos botões de avaliação */
.btn:hover {
  transform: scale(1.05) translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Perspectiva para efeito 3D */
.perspective-1000 {
  perspective: 1000px;
}
</style>
