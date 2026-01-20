import { ref, computed } from 'vue'
import type { KanjiCard } from '@/data/kanji-n5'
import { KANJI_N5 } from '@/data/kanji-n5'

type CardState = {
  id: string
  due: number // timestamp
  interval: number // days
  repetition: number
  ef: number
  lastReviewed?: number
}

const STORAGE_KEY = 'kanji-flashcards-v1'

function nowTs() { return Date.now() }

function loadState(): Record<string, CardState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch (e) {
    console.warn('Failed to load flashcards state', e)
    return {}
  }
}

function saveState(state: Record<string, CardState>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function defaultStateFor(id: string): CardState {
  return {
    id,
    due: nowTs(),
    interval: 0,
    repetition: 0,
    ef: 2.5,
  }
}

// SM-2 algorithm
function reviewCard(cardState: CardState, quality: number) {
  // quality 0..5
  if (quality < 3) {
    cardState.repetition = 0
    cardState.interval = 1
  } else {
    cardState.repetition += 1
    if (cardState.repetition === 1) cardState.interval = 1
    else if (cardState.repetition === 2) cardState.interval = 6
    else cardState.interval = Math.round(cardState.interval * cardState.ef)
  }

  // update EF
  const q = quality
  const newEf = cardState.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  cardState.ef = Math.max(1.3, newEf)

  const nextDue = Date.now() + cardState.interval * 24 * 3600 * 1000
  cardState.due = nextDue
  cardState.lastReviewed = Date.now()
}

export function useFlashcards() {
  const raw = loadState()

  // build full deck with state
  const deck = KANJI_N5.map(k => ({
    ...k,
    state: raw[k.id] ?? defaultStateFor(k.id),
  }))

  const stateMap = ref<Record<string, CardState>>({})
  deck.forEach(d => { stateMap.value[d.id] = d.state })

  function persist() { saveState(stateMap.value) }

  const dueCards = computed(() => {
    const now = Date.now()
    return deck
      .map(d => ({ ...d, state: stateMap.value[d.id] || { due: 0 } }))
      .filter(d => d.state.due <= now)
      .sort((a, b) => (a.state.due - b.state.due))
  })

  function sampleNext() {
    const due = dueCards.value
    if (!due.length) return null
    return due[0]
  }

  function review(id: string, quality: number) {
    const s = stateMap.value[id]
    if (!s) return
    reviewCard(s, quality)
    persist()
  }

  function resetAll() {
    const map: Record<string, CardState> = {}
    KANJI_N5.forEach(k => { map[k.id] = defaultStateFor(k.id) })
    stateMap.value = map
    persist()
  }

  return {
    deck,
    dueCards,
    sampleNext,
    review,
    resetAll,
  }
}
