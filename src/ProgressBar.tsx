interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className='relative bg-slate-200 w-1/2 h-4 rounded-full'>
      <div className='absolute bg-lime-300 h-4 rounded-full' style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
