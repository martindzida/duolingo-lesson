import { WordObj } from '../App'

const parseSentence = (sen: string): WordObj[] => {
  return sen.split(' ').map((w: string, index) => {
    return { id: index, word: w }
  })
}

export default parseSentence
