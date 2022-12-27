import { Dispatch, SetStateAction } from 'react'
import { LessonStageType } from '../App'

interface Props {
  handleStart: () => void
}

const StartPage = ({ handleStart }: Props) => {
  return (
    <div>
      <button
        className='bg-green-500 text-white transition ease-in-out duration-200 hover:bg-green-600 text-base font-extrabold uppercase rounded-lg px-6 py-3'
        onClick={handleStart}
      >
        Start lesson
      </button>
    </div>
  )
}

export default StartPage
