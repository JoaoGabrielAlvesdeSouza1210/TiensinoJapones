import { ref, type Ref } from 'vue'

/**
 * Interface para dados detalhados do kanji da API
 */
interface KanjiDetails {
  kanji: string
  grade: number | null
  stroke_count: number
  meanings: string[]
  br_meanings: string[]
  kun_readings: string[]
  on_readings: string[]
  name_readings: string[]
  jlpt: number | null
  unicode: string
  heisig_en: string | null
}

/**
 * Interface para resposta da API MyMemory
 */
interface MyMemoryResponse {
  responseData: {
    translatedText: string
  }
  responseStatus: number
}

/**
 * Composable para gerenciar a API de Kanji
 * @returns Objeto com estados e métodos para buscar informações de kanji
 */
export function useKanjiApi() {
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const kanjiDetails: Ref<KanjiDetails | null> = ref(null)
  const kanjiCache: Ref<Map<string, KanjiDetails>> = ref(new Map())
  const translationCache: Ref<Map<string, string>> = ref(new Map())

  /**
   * Cria a api base para requisitar o kanjiapi
   * @param url - Endpoint da API a ser chamado
   * @returns Promise com os dados da resposta
   */
  const Kanjiapi = async (url: string): Promise<any> => {
    try {
      const response = await fetch(`https://kanjiapi.dev/v1/${url}`)
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      data.br_meanings = await translateMeanings(data.meanings)
      return data
    } catch (error) {
      throw new Error('Erro ao acessar a API de Kanji')
    }
  }

  /**
   * Traduz um texto do inglês para português usando MyMemory API
   * @param text - Texto em inglês para traduzir
   * @returns Promise com texto traduzido em português
   */
  const translateText = async (text: string): Promise<string> => {
    // Verifica cache de tradução
    if (translationCache.value.has(text)) {
      return translationCache.value.get(text)!
    }

    try {
      const encodedText = encodeURIComponent(text)
      const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|pt-BR`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Erro na API de tradução')
      }
      
      const data: MyMemoryResponse = await response.json()
      
      if (data.responseStatus === 200) {
        const translated = data.responseData.translatedText
        translationCache.value.set(text, translated)
        return translated
      }
      
      return text
    } catch (error) {
      console.warn(`Erro ao traduzir "${text}":`, error)
      return text
    }
  }

  /**
   * Traduz um array de significados do inglês para português
   * @param meanings - Array de significados em inglês
   * @returns Promise com array de significados traduzidos
   */
  const translateMeanings = async (meanings: string[]): Promise<string[]> => {
    try {
      const translatedMeanings: string[] = []
      
      // Traduz em lotes para evitar sobrecarga da API
      if (meanings?.length > 0) {
        meanings.forEach(async (meaning) => {
            const translated = await translateText(meaning)
            translatedMeanings.push(translated)
            await new Promise(resolve => setTimeout(resolve, 200))
        })

        await new Promise(resolve => setTimeout(resolve, meanings.length * 700))

      }

      return translatedMeanings
    } catch (error) {
      console.error('Erro ao traduzir significados:', error)
      return meanings
    }
  }

  /**
   * Busca informações detalhadas de um kanji
   * @param kanjiChar - Caractere do kanji a buscar
   * @returns Promise com detalhes do kanji ou null em caso de erro
   */
  const fetchKanjiDetails = async (kanjiChar: string): Promise<KanjiDetails | null> => {
    if (kanjiCache.value.has(kanjiChar)) {
      kanjiDetails.value = kanjiCache.value.get(kanjiChar)!
      return kanjiDetails.value
    }

    loading.value = true
    error.value = null

    try {
      const data = await Kanjiapi(`kanji/${kanjiChar}`)
      
      const details: KanjiDetails = {
        kanji: data.kanji,
        grade: data.grade,
        stroke_count: data.stroke_count,
        meanings: data.meanings,
        br_meanings: data.br_meanings,
        kun_readings: data.kun_readings || [],
        on_readings: data.on_readings || [],
        name_readings: data.name_readings || [],
        jlpt: data.jlpt,
        unicode: data.unicode,
        heisig_en: data.heisig_en
      }

      kanjiCache.value.set(kanjiChar, details)
      kanjiDetails.value = details

      return details
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao buscar informações do kanji'
      console.error('Erro ao buscar kanji:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Busca múltiplos kanjis de um determinado grau escolar (1-6)
   * @param grade - Grau escolar (1-6)
   * @returns Promise com Set de kanjis do grau especificado
   */
  const fetchKanjisByGrade = async (grade: number): Promise<Set<string>> => {
    const data = await Kanjiapi(`kanji/grade-${grade}`)
    return new Set(data)
  }

  /**
   * Busca kanjis de uma leitura específica
   * @param reading - Leitura em hiragana ou katakana
   * @returns Promise com array de kanjis
   */
  const fetchReadingList = async (reading: string): Promise<
  {
    main_kanji: string[], 
    name_kanji: string[]
  }
  > => {
    const data = await Kanjiapi(`reading/${reading}`)
    return data
  }

  /**
   * Busca palavras que contém um kanji específico
   * @param kanjiChar - Caractere do kanji
   * @returns Promise com array de palavras
   */
  const fetchWords = async (kanjiChar: string): Promise<any[]> => {
    const data = await Kanjiapi(`words/${kanjiChar}`)
    return data
  }

  /**
   * Busca kanjis regulares (Jōyō)
   * @returns Promise com Set de kanjis Jōyō
   */
  const fetchJoyoSet = async (): Promise<Set<string>> => {
    const data = await Kanjiapi('kanji/joyo')
    return new Set(data)
  }

  /**
   * Busca kanjis de nomes próprios (Jinmeiyō)
   * @returns Promise com Set de kanjis Jinmeiyō
   */
  const fetchJinmeiyoSet = async (): Promise<Set<string>> => {
    const data = await Kanjiapi('kanji/jinmeiyo')
    return new Set(data)
  }

  /**
   * Busca kanjis por nível JLPT
   * @param jlptLevel - Nível do JLPT (1-5)
   * @returns Promise com array de kanjis
   */
  const fetchKanjisByJlpt = async (jlptLevel: number): Promise<string[] | undefined> => {
    const data = await Kanjiapi(`kanji/jlpt-${jlptLevel}`)
    return data
  }

  /**
   * Busca todos os kanjis disponíveis
   * @returns Promise com array de todos os kanjis
   */
  const fetchAllKanjis = async (): Promise<string[] | undefined> => {
    const data = await Kanjiapi('kanji/all')
    return data
  }

  /**
   * Limpa o cache de kanjis
   * @returns void
   */
  const clearCache = (): void => {
    kanjiCache.value.clear()
    kanjiDetails.value = null
    translationCache.value.clear()
  }

  /**
   * Formata leituras kun em string legível
   * @param readings - Array de leituras kun
   * @returns String formatada com as leituras
   */
  const formatKunReadings = (readings: string[]): string => {
    if (!readings || readings.length === 0) return 'Não disponível'
    return readings.join(', ')
  }

  /**
   * Formata leituras on em string legível
   * @param readings - Array de leituras on
   * @returns String formatada com as leituras
   */
  const formatOnReadings = (readings: string[]): string => {
    if (!readings || readings.length === 0) return 'Não disponível'
    return readings.join(', ')
  }

  return {
    loading,
    error,
    kanjiDetails,
    fetchKanjiDetails,
    fetchKanjisByGrade,
    fetchReadingList,
    fetchJoyoSet,
    fetchJinmeiyoSet,
    fetchKanjisByJlpt,
    fetchAllKanjis,
    fetchWords,
    clearCache,
    formatKunReadings,
    formatOnReadings,
    translateMeanings
  }
}