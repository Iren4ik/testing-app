'use client';

import styles from './page.module.css';
import React from 'react';
import { Box, Typography } from '@mui/material';
import ProgressBar from '@/components/ProgressBar';
import Question from '@/components/Question';
import useTimer from '@/hooks/useTimer';
import { useTestStore } from '@/store/testStore';
import { questions } from '@/questions';

const Home: React.FC = () => {
  const timeRemaining = useTimer();
  const timeExpired = useTestStore((state) => state.timeExpired);
  const allAnswersSubmitted = useTestStore((state) => state.allAnswersSubmitted);
  const currentQuestionId = useTestStore((state) => state.currentQuestionId);
  const currentQuestion = questions.find(question => question.id === currentQuestionId);

  return (
    <main className={styles.main}>
      <Box className={styles.container}>
        <Box>
          <Typography variant="h4" component="h1">Тестирование</Typography>
          <Typography variant="h6">
            {new Date(timeRemaining * 1000).toISOString().substring(14, 19)}
          </Typography>
        </Box>
        <ProgressBar />
        <Box sx={{ mt: 4 }}>
          {timeExpired ? (
            <Typography variant="h6">Время истекло, ваши ответы направлены</Typography>
          ) : allAnswersSubmitted ? (
            <Typography variant="h6">Ответы направлены</Typography>
          ) : !currentQuestion ? (
            <Typography variant="h6">Вопрос не найден</Typography>
          ) : (
            <Question />
          )}
        </Box>
      </Box>
    </main>
  );
};

export default Home;
