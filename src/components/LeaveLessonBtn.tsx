const LeaveLessonBtn = () => {
  return (
    <button
      onClick={() => console.log('cancle lesson')}
      className='text-slate-500 transition duration-200 ease-in-out hover:bg-slate-100 rounded-full p-1'
    >
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
      </svg>
    </button>
  );
};

export default LeaveLessonBtn;
