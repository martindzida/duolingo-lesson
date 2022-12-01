import { useEffect, useState } from 'react'
import WordTile from './components/WordTile'
import LessonHeader from './components/LessonHeader'
import CheckBtn from './components/CheckBtn'
import CheckResponse from './components/CheckResponse'
import getProgress from './utils/getProgress'
import getWords from './utils/getWords'
import { useQuery } from '@tanstack/react-query'

export type WordObj = { id: number; word: string }

function App() {
  //TODO: find font on Google Fonts
  const senteces: string[] = [
    'Duo calls for a lesson',
    'Duo wants to know your location',
    'How many lessons have you done today',
    'One lesson a day keeps the doctors away',
  ]

  const [curSenId, setCurSenId] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [words, setWords] = useState<WordObj[]>([])
  const [picked, setPicked] = useState<WordObj[]>([])
  const [streak, setStreak] = useState(0)
  const [canContinue, setCanContinue] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState<WordObj[]>([])

  useEffect(() => {
    setWords(getWords(senteces[curSenId]))
    setIsCorrect(null)
    setCanContinue(false)
    setPicked([])
  }, [canContinue])

  const fetchQuotes = async () => {
    const res = await fetch('https://api.quotable.io/quotes')
    return res.json()
  }
  const { data, isLoading } = useQuery(['getQuotes'], fetchQuotes)

  if (isLoading) {
    return <div>Loading...</div>
  }

  const checkWordOrder = (words: WordObj[]) => {
    const convStr = words.map((w: WordObj) => w.word).join(' ')
    const correct = convStr === senteces[curSenId]
    //TODO: think of the end of the lesson
    if (correct) {
      setCorrectAnswersCount(prev => prev + 1)
      if (curSenId < senteces.length - 1) {
        setStreak(prev => prev + 1)
      } else {
        setIsCompleted(true)
      }
    } else {
      setWrongAnswers(getWords(senteces[curSenId]))
      setStreak(0)
    }
    setIsCorrect(correct)
    setCurSenId(prev => prev + 1)
  }

  const handleTileClick = (tile: WordObj) => {
    if (picked.includes(tile)) {
      setPicked(picked.filter((word: WordObj) => word.id !== tile.id))
    } else {
      setPicked(prev => [...prev, tile])
    }
  }

  const handleLeaveLesson = () => {}

  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-center gap-16'>
      <LessonHeader progress={getProgress(correctAnswersCount, senteces.length)} streak={streak} handleLeaveLesson={handleLeaveLesson} />
      <div className='w-1/2 h-32 flex justify-center gap-5 items-end border-b-2 border-slate-500 p-2 border-opacity-60'>
        {picked.map((w: WordObj) => (
          <WordTile key={w.id} word={w} isPicked={false} handleTileClick={handleTileClick} />
        ))}
      </div>
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
