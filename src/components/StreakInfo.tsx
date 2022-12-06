import { FireIcon } from '@heroicons/react/24/solid'

interface Props {
  streak: number
}

const StreakInfo = ({ streak }: Props) => {
  return (
    <div className='flex justify-center items-center text-orange-500 text-base font-extrabold uppercase'>
      <FireIcon className='w-8 h-8 mr-2' />
      <span className='text-3xl'>{streak}</span>
      <span className='p-2'>streak</span>
    </div>
  )
}

export default StreakInfo
