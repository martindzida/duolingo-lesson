import LeaveLessonBtn from './LeaveLessonBtn';
import ProgressBar from './ProgressBar';
import StreakInfo from './StreakInfo';

interface Props {
  progress: number;
  handleLeaveLesson: () => void;
}

const LessonHeader = ({ progress }: Props) => {
  return (
    <>
      <div className='flex justify-center items-center w-full gap-8'>
        <LeaveLessonBtn />
        <ProgressBar progress={progress} />
      </div>
      <StreakInfo streak={5} />
    </>
  );
};

export default LessonHeader;
