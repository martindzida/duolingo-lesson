import { wordObj } from '../App';

/* Randomize array in-place using Durstenfeld shuffle algorithm */
const useShuffleArray = (array: wordObj[]): wordObj[] => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export default useShuffleArray;