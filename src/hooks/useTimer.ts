'use client';

import { useEffect } from 'react';
import { useTestStore } from '../store/testStore';

const useTimer = () => {
  const timeRemaining = useTestStore((state) => state.timeRemaining);
  const setTimeRemaining = useTestStore((state) => state.setTimeRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, setTimeRemaining]);

  return timeRemaining;
};

export default useTimer;
