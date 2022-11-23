const CheckBtn = () => {
  return (
    <button className='flex gap-4 bg-green-500 text-white rounded-lg px-6 py-3 transition ease-in-out duration-200 hover:bg-green-600'>
      <span>Check</span>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
        <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
      </svg>
    </button>
  );
};

export default CheckBtn;
