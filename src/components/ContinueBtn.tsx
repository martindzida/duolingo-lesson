interface Props {
  isCorrect: boolean;
  handleContinue: () => void;
}

const ContinueBtn = ({ isCorrect, handleContinue }: Props) => {
  return (
    <button
      onClick={handleContinue}
      className={`${isCorrect ? 'bg-green-500' : 'bg-rose-500'} text-white text-base font-extrabold rounded-lg uppercase px-5 py-3`}
    >
      Continue
    </button>
  );
};

export default ContinueBtn;
