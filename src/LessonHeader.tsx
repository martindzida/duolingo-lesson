import LeaveLessonBtn from './LeaveLessonBtn';
import ProgressBar from './ProgressBar';

const LessonHeader = () => {
  return (
    <div className='flex justify-center items-center w-full gap-8'>
      <LeaveLessonBtn />
      <ProgressBar progress={10} />
    </div>
  );
};

export default LessonHeader;
