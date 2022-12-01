import { wordObj } from '../App'

const parseSentence = (sen: string): wordObj[] => {
  return sen.split(' ').map((w: string, index) => {
    return { id: index, word: w }
  })
}

export default parseSentence
