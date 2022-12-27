import LeaveLessonBtn from './LeaveLessonBtn'
import ProgressBar from './ProgressBar'
import StreakInfo from './StreakInfo'
import { Dispatch, SetStateAction } from 'react'
import { LessonStageType } from '../App'

interface Props {
  progress: number
  streak: number
  handleLeaveLesson: Dispatch<SetStateAction<LessonStageType>>
}

const LessonHeader = ({ progress, streak, handleLeaveLesson }: Props) => {
  return (
    <>
      <div className='flex justify-center items-center w-full gap-8'>
        <LeaveLessonBtn handleLeave={handleLeaveLesson} />
        <ProgressBar progress={progress} />
      </div>
      <StreakInfo streak={streak} />
    </>
  )
}

export default LessonHeader
