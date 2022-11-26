interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  const mediumThr = 30;
  const highThr = 75;
  let barColor = 'bg-green-400';

  if (progress > 33) {
    barColor = progress > 75 ? 'bg-orange-500' : 'bg-amber-400';
  }
  return (
    <div className='relative bg-slate-200 w-1/2 h-4 rounded-full shadow-lg'>
      <div className={`absolute ${barColor} h-4 rounded-full`} style={{ width: `${progress}%` }}></div>
      <div className='absolute bg-slate-100 opacity-30 h-1 rounded-full left-2 top-1' style={{ width: `${progress - 2}%` }}></div>
    </div>
  );
};

export default ProgressBar;
