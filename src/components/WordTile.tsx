import { wordObj } from '../App';

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
      className={`bg-slate-100 shadow-md rounded-lg ${
        isPicked ? 'cursor-not-allowed' : 'cursor-pointer'
      } px-5 py-3 transition duration-200 ease-in-out hover:bg-slate-200`}
    >
      {word.word}
    </button>
  );
};

export default WordTile;
