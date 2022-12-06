import { useEffect, useState } from 'react'
import WordTile from './components/WordTile'
import LessonHeader from './components/LessonHeader'
import CheckBtn from './components/CheckBtn'
import CheckResponse from './components/CheckResponse'
import getProgress from './utils/getProgress'
import getWords from './utils/getWords'
import fetchQuotes from './utils/fetchQuotes'
import { useQuery } from '@tanstack/react-query'
import StartPage from './components/StartPage'
import PickedTilesList from './components/PickedTilesList'
import WordStackList from './components/WordStackList'

export type WordObj = { id: number; word: string }

function App() {
  //TODO: find font on Google Fonts
  const senteces: string[] = ['Duo calls for a lesson', 'Duo wants to know your location']

  const [curSenId, setCurSenId] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [words, setWords] = useState<WordObj[]>([])
  const [picked, setPicked] = useState<WordObj[]>([])
  const [streak, setStreak] = useState(0)
  const [canContinue, setCanContinue] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState<WordObj[]>([])
  const [isOngoing, setIsOngoing] = useState(true)

  useEffect(() => {
    setWords(getWords(senteces[curSenId]))
    setIsCorrect(null)
    setCanContinue(false)
    setPicked([])
  }, [canContinue])

  const { data, isLoading } = useQuery(['getQuotes'], fetchQuotes)
  console.log(data)
  if (isLoading) {
    return <div>Loading...</div>
  }

  //FIXME: cursed
  const checkWordOrder = (words: WordObj[]) => {
    const convStr = words.map((w: WordObj) => w.word).join(' ')
    const correct = convStr === senteces[curSenId]
    if (correct) {
      setIsCorrect(correct)
      setStreak(prev => prev + 1)
      if (curSenId < senteces.length - 1) {
        setCorrectAnswersCount(prev => prev + 1)
        setCurSenId(prev => prev + 1)
      } else {
        setIsCompleted(true)
      }
    } else {
      setWrongAnswers(getWords(senteces[curSenId]))
      setStreak(0)
    }
  }

  const handleTileClick = (tile: WordObj) => {
    if (picked.includes(tile)) {
      setPicked(picked.filter((word: WordObj) => word.id !== tile.id))
    } else {
      setPicked(prev => [...prev, tile])
    }
  }

  const handleLeaveLesson = () => {
    setIsOngoing(false)
  }

  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-center gap-16'>
      {!isOngoing && <StartPage />}
      <LessonHeader progress={getProgress(correctAnswersCount, senteces.length)} streak={streak} handleLeaveLesson={handleLeaveLesson} />
      <PickedTilesList picked={picked} handleTileClick={handleTileClick} />
      <WordStackList words={words} picked={picked} handleTileClick={handleTileClick} />
      <div className='flex justify-center gap-5'>
        {words.map((w: WordObj) => (
          <WordTile key={w.id} word={w} isPicked={picked.includes(w)} handleTileClick={handleTileClick} />
        ))}
      </div>
      <CheckBtn isDisabled={picked.length === 0} handleCheck={() => checkWordOrder(picked)} />
      <div>{isCompleted && 'Congratulations!'}</div>
      {isCorrect !== null && <CheckResponse isCorrect={isCorrect} correctAnswer={senteces[curSenId]} handleContinue={() => setCanContinue(true)} />}
    </div>
  )
}

export default App
