import { useEffect, useState } from 'react';
import WordTile from './components/WordTile';
import LessonHeader from './components/LessonHeader';
import CheckBtn from './components/CheckBtn';
import CheckResponse from './components/CheckResponse';
import useShuffleArray from './utils/useShuffleArray';
import useParseSentence from './utils/useParseSente';
import useGetProgress from './utils/useGetProgress';

export type wordObj = { id: number; word: string };

function App() {
  //TODO: find font on Google Fonts
  const senteces: string[] = [
    'Duo calls for a lesson',
    'Duo wants to know your location',
    'How many lessons have you done today',
    'One lesson a day keeps the doctors away',
  ];

  const [curSenId, setCurSenId] = useState(0);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [words, setWords] = useState<wordObj[]>(useShuffleArray(useParseSentence(senteces[curSenId])));
  const [picked, setPicked] = useState<wordObj[]>([]);
  const [streak, setStreak] = useState(0);
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    setWords(useShuffleArray(useParseSentence(senteces[curSenId])));
    setIsValid(null);
    setCanContinue(false);
  }, [canContinue]);

  const checkWordOrder = (words: wordObj[]) => {
    const convStr = words.map((w: wordObj) => w.word).join(' ');
    const valid = convStr === senteces[curSenId];
    setIsValid(valid);
    //TODO: think of the end of the lesson
    if (valid) {
      if (curSenId < senteces.length - 1) {
        setCurSenId(prev => prev + 1);
        setStreak(prev => prev + 1);
      } else {
        setIsCompleted(true);
      }

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

  const handleLeaveLesson = () => {};

  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-center gap-16'>
      <LessonHeader progress={useGetProgress(curSenId, senteces.length)} streak={streak} handleLeaveLesson={handleLeaveLesson} />
      <div className='w-1/2 h-32 flex justify-center gap-5 items-end border-b-2 border-slate-500 p-2 border-opacity-60'>
        {picked.map((w: wordObj) => (
          <WordTile key={w.id} word={w} isPicked={false} handleTileClick={handleTileClick} />
        ))}
      </div>
      <div className='flex justify-center gap-5'>
        {words.map((w: wordObj) => (
          <WordTile key={w.id} word={w} isPicked={picked.includes(w)} handleTileClick={handleTileClick} />
        ))}
      </div>
      <CheckBtn isDisabled={picked.length === 0} handleCheck={() => checkWordOrder(picked)} />
      <div>{isCompleted && 'Congratulations!'}</div>
      {isValid !== null && <CheckResponse isCorrect={isValid} correctAnswer={senteces[curSenId]} handleContinue={() => setCanContinue(true)} />}
    </div>
  );
}

export default App;
