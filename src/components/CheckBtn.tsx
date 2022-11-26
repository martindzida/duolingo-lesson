import { CheckIcon } from '@heroicons/react/24/solid';

interface Props {
  isDisabled: boolean;
  handleCheck: () => void;
}

const CheckBtn = ({ isDisabled, handleCheck }: Props) => {
  return (
    <button
      disabled={isDisabled}
      onClick={handleCheck}
      className={`flex gap-4 ${
        isDisabled
          ? 'bg-slate-300 text-slate-600 opacity-80 cursor-not-allowed'
          : ' bg-green-500 text-white transition ease-in-out duration-200 hover:bg-green-600'
      } rounded-lg px-6 py-3 transition ease-in-out duration-200 hover:bg-green-600`}
    >
      <span className='text-base font-extrabold uppercase'>Check</span>
      <CheckIcon className='w-6 h-6' />
    </button>
  );
};

export default CheckBtn;
