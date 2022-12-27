import { FireIcon } from '@heroicons/react/24/solid'

interface Props {
  streak: number
}

const StreakInfo = ({ streak }: Props) => {
  return (
    <div className='flex justify-center items-center w-20 h-20 text-orange-500 bg-white rounded-full text-base font-extrabold uppercase p-2 shadow-orange-300 shadow-streak'>
      <FireIcon className='w-8 h-8 mr-2' />
      <span className='text-3xl'>{streak}</span>
    </div>
  )
}

export default StreakInfo
