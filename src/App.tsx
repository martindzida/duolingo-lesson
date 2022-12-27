import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import fetchQuotes from './utils/fetchQuotes'
import getWords from './utils/getWords'
import getProgress from './utils/getProgress'
import LessonHeader from './components/LessonHeader'
import CheckBtn from './components/CheckBtn'
import CheckResponse from './components/CheckResponse'
import StartPage from './components/StartPage'
import PickedTilesList from './components/PickedTilesList'
import WordStackList from './components/WordStackList'

export type WordObj = { id: number; word: string }
type LessonStageType = 'initial' | 'errors' | 'completed'

function App() {
  //TODO: find font on Google Fonts
  const senteces: string[] = [
    'Duo calls for a lesson',
    'Duo wants to know your location',
  ]

  const [curId, setCurId] = useState(0)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [lessonStage, setLessonStage] = useState<LessonStageType>('initial')
  const [words, setWords] = useState<WordObj[]>(getWords(senteces[curId]))
  const [picked, setPicked] = useState<WordObj[]>([])
  const [streak, setStreak] = useState(0)
  const [canContinue, setCanContinue] = useState(false)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([])
  const [isOngoing, setIsOngoing] = useState(true)

  const { data, isLoading } = useQuery(['getQuotes'], fetchQuotes)

  if (isLoading) {
    return <div>Loading...</div>
  }

  const quotesWords = data.results.map((quote: any) => getWords(quote.content))

  if (canContinue) {
    setWords(quotesWords[curId])
    setIsCorrect(null)
    setPicked([])
    //TODO: will be null, probably
    setCanContinue(false)
  }

  //FIXME: cursed
  const checkWordOrder = (words: WordObj[]) => {
    const convStr = words.map((w: WordObj) => w.word).join(' ')
    const correct = convStr === senteces[curId]
    setCanContinue(false)
    setIsCorrect(correct)

    if (correct) {
      setStreak(prev => prev + 1)
      if (correctAnswersCount < senteces.length - 1) {
        setCurId(prev => prev + 1)
        setCorrectAnswersCount(prev => prev + 1)
      }
    } else {
      setWrongAnswers(prev => [...prev, curId])
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

  return (
    <div className='w-screen min-h-screen flex flex-col items-center justify-center gap-16'>
      {!isOngoing && <StartPage />}
      <LessonHeader
        progress={getProgress(correctAnswersCount, senteces.length)}
        streak={streak}
        handleLeaveLesson={() => setIsOngoing(false)}
      />
      <PickedTilesList picked={picked} handleTileClick={handleTileClick} />
      <WordStackList
        words={words}
        picked={picked}
        handleTileClick={handleTileClick}
      />
      <CheckBtn
        isDisabled={!picked.length || isCorrect !== null}
        handleCheck={() => checkWordOrder(picked)}
      />
      <div>{lessonStage === 'completed' && 'Congratulations!'}</div>
      {isCorrect !== null && (
        <CheckResponse
          isCorrect={isCorrect}
          correctAnswer={senteces[curId]}
          handleContinue={() => setCanContinue(true)}
        />
      )}
    </div>
  )
}

export default App
