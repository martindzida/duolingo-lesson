import { useEffect, useRef, useState } from 'react';
import WordTile from './WordTile';

export type wordObj = { id: number; word: string };

function App() {
  const senteces: string[] = [
    'Duo calls for a lesson',
    'Duo wants to know your location',
    'How many lessons have you done today',
    'One lesson a day keeps the doctors away',
  ];

  const [curSenId, setCurSenId] = useState(0);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [words, setWords] = useState<wordObj[]>(shuffleArray(parseSentence(senteces[curSenId])));
  const [picked, setPicked] = useState<wordObj[]>([]);

  useEffect(() => {
    setWords(shuffleArray(parseSentence(senteces[curSenId])));
  }, [curSenId]);

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  function shuffleArray(array: wordObj[]): wordObj[] {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function parseSentence(sen: string): wordObj[] {
    return sen.split(' ').map((w: string, index) => {
      return { id: index, word: w };
    });
  }

  const checkWordOrder = (words: wordObj[]) => {
    const convStr = words.map((w: wordObj) => w.word).join(' ');
    const valid = convStr === senteces[curSenId];
    setIsValid(valid);
    //TODO: think of the end of the lesson
    if (valid) {
      if (curSenId < senteces.length - 1) setCurSenId(prev => prev + 1);
      else setIsCompleted(true);

      setPicked([]);
    }
  };

  const handleTileClick = (tile: wordObj) => {
    if (picked.includes(tile)) {
      setPicked(picked.filter((w: wordObj) => w.id !== tile.id));
    } else {
      setPicked(prev => [...prev, tile]);
    }
  };

  const progress = Math.floor((curSenId / senteces.length) * 100);

  return (
    <div className='w-screen h-screen bg-amber-400 flex flex-col items-center justify-center gap-16 p-32'>
      <div className='relative bg-slate-200 w-1/2 h-4 rounded-full'>
        <div className='absolute bg-lime-300 h-4 rounded-full' style={{ width: `${progress}%` }}></div>
      </div>
      <div className='flex flex-col items-center gap-16 p-24'>
        <div className='w-full border-b-2 border-slate-800 p-2'>
          <div className='flex gap-8'>
            {picked.map((w: wordObj) => (
              <button key={w.id} onClick={() => handleTileClick(w)} className='bg-white rounded-lg cursor-pointer px-5 py-3'>
                {w.word}
              </button>
            ))}
          </div>
        </div>
        <div className='flex gap-8'>
          {words.map((w: wordObj) => (
            <WordTile key={w.id} word={w} isPicked={picked.includes(w)} handleTileClick={handleTileClick} />
          ))}
        </div>
        <button
          onClick={() => checkWordOrder(picked)}
          className='bg-green-500 text-white rounded-lg px-8 py-2 transition ease-in-out duration-200 hover:bg-green-600'
        >
          Check
        </button>
        <div>
          {isValid !== null && isValid && 'Correct'}
          {isValid !== null && !isValid && 'Try again'}
          {isCompleted && 'Congratulations!'}
        </div>
      </div>
    </div>
  );
}

export default App;
