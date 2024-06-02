import { useEffect } from 'react';
import { useTestStore } from '@/store/testStore';

const useTimer = () => {
  const timeRemaining = useTestStore((state) => state.timeRemaining);
  const setTimeRemaining = useTestStore((state) => state.setTimeRemaining);
  const setAllAnswersSubmitted = useTestStore((state) => state.setAllAnswersSubmitted);
  const setTimeExpired = useTestStore((state) => state.setTimeExpired);
  const allAnswersSubmitted = useTestStore((state) => state.allAnswersSubmitted);

  useEffect(() => {
    if (allAnswersSubmitted) {
      return;
    }

    if (timeRemaining <= 0) {
      setTimeExpired(true);
      setTimeRemaining(0); // Устанавливаем значение 0, чтобы таймер оставался на 00:00
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, allAnswersSubmitted, setTimeRemaining, setAllAnswersSubmitted, setTimeExpired]);

  return timeRemaining;
};

export default useTimer;