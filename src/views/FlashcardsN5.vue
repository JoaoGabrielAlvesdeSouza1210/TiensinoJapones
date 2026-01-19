<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-3xl font-bold mb-6">Flashcards Kanji N5 — Repetição Espaçada</h1>

    <div v-if="!current" class="text-center">
      <p class="mb-4">Nenhum cartão vencido agora. Você pode revisar o restante do baralho ou resetar.</p>
      <button class="btn btn-primary mr-2" @click="startAll">Revisar baralho</button>
      <button class="btn btn-ghost" @click="reset">Resetar estatísticas</button>
    </div>

    <div v-else class="max-w-2xl mx-auto">
      <div class="flex justify-center">
        <a href="#" class="hover-3d my-12 mx-2 cursor-pointer" @click.prevent>
          <div class="card w-96 bg-black text-white bg-[radial-gradient(circle_at_bottom_left,#ffffff04_35%,transparent_36%),radial-gradient(circle_at_top_right,#ffffff04_35%,transparent_36%)] bg-size-[4.95em_4.95em]">
            <div class="card-body">
              <div class="flex justify-between mb-6">
                <div class="font-bold">TIENSINO JAPONÊS</div>
                <div class="text-5xl opacity-10">日本語</div>
              </div>

              <div class="text-center text-[6rem] leading-none font-bold">{{ current.kanji }}</div>

              <div class="mt-6 flex justify-between">
                <div>
                  <div class="text-xs opacity-20">SIGNIFICADO</div>
                  <div class="text-sm">{{ revealed ? current.meaning_pt : '---' }}</div>
                </div>
                <div>
                  <div class="text-xs opacity-20">ROMAJI</div>
                  <div class="text-sm">{{ revealed ? current.romaji : '---' }}</div>
                </div>
              </div>
            </div>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </a>
      </div>

      <div class="text-center mt-4">
        <div v-if="!revealed">
          <button class="btn btn-outline" @click="revealed = true">Mostrar resposta</button>
        </div>
        <div v-else class="space-y-4">
          <div class="flex justify-center gap-3 mt-2">
            <button class="btn btn-error" @click="answer(0)">De Novo</button>
            <button class="btn btn-warning" @click="answer(3)">Difícil</button>
            <button class="btn btn-success" @click="answer(4)">Bom</button>
            <button class="btn btn-primary" @click="answer(5)">Fácil</button>
          </div>
          <div class="mt-3">
            <button class="btn btn-ghost" @click="speakRomaji(current.romaji)">Ouvir leitura</button>
          </div>
          <div class="text-xs text-muted mt-4">
            Próxima revisão: {{ nextDue(current.id) }} — EF: {{ ef(current.id) }} — Repetição: {{ repetition(current.id) }}
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

function refreshQueue() {
  queue.value = dueCards.value.slice()
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

function reset() { resetAll(); refreshQueue(); current.value = queue.value[0] ?? null }

function speakRomaji(text: string) {
  if (!('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text.split('/')[0])
  u.lang = 'ja-JP'
  window.speechSynthesis.speak(u)
}

function nextDue(id: string) {
  try {
    const raw = localStorage.getItem('kanji-flashcards-v1')
    if (!raw) return '—'
    const map = JSON.parse(raw)
    if (!map[id]) return '—'
    return new Date(map[id].due).toLocaleString()
  } catch { return '—' }
}

function ef(id: string) {
  try { const raw = localStorage.getItem('kanji-flashcards-v1'); if (!raw) return '-' ; const map = JSON.parse(raw); return map[id]?.ef?.toFixed(2) ?? '-' } catch { return '-' }
}

function repetition(id: string) {
  try { const raw = localStorage.getItem('kanji-flashcards-v1'); if (!raw) return 0 ; const map = JSON.parse(raw); return map[id]?.repetition ?? 0 } catch { return 0 }
}

// initialize
if (!current.value) startAll()

</script>

<style scoped></style>
