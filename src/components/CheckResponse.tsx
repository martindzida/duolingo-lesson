import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import ContinueBtn from './ContinueBtn';

interface Props {
  isCorrect: boolean;
  correctAnswer: string;
  handleContinue: () => void;
}

const CheckResponse = ({ isCorrect, correctAnswer, handleContinue }: Props) => {
  return (
    <div className={`w-full h-full flex justify-center items-center gap-4 p-8 ${isCorrect ? 'bg-green-100' : 'bg-rose-100'}`}>
      {isCorrect ? (
        <CheckCircleIcon className='w-24 h-24' style={{ fill: 'white' }} />
      ) : (
        <XCircleIcon className='w-24 h-24' style={{ fill: 'white' }} />
      )}
      <div className='flex flex-col items-start gap-2'>
        <span className={`${isCorrect ? 'text-green-500' : 'text-rose-500'} text-2xl font-extrabold`}>
          {isCorrect ? 'Excellent' : 'Correct solution:'}
        </span>
        {!isCorrect && <p className='text-rose-500'>{correctAnswer}</p>}
      </div>
      <ContinueBtn isCorrect={isCorrect} handleContinue={handleContinue} />
    </div>
  );
};

export default CheckResponse;
