import { WordObj } from '../App'
import WordTile from '../WordTile'

interface Props {
  words: WordObj[]
  picked: WordObj[]
  handleTileClick: (tile: WordObj) => void
}

const WordStackList = ({ words, picked, handleTileClick }: Props) => {
  return (
    <div className='flex justify-center gap-5'>
      {words.map((word: WordObj) => (
        <WordTile key={word.id} word={word} isPicked={picked.includes(word)} handleTileClick={() => handleTileClick(word)} />
      ))}
    </div>
  )
}

export default WordStackList
