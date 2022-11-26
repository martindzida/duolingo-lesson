const useGetProgress = (id: number, len: number): number => Math.floor((id / len) * 100);

export default useGetProgress;
