import { WordObj } from '../App'

interface Props {
  word: WordObj
  isPicked: boolean
  handleTileClick: (w: WordObj) => void
}

const WordTile = ({ word, isPicked, handleTileClick }: Props) => {
  return (
    <button
      disabled={isPicked}
      onClick={() => handleTileClick(word)}
      className={`shadow-md rounded-lg px-5 py-3 ${
        isPicked
          ? 'bg-slate-300 text-slate-600 opacity-80 cursor-default'
          : 'bg-slate-100 transition duration-200 ease-in-out hover:bg-slate-200 cursor-pointer'
      }`}
    >
      {word.word}
    </button>
  )
}

export default WordTile
