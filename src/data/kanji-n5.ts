export type KanjiCard = {
  id: string
  kanji: string
  meaning_pt: string
  romaji: string
}

export const KANJI_N5: KanjiCard[] = [
  { id: 'k01', kanji: '日', meaning_pt: 'dia / sol', romaji: 'nichi / hi' },
  { id: 'k02', kanji: '一', meaning_pt: 'um', romaji: 'ichi' },
  { id: 'k03', kanji: '人', meaning_pt: 'pessoa', romaji: 'hito / jin' },
  { id: 'k04', kanji: '月', meaning_pt: 'lua / mês', romaji: 'getsu / tsuki' },
  { id: 'k05', kanji: '火', meaning_pt: 'fogo', romaji: 'ka / hi' },
  { id: 'k06', kanji: '水', meaning_pt: 'água', romaji: 'sui / mizu' },
  { id: 'k07', kanji: '木', meaning_pt: 'árvore', romaji: 'moku / ki' },
  { id: 'k08', kanji: '金', meaning_pt: 'ouro / dinheiro', romaji: 'kin / kane' },
  { id: 'k09', kanji: '土', meaning_pt: 'terra', romaji: 'do / tsuchi' },
  { id: 'k10', kanji: '上', meaning_pt: 'acima', romaji: 'ue / jou' },
  { id: 'k11', kanji: '下', meaning_pt: 'abaixo', romaji: 'shita / ka' },
  { id: 'k12', kanji: '大', meaning_pt: 'grande', romaji: 'dai / ookii' },
  { id: 'k13', kanji: '小', meaning_pt: 'pequeno', romaji: 'shou / chii' },
  { id: 'k14', kanji: '中', meaning_pt: 'meio', romaji: 'chuu / naka' },
  { id: 'k15', kanji: '山', meaning_pt: 'montanha', romaji: 'yama / san' },
  { id: 'k16', kanji: '川', meaning_pt: 'rio', romaji: 'kawa / sen' },
  { id: 'k17', kanji: '学', meaning_pt: 'estudar / aprender', romaji: 'gaku / manabu' },
  { id: 'k18', kanji: '生', meaning_pt: 'vida / nascer', romaji: 'sei / ikiru' },
  { id: 'k19', kanji: '先', meaning_pt: 'anterior / à frente', romaji: 'sen / saki' },
  { id: 'k20', kanji: '行', meaning_pt: 'ir', romaji: 'kou / iku' },
]
