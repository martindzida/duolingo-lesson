import parseSentence from './parseSentence'
import shuffleArray from './shuffleArray'
import { WordObj } from '../App'

const getWords = (sentence: string): WordObj[] => {
  return shuffleArray(parseSentence(sentence))
}

export default getWords
