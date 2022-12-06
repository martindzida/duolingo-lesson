import { WordObj } from '../App'
import WordTile from '../WordTile'

interface Props {
  picked: WordObj[]
  handleTileClick: (tile: WordObj) => void
}

const WordTilesList = ({ picked, handleTileClick }: Props) => {
  return (
    <div className='w-1/2 h-32 flex justify-center gap-5 items-end border-b-2 border-slate-500 p-2 border-opacity-60'>
      {picked.map((word: WordObj) => (
        <WordTile key={word.id} word={word} isPicked={false} handleTileClick={() => handleTileClick(word)} />
      ))}
    </div>
  )
}

export default WordTilesList
