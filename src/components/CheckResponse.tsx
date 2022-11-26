import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  isCorrect: boolean;
  correctAnswer: string;
}

const CheckResponse = ({ isCorrect, correctAnswer }: Props) => {
  return (
    <div className={`w-full h-full flex justify-center items-center ${isCorrect ? 'bg-green-100' : 'bg-rose-100'}`}>
      {isCorrect ? (
        <CheckCircleIcon className='w-24 h-24' style={{ fill: 'white' }} />
      ) : (
        <XCircleIcon className='w-24 h-24' style={{ fill: 'white' }} />
      )}
      <div className='flex flex-col items-start gap-2'>
        <span className={`${isCorrect ? 'text-green-500' : 'text-rose-500'} text-3xl font-extrabold`}>{isCorrect ? 'Correct' : 'Try again'}</span>
        <p className='text-rose-500'>{correctAnswer}</p>
      </div>
    </div>
  );
};

export default CheckResponse;
