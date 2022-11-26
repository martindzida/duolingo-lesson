import LeaveLessonBtn from './LeaveLessonBtn';
import ProgressBar from './ProgressBar';
import StreakInfo from './StreakInfo';

interface Props {
  progress: number;
  streak: number;
  handleLeaveLesson: () => void;
}

const LessonHeader = ({ progress, streak, handleLeaveLesson }: Props) => {
  return (
    <>
      <div className='flex justify-center items-center w-full gap-8'>
        <LeaveLessonBtn />
        <ProgressBar progress={progress} />
      </div>
      <StreakInfo streak={streak} />
    </>
  );
};

export default LessonHeader;
