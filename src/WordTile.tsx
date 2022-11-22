import { wordObj } from './App';

interface Props {
  word: wordObj;
  isPicked: boolean;
  handleTileClick: (w: wordObj) => void;
}

//FIXME: make it more reusable
const WordTile = ({ word, isPicked, handleTileClick }: Props) => {
  return (
    <button
      disabled={isPicked}
      onClick={() => handleTileClick(word)}
      className={`bg-white rounded-lg ${isPicked ? 'cursor-not-allowed' : 'cursor-pointer'} px-5 py-3`}
    >
      {word.word}
    </button>
  );
};

export default WordTile;
