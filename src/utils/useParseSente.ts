import { wordObj } from '../App';

const useParseSentence = (sen: string): wordObj[] => {
  return sen.split(' ').map((w: string, index) => {
    return { id: index, word: w };
  });
};

export default useParseSentence;
