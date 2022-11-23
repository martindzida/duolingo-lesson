import { useEffect, useRef, useState } from 'react';
import WordTile from './components/WordTile';
import LessonHeader from './components/LessonHeader';
import RetryLessonBtn from './components/RetryLessonBtn';
import CheckBtn from './components/CheckBtn';
import CheckResponse from './components/CheckResponse';

export type wordObj = { id: number; word: string };

function App() {
  //TODO: api: https://github.com/lukePeavey/quotable
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

  const getProgress = (): number => Math.floor((curSenId / senteces.length) * 100);

  const handleLeaveLesson = () => {};

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-16 p-32'>
      <LessonHeader progress={getProgress()} handleLeaveLesson={handleLeaveLesson} />
      <CheckResponse />
      <div className='w-1/2 border-b-2 border-slate-500 p-2'>
        <div className='flex justify-center gap-8'>
          {picked.map((w: wordObj) => (
            <WordTile word={w} isPicked={false} handleTileClick={handleTileClick} />
          ))}
        </div>
      </div>
      <div className='flex justify-center gap-8'>
        {words.map((w: wordObj) => (
          <WordTile key={w.id} word={w} isPicked={picked.includes(w)} handleTileClick={handleTileClick} />
        ))}
      </div>
      <CheckBtn handleCheck={() => checkWordOrder(picked)} />
      <div>
        {isValid !== null && isValid && 'Correct'}
        {isValid !== null && !isValid && 'Try again'}
        {isCompleted && 'Congratulations!'}
      </div>
    </div>
  );
}

export default App;
